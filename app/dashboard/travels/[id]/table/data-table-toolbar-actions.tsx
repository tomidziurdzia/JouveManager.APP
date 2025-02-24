import { Shipments } from "@/app/interfaces/travel-shipment.interface";
import { Button } from "@/components/ui/button";
import { exportTableToPdf } from "@/lib/exportPdf";
import { Table } from "@tanstack/react-table";
import { Download } from "lucide-react";

interface ShipmentsTableToolbarActionsProps {
  table: Table<Shipments>;
}

export function DataTableToolbarActions({
  table,
}: ShipmentsTableToolbarActionsProps) {
  return (
    <div className="flex items-center gap-2">
      <Button
        variant="outline"
        size="sm"
        onClick={() =>
          exportTableToPdf(table, "Shipments", [
            { header: "Scheduled Date", dataKey: "scheduledDate" },
            { header: "Customer Name", dataKey: "customerName" },
            { header: "From", dataKey: "from" },
            { header: "To", dataKey: "to" },
            { header: "Description", dataKey: "description" },
          ])
        }
        className="gap-2"
      >
        <Download className="size-4" aria-hidden="true" />
        Export
      </Button>
    </div>
  );
}
