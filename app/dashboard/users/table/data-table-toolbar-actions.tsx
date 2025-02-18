import { User } from "@/app/interfaces/user.interface";
import { Button } from "@/components/ui/button";
import { exportTableToPdf } from "@/lib/exportPdf";
import { Table } from "@tanstack/react-table";
import { Download } from "lucide-react";

interface UsersTableToolbarActionsProps {
  table: Table<User>;
}

export function DataTableToolbarActions({
  table,
}: UsersTableToolbarActionsProps) {
  return (
    <div className="flex items-center gap-2">
      <Button
        variant="outline"
        size="sm"
        onClick={() =>
          exportTableToPdf(table, "Users", [
            { header: "Full Name", dataKey: "fullName" },
            { header: "Email", dataKey: "email" },
            { header: "Roles", dataKey: "roles" },
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
