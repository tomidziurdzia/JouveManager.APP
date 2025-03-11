"use client";

import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Plus, Loader2 } from "lucide-react";
import { createTravel } from "@/app/actions/travel";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";
import { useGetUsers } from "@/app/actions/user";
import { useGetVehicles } from "@/app/actions/vehicle";
import { Role } from "@/app/interfaces/roles.interface";
import { useGetSemiTrailers } from "@/app/actions/semi-trailer";
import { TypeVehicle, Vehicle } from "@/app/interfaces/vehicle.interface";
import { format } from "date-fns";

const createTravelSchema = (vehicles: Vehicle[]) => {
  return z
    .object({
      date: z.string().min(1, "La fecha es requerida"),
      driverId: z.string().min(1, "El conductor es requerido"),
      assistantId: z.string().optional(),
      vehicleId: z.string().min(1, "El vehículo es requerido"),
      semiTrailerLicensePlate: z.string().optional(),
    })
    .refine(
      (data) => {
        if (!data.vehicleId) return true;
        const selectedVehicle = vehicles.find((v) => v.id === data.vehicleId);
        if (selectedVehicle?.type === TypeVehicle.TractorUnit) {
          return !!data.semiTrailerLicensePlate;
        }

        return true;
      },
      {
        message:
          "El semi-trailer es requerido para vehículos tipo Tractor Unit",
        path: ["semiTrailerLicensePlate"],
      }
    );
};

type TravelFormValues = z.infer<ReturnType<typeof createTravelSchema>>;

export default function CreateTravelModal({
  onSuccess,
}: {
  onSuccess?: () => Promise<void>;
}) {
  const [open, setOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { data: users = [] } = useGetUsers();
  const { data: vehicles = [] } = useGetVehicles();
  const { data: semiTrailers = [] } = useGetSemiTrailers();

  const travelSchema = createTravelSchema(vehicles);

  const drivers = users.filter((user) => user.roles.includes(Role.Driver));
  const assistants = users.filter((user) =>
    user.roles.includes(Role.Assistant)
  );

  const form = useForm<TravelFormValues>({
    resolver: zodResolver(travelSchema),
    defaultValues: {
      date: "",
      driverId: "",
      assistantId: "",
      vehicleId: "",
      semiTrailerLicensePlate: "",
    },
    mode: "onChange",
  });

  const selectedVehicleId = form.watch("vehicleId");
  const selectedVehicle = vehicles.find((v) => v.id === selectedVehicleId);
  const showSemiTrailerField =
    selectedVehicle?.type === TypeVehicle.TractorUnit;

  const onSubmit = async (values: TravelFormValues) => {
    setIsSubmitting(true);
    try {
      const travel = await createTravel(values);
      toast.success("Viaje creado", {
        description: `El viaje ${format(travel.date, "dd/MM/yyyy")} - ${
          travel.driverName
        } ${travel?.assistantName ? `- ${travel?.assistantName}` : ""} - ${
          travel.vehicleLicensePlate
        } ${
          travel?.semiTrailerLicensePlate
            ? `- ${travel?.semiTrailerLicensePlate}`
            : ""
        } ha sido creado exitosamente.`,
      });
      form.reset();
      setOpen(false);
      await onSuccess?.();
    } catch (error) {
      console.error("Error al crear el viaje:", error);
      toast.error("Error", {
        description: "No se pudo crear el viaje. Intente nuevamente.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size="sm" className="flex items-center gap-2 font-extrabold">
          <Plus className="h-4 w-4" strokeWidth={2.5} />
          Nuevo Viaje
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Crear Nuevo Viaje</DialogTitle>
          <DialogDescription>
            Complete los detalles del nuevo viaje. Todos los campos son
            obligatorios.
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="date"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Fecha</FormLabel>
                  <FormControl>
                    <Input
                      type="date"
                      {...field}
                      autoComplete="off"
                      onChange={(e) => {
                        field.onChange(e.target.value);
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="driverId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Conductor</FormLabel>
                  <FormControl>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Selecciona un conductor" />
                      </SelectTrigger>
                      <SelectContent>
                        {drivers.map((driver) => (
                          <SelectItem key={driver.id} value={driver.id}>
                            {driver.fullName}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="assistantId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Ayudante</FormLabel>
                  <FormControl>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Selecciona un ayudante" />
                      </SelectTrigger>
                      <SelectContent>
                        {assistants.map((assistant) => (
                          <SelectItem key={assistant.id} value={assistant.id}>
                            {assistant.fullName}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="vehicleId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Vehículo</FormLabel>
                  <FormControl>
                    <Select
                      onValueChange={(value) => {
                        field.onChange(value);
                        const vehicle = vehicles.find((v) => v.id === value);
                        if (vehicle?.type !== TypeVehicle.TractorUnit) {
                          form.setValue("semiTrailerLicensePlate", "");
                        }
                      }}
                      defaultValue={field.value}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Selecciona un vehículo" />
                      </SelectTrigger>
                      <SelectContent>
                        {vehicles.map((vehicle) => (
                          <SelectItem key={vehicle.id} value={vehicle.id!}>
                            {vehicle.licensePlate} ({vehicle.type})
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {showSemiTrailerField && (
              <FormField
                control={form.control}
                name="semiTrailerLicensePlate"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Placa del Semitrailer
                      <span className="text-red-500 ml-1">*</span>
                    </FormLabel>
                    <FormControl>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Selecciona una placa" />
                        </SelectTrigger>
                        <SelectContent>
                          {semiTrailers.map((semiTrailer) => (
                            <SelectItem
                              key={semiTrailer.id}
                              value={semiTrailer.id!}
                            >
                              {semiTrailer.licensePlate}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}
            <DialogFooter>
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Guardando...
                  </>
                ) : (
                  "Crear"
                )}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
