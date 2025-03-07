import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import { useState } from "react";
import { useDeleteVehicle } from "@/app/actions/vehicle";
import { Vehicle } from "@/app/interfaces/vehicle.interface";

interface DeleteVehicleModalProps {
  vehicle: Vehicle;
  onSuccess?: () => Promise<void>;
}

export default function DeleteVehicleModal({
  vehicle,
  onSuccess,
}: DeleteVehicleModalProps) {
  const [open, setOpen] = useState(false);
  const deleteVehicleMutation = useDeleteVehicle();

  const handleDelete = async () => {
    try {
      await deleteVehicleMutation.mutateAsync(vehicle.id ?? "");
      setOpen(false);
      await onSuccess?.();
    } catch (error) {
      console.error("Error al eliminar el vehículo:", error);
    }
  };

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8 text-red-500 hover:text-red-600 hover:bg-red-100"
        >
          <Trash2 className="h-4 w-4" />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>¿Está seguro?</AlertDialogTitle>
          <AlertDialogDescription>
            Esta acción no se puede deshacer. Esto eliminará permanentemente el
            vehículo{" "}
            <span className="font-semibold">{vehicle.licensePlate}</span> y
            todos sus datos asociados.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancelar</AlertDialogCancel>
          <AlertDialogAction
            onClick={handleDelete}
            className="bg-red-500 hover:bg-red-600"
          >
            Eliminar
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
