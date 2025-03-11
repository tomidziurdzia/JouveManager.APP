"use client";

import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Plus, Loader2 } from "lucide-react";
import { TypeSemiTrailer } from "@/app/interfaces/semi-trailer";
import { createSemiTrailer } from "@/app/actions/semi-trailer";

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

const LICENSE_PLATE_PATTERN = /^([A-Z]{3}\d{3}|[A-Z]{2}\d{3}[A-Z]{2})$/i;

const semiTrailerSchema = z.object({
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
    .max(50, "La marca no puede tener más de 50 caracteres"),
  type: z.nativeEnum(TypeSemiTrailer, {
    errorMap: () => ({ message: "Seleccione un tipo de semi-trailer válido" }),
  }),
});

type SemiTrailerFormValues = z.infer<typeof semiTrailerSchema>;

export default function CreateSemiTrailerModal({
  onSuccess,
}: {
  onSuccess?: () => Promise<void>;
}) {
  const [open, setOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<SemiTrailerFormValues>({
    resolver: zodResolver(semiTrailerSchema),
    defaultValues: {
      licensePlate: "",
      brand: "",
      model: "",
      type: undefined as unknown as TypeSemiTrailer,
    },
    mode: "onChange",
  });

  const onSubmit = async (values: SemiTrailerFormValues) => {
    setIsSubmitting(true);
    try {
      await createSemiTrailer(values);
      toast.success("Semi-trailer creado", {
        description: `El semi-trailer ${values.brand} ${values.model} ha sido creado exitosamente.`,
      });
      form.reset();
      setOpen(false);
      await onSuccess?.();
    } catch (error) {
      console.error("Error al crear el semi-trailer:", error);
      toast.error("Error", {
        description: "No se pudo crear el semi-trailer. Intente nuevamente.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size="sm" className="flex items-center gap-2">
          <Plus className="h-4 w-4" />
          Nuevo Semi-trailer
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Crear Nuevo Semi-trailer</DialogTitle>
          <DialogDescription>
            Complete los detalles del nuevo semi-trailer. Todos los campos son
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
                      onChange={(e) => {
                        field.onChange(e.target.value);
                      }}
                    />
                  </FormControl>
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
                  <FormLabel>Tipo de Semi-trailer</FormLabel>
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
                      {Object.values(TypeSemiTrailer).map((type) => (
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
                    Creando...
                  </>
                ) : (
                  "Crear Semi-trailer"
                )}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
