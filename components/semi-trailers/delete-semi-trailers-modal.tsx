"use client";

import { useState } from "react";
import { Trash2, Loader2 } from "lucide-react";
import { toast } from "sonner";
import type { SemiTrailer } from "@/app/interfaces/semi-trailer";
import { deleteSemiTrailer } from "@/app/actions/semi-trailer";

import { Button } from "@/components/ui/button";
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

interface DeleteSemiTrailerModalProps {
  semiTrailer: SemiTrailer;
  onSuccess?: () => Promise<void>;
}

export default function DeleteSemiTrailerModal({
  semiTrailer,
  onSuccess,
}: DeleteSemiTrailerModalProps) {
  const [open, setOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    setIsDeleting(true);
    try {
      await deleteSemiTrailer(semiTrailer.id ?? "");
      toast.success("Semi-trailer eliminado", {
        description: `El semi-trailer ${semiTrailer.brand} ${semiTrailer.model} ha sido eliminado exitosamente.`,
      });
      setOpen(false);
      await onSuccess?.();
    } catch (error) {
      console.error("Error al eliminar el semi-trailer:", error);
      toast.error("Error", {
        description: "No se pudo eliminar el semi-trailer. Intente nuevamente.",
      });
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8 text-destructive hover:text-destructive hover:bg-destructive/10"
        >
          <Trash2 className="h-4 w-4" />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            ¿Está seguro de eliminar este semi-trailer?
          </AlertDialogTitle>
          <AlertDialogDescription>
            Esta acción no se puede deshacer. Esto eliminará permanentemente el
            semi-trailer{" "}
            <span className="font-semibold">{semiTrailer.licensePlate}</span> (
            {semiTrailer.brand} {semiTrailer.model}) y todos sus datos
            asociados.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel disabled={isDeleting}>Cancelar</AlertDialogCancel>
          <AlertDialogAction
            onClick={handleDelete}
            className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            disabled={isDeleting}
          >
            {isDeleting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Eliminando...
              </>
            ) : (
              "Eliminar"
            )}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
