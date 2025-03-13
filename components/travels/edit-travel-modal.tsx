"use client";

import { useState, useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Edit, Loader2 } from "lucide-react";
import { UpdateTravel } from "@/app/interfaces/travel.interface";
import { updateTravel } from "@/app/actions/travel";

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
import { TypeVehicle, Vehicle } from "@/app/interfaces/vehicle.interface";
import { useGetUsers } from "@/app/actions/user";
import { Role } from "@/app/interfaces/roles.interface";
import { useGetSemiTrailers } from "@/app/actions/semi-trailer";
import { useGetVehicles } from "@/app/actions/vehicle";
import { format } from "date-fns";

// Definimos el esquema base con la validación personalizada
const createTravelSchema = (vehicles: Vehicle[]) => {
  return z
    .object({
      date: z.string().min(1, "La fecha es requerida"),
      driverId: z.string().min(1, "El conductor es requerido"),
      assistantId: z.string().optional(),
      vehicleId: z.string().min(1, "El vehículo es requerido"),
      semiTrailerId: z.string().optional(),
    })
    .refine(
      (data) => {
        // Si no hay vehicleId, no validamos
        if (!data.vehicleId) return true;

        // Obtenemos el vehículo seleccionado
        const selectedVehicle = vehicles.find((v) => v.id === data.vehicleId);

        // Si es TractorUnit, el semiTrailer es requerido
        if (selectedVehicle?.type === TypeVehicle.TractorUnit) {
          return !!data.semiTrailerId;
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

export default function EditTravelModal({
  travel,
  onSuccess,
}: {
  travel: UpdateTravel;
  onSuccess?: () => Promise<void>;
}) {
  const [open, setOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { data: users = [] } = useGetUsers();
  const { data: vehicles = [] } = useGetVehicles();
  const { data: semiTrailers = [] } = useGetSemiTrailers();

  // Creamos el esquema con los vehículos disponibles
  const travelSchema = createTravelSchema(vehicles);

  const drivers = users.filter((user) => user.roles.includes(Role.Driver));
  const assistants = users.filter((user) =>
    user.roles.includes(Role.Assistant)
  );

  const form = useForm<TravelFormValues>({
    resolver: zodResolver(travelSchema),
    defaultValues: {
      date: format(new Date(travel.date), "yyyy-MM-dd"),
      driverId: travel.driverId,
      assistantId: travel.assistantId || "",
      vehicleId: travel.vehicleId,
      semiTrailerId: travel.semiTrailerId || "",
    },
    mode: "onChange",
  });

  // Observamos el cambio en el vehicleId para mostrar/ocultar el campo de semi-trailer
  const selectedVehicleId = form.watch("vehicleId");
  const selectedVehicle = vehicles.find((v) => v.id === selectedVehicleId);
  const showSemiTrailerField =
    selectedVehicle?.type === TypeVehicle.TractorUnit;

  // Aseguramos que el campo se muestre al cargar si el vehículo es TractorUnit
  useEffect(() => {
    if (selectedVehicle?.type === TypeVehicle.TractorUnit) {
      // Forzamos la actualización del estado para mostrar el campo
      form.setValue("vehicleId", selectedVehicleId, { shouldValidate: true });
    }
  }, [vehicles, selectedVehicleId, selectedVehicle?.type, form]);

  // Limpiamos el campo de semi-trailer si cambiamos a un vehículo que no es TractorUnit
  useEffect(() => {
    if (!showSemiTrailerField) {
      form.setValue("semiTrailerId", "");
    }
  }, [showSemiTrailerField, form]);

  const onSubmit = async (values: TravelFormValues) => {
    setIsSubmitting(true);
    try {
      await updateTravel({
        id: travel.id,
        ...values,
      });
      toast.success("Viaje actualizado correctamente");
      setOpen(false);
      onSuccess?.();
    } catch (error) {
      console.error(error);
      toast.error("Error al actualizar el viaje");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost" size="icon" className="h-8 w-8">
          <Edit className="h-4 w-4" />
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Editar Viaje</DialogTitle>
          <DialogDescription>
            Edite los detalles del viaje. Todos los campos son obligatorios.
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
                    <Input type="date" {...field} autoComplete="off" />
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
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Seleccione un conductor" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {drivers.map((driver) => (
                        <SelectItem key={driver.id} value={driver.id}>
                          {driver.fullName}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="assistantId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Asistente (Opcional)</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Seleccione un asistente" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="nobody">Ninguno</SelectItem>
                      {assistants.map((assistant) => (
                        <SelectItem key={assistant.id} value={assistant.id}>
                          {assistant.fullName}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
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
                  <Select
                    onValueChange={(value) => {
                      field.onChange(value);
                      const vehicle = vehicles.find((v) => v.id === value);
                      if (vehicle?.type !== TypeVehicle.TractorUnit) {
                        form.setValue("semiTrailerId", "");
                      }
                    }}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Seleccione un vehículo" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {vehicles.map((vehicle) => (
                        <SelectItem key={vehicle.id} value={vehicle.id!}>
                          {vehicle.licensePlate} - {vehicle.type}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            {showSemiTrailerField && (
              <FormField
                control={form.control}
                name="semiTrailerId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Semi-Trailer</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Seleccione un semi-trailer" />
                        </SelectTrigger>
                      </FormControl>
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
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}

            <DialogFooter>
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting && (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                )}
                Guardar cambios
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
