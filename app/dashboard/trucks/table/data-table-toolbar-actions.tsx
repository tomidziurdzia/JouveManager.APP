import { Vehicle } from "@/app/interfaces/vehicle.interface";
import { Button } from "@/components/ui/button";
import { exportTableToPdf } from "@/lib/exportPdf";
import { Table } from "@tanstack/react-table";
import { Download } from "lucide-react";

interface TrucksTableToolbarActionsProps {
  table: Table<Vehicle>;
}

export function DataTableToolbarActions({
  table,
}: TrucksTableToolbarActionsProps) {
  return (
    <div className="flex items-center gap-2">
      <Button
        variant="outline"
        size="sm"
        onClick={() => exportTableToPdf(table)}
        className="gap-2"
      >
        <Download className="size-4" aria-hidden="true" />
        Export
      </Button>
    </div>
  );
}
