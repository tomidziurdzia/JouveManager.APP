"use client";

import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Edit, Loader2 } from "lucide-react";
import { UpdateShipment } from "@/app/interfaces/shipment.interface";
import { updateShipment } from "@/app/actions/shipment";

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
import { toast } from "sonner";
import { format } from "date-fns";

const createShipmentSchema = z.object({
  customerName: z.string().min(1, "El nombre del cliente es requerido"),
  from: z.string().min(1, "La ubicación de origen es requerida"),
  to: z.string().min(1, "La ubicación de destino es requerida"),
  description: z.string().min(1, "La descripción es requerida"),
  scheduledDate: z.string().min(1, "La fecha programada es requerida"),
});

type CreateShipmentFormValues = z.infer<typeof createShipmentSchema>;

export default function EditShipmentModal({
  shipment,
  onSuccess,
}: {
  shipment: UpdateShipment;
  onSuccess?: () => Promise<void>;
}) {
  const [open, setOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<CreateShipmentFormValues>({
    resolver: zodResolver(createShipmentSchema),
    defaultValues: {
      customerName: shipment.customerName,
      from: shipment.from,
      to: shipment.to,
      description: shipment.description,
      scheduledDate: format(new Date(shipment.scheduledDate), "yyyy-MM-dd"),
    },
    mode: "onChange",
  });

  const onSubmit = async (values: CreateShipmentFormValues) => {
    setIsSubmitting(true);
    try {
      await updateShipment({
        ...values,
        id: shipment.id,
      });
      toast.success("Envío actualizado", {
        description: `El envío ${format(
          new Date(values.scheduledDate),
          "dd/MM/yyyy"
        )} - ${values.customerName} - ${values.from} - ${values.to} - ${
          values.description
        } ha sido actualizado exitosamente.`,
      });
      form.reset();
      setOpen(false);
      onSuccess?.();
    } catch (error) {
      console.error(error);
      toast.error("Error al actualizar el envío");
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
          <DialogTitle>Editar envío</DialogTitle>
          <DialogDescription>
            Edite los detalles del envío. Todos los campos son obligatorios.
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="scheduledDate"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Fecha programada</FormLabel>
                  <FormControl>
                    <Input type="date" {...field} />
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
