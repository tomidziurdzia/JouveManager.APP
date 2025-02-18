import { SemiTrailer } from "@/app/interfaces/semi-trailer";
import { Button } from "@/components/ui/button";
import { exportTableToPdf } from "@/lib/exportPdf";
import { Table } from "@tanstack/react-table";
import { Download } from "lucide-react";

interface SemiTrailersTableToolbarActionsProps {
  table: Table<SemiTrailer>;
}

export function DataTableToolbarActions({
  table,
}: SemiTrailersTableToolbarActionsProps) {
  return (
    <div className="flex items-center gap-2">
      <Button
        variant="outline"
        size="sm"
        onClick={() =>
          exportTableToPdf(table, "Semi-trailers", [
            { header: "License Plate", dataKey: "licensePlate" },
            { header: "Brand", dataKey: "brand" },
            { header: "Model", dataKey: "model" },
            { header: "Type", dataKey: "type" },
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
