"use client";

import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Edit, Loader2 } from "lucide-react";
import { TypeVehicle, UpdateVehicle } from "@/app/interfaces/vehicle.interface";
import { updateVehicle } from "@/app/actions/vehicle";

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
  FormDescription,
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

// Regex pattern for license plate validation
const LICENSE_PLATE_PATTERN = /^[A-Z0-9]{6,10}$/i;

const vehicleSchema = z.object({
  licensePlate: z
    .string()
    .min(6, "La patente debe tener al menos 6 caracteres")
    .max(10, "La patente no puede tener más de 10 caracteres")
    .regex(
      LICENSE_PLATE_PATTERN,
      "Formato de patente inválido. Use solo letras y números"
    ),
  brand: z
    .string()
    .min(2, "La marca debe tener al menos 2 caracteres")
    .max(50, "La marca no puede tener más de 50 caracteres"),
  model: z
    .string()
    .min(2, "El modelo debe tener al menos 2 caracteres")
    .max(50, "El modelo no puede tener más de 50 caracteres"),
  type: z.nativeEnum(TypeVehicle, {
    errorMap: () => ({ message: "Seleccione un tipo de vehículo válido" }),
  }),
});

type VehicleFormValues = z.infer<typeof vehicleSchema>;

interface EditVehicleModalProps {
  vehicle: UpdateVehicle;
  onSuccess?: () => Promise<void>;
}

export default function EditVehicleModal({
  vehicle,
  onSuccess,
}: EditVehicleModalProps) {
  const [open, setOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<VehicleFormValues>({
    resolver: zodResolver(vehicleSchema),
    defaultValues: {
      licensePlate: vehicle.licensePlate,
      brand: vehicle.brand,
      model: vehicle.model,
      type: vehicle.type,
    },
    mode: "onChange", // Validate on change for better user feedback
  });

  const onSubmit = async (values: VehicleFormValues) => {
    setIsSubmitting(true);
    try {
      const updatedVehicle = { ...values, id: vehicle.id };
      await updateVehicle(updatedVehicle);
      toast.success("Vehículo actualizado", {
        description: `El vehículo ${values.brand} ${values.model} ha sido actualizado exitosamente.`,
      });
      form.reset(values); // Reset form with new values
      setOpen(false);
      await onSuccess?.();
    } catch (error) {
      console.error("Error al actualizar el vehículo:", error);
      toast.error("Error", {
        description: "No se pudo actualizar el vehículo. Intente nuevamente.",
      });
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
          <DialogTitle>Editar Vehículo</DialogTitle>
          <DialogDescription>
            Modifique los detalles del vehículo. Todos los campos son
            obligatorios.
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="licensePlate"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Patente</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Ingrese la patente"
                      {...field}
                      autoComplete="off"
                      className="uppercase"
                      onChange={(e) => {
                        field.onChange(e.target.value.toUpperCase());
                      }}
                    />
                  </FormControl>
                  <FormDescription>
                    Formato: letras y números, sin espacios ni caracteres
                    especiales
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="brand"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Marca</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Ej: Toyota, Ford, Chevrolet"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="model"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Modelo</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Ej: Corolla, Ranger, Cruze"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="type"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Tipo de Vehículo</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Seleccione un tipo" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {Object.values(TypeVehicle).map((type) => (
                        <SelectItem key={type} value={type}>
                          {type}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <DialogFooter className="pt-4">
              <Button
                variant="outline"
                type="button"
                onClick={() => {
                  form.reset();
                  setOpen(false);
                }}
                disabled={isSubmitting}
              >
                Cancelar
              </Button>
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Actualizando...
                  </>
                ) : (
                  "Guardar Cambios"
                )}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
