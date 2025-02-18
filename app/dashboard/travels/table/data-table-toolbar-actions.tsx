import { Travel } from "@/app/interfaces/travel.interface";
import { Button } from "@/components/ui/button";
import { exportTableToPdf } from "@/lib/exportPdf";
import { Table } from "@tanstack/react-table";
import { Download } from "lucide-react";

interface TravelsTableToolbarActionsProps {
  table: Table<Travel>;
}

export function DataTableToolbarActions({
  table,
}: TravelsTableToolbarActionsProps) {
  return (
    <div className="flex items-center gap-2">
      <Button
        variant="outline"
        size="sm"
        onClick={() =>
          exportTableToPdf(table, "Travels", [
            { header: "Date", dataKey: "date" },
            { header: "Driver Name", dataKey: "driverName" },
            { header: "Assistant Name", dataKey: "assistantName" },
            { header: "Vehicle License Plate", dataKey: "vehicleLicensePlate" },
            {
              header: "Semi Trailer License Plate",
              dataKey: "semiTrailerLicensePlate",
            },
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
