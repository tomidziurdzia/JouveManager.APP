"use client";

import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { createShipment } from "@/app/actions/shipment";

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

import { format } from "date-fns";
import { toast } from "sonner";
import { Plus } from "lucide-react";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "../ui/input";

const createShipmentSchema = z.object({
  customerName: z.string().min(1, "El nombre del cliente es requerido"),
  from: z.string().min(1, "La ubicación de origen es requerida"),
  to: z.string().min(1, "La ubicación de destino es requerida"),
  description: z.string().min(1, "La descripción es requerida"),
  scheduledDate: z.string().min(1, "La fecha programada es requerida"),
});

type CreateShipmentFormValues = z.infer<typeof createShipmentSchema>;

export default function CreateShipmentModal({
  onSuccess,
}: {
  onSuccess?: () => Promise<void>;
}) {
  const [open, setOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<CreateShipmentFormValues>({
    resolver: zodResolver(createShipmentSchema),
    defaultValues: {
      customerName: "",
      from: "",
      to: "",
      description: "",
      scheduledDate: "",
    },
    mode: "onChange",
  });

  const onSubmit = async (values: CreateShipmentFormValues) => {
    setIsSubmitting(true);
    try {
      const shipment = await createShipment(values);
      toast.success("Envío creado", {
        description: `El envío ${format(
          shipment.scheduledDate,
          "dd/MM/yyyy"
        )} - ${shipment.customerName} - ${shipment.from} - ${shipment.to} - ${
          shipment.description
        } ha sido creado exitosamente.`,
      });
      form.reset();
      setOpen(false);
      await onSuccess?.();
    } catch (error) {
      console.error("Error al crear el envío:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size="sm" className="flex items-center gap-2 font-extrabold">
          <Plus className="h-4 w-4" strokeWidth={2.5} />
          Nuevo envío
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Crear envío</DialogTitle>
          <DialogDescription>
            Complete los detalles del nuevo envío. Todos los campos son
            obligatorios.
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="scheduledDate"
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
              name="customerName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nombre del cliente</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="from"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Ubicación de origen</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="to"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Ubicación de destino</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Descripción</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter>
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? "Guardando..." : "Guardar"}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
