import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useState } from "react";
import { Button } from "./ui/button";
import { Plus } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { TypeVehicle, Vehicle } from "@/app/interfaces/vehicle.interface";
import { Input } from "./ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { createVehicle } from "@/app/actions/vehicle";

const vehicleSchema: z.ZodSchema<Vehicle> = z.object({
  licensePlate: z
    .string()
    .min(6, "La patente debe tener al menos 6 caracteres")
    .max(10, "La patente no puede tener más de 10 caracteres"),
  brand: z.string().min(1, "Selecciona una marca"),
  model: z.string().min(1, "Selecciona un modelo"),
  type: z.nativeEnum(TypeVehicle),
});

export default function CreateVehicleModal({
  onSuccess,
}: {
  onSuccess?: () => Promise<void>;
}) {
  const [open, setOpen] = useState(false);

  const form = useForm<z.infer<typeof vehicleSchema>>({
    resolver: zodResolver(vehicleSchema),
    defaultValues: {
      licensePlate: "",
      brand: "",
      model: "",
      type: undefined,
    },
    mode: "onTouched", // Validar cuando el campo pierde el foco
  });

  const onSubmit = async (values: z.infer<typeof vehicleSchema>) => {
    try {
      await createVehicle(values);
      form.reset();
      setOpen(false);
      // Llamar a la función de actualización después de crear exitosamente
      await onSuccess?.();
    } catch (error) {
      console.error("Error al crear el vehículo:", error);
    }
  };

  // Obtener errores para mostrarlos manualmente
  const { errors } = form.formState;

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="flex h-8 items-center gap-2">
          <Plus className="h-4 w-4" />
          Nuevo Vehículo
        </Button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Crear Nuevo Vehículo</DialogTitle>
          <DialogDescription>
            Complete los detalles del nuevo vehículo. Todos los campos son
            obligatorios.
          </DialogDescription>
        </DialogHeader>

        {/* Formulario sin componentes de shadcn/ui Form */}
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <div className="grid gap-4 py-4">
            {/* Campo de Patente */}
            <div className="space-y-2">
              <label htmlFor="licensePlate" className="text-sm font-medium">
                Patente
              </label>
              <Input
                id="licensePlate"
                placeholder="Ingrese la patente"
                {...form.register("licensePlate")}
              />
              {errors.licensePlate && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.licensePlate.message}
                </p>
              )}
            </div>

            {/* Campo de Marca */}
            <div className="space-y-2">
              <label htmlFor="brand" className="text-sm font-medium">
                Marca
              </label>
              <Input
                id="brand"
                placeholder="Ingrese la marca"
                {...form.register("brand")}
              />
              {errors.brand && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.brand.message}
                </p>
              )}
            </div>

            {/* Campo de Modelo */}
            <div className="space-y-2">
              <label htmlFor="model" className="text-sm font-medium">
                Modelo
              </label>
              <Input
                id="model"
                placeholder="Ingrese el modelo"
                {...form.register("model")}
              />
              {errors.model && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.model.message}
                </p>
              )}
            </div>

            {/* Campo de Tipo */}
            <div className="space-y-2">
              <label htmlFor="type" className="text-sm font-medium">
                Tipo
              </label>
              <Select
                onValueChange={(value) => {
                  form.setValue("type", value as TypeVehicle);
                  form.clearErrors("type");
                }}
                value={form.watch("type")}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Selecciona un tipo" />
                </SelectTrigger>
                <SelectContent>
                  {Object.values(TypeVehicle).map((type) => (
                    <SelectItem key={type} value={type}>
                      {type}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.type && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.type.message}
                </p>
              )}
            </div>

            <div className="flex justify-end gap-2 pt-4">
              <Button
                variant="outline"
                type="button"
                onClick={() => {
                  form.reset();
                  setOpen(false);
                }}
              >
                Cancelar
              </Button>
              <Button type="submit">Crear Vehículo</Button>
            </div>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
