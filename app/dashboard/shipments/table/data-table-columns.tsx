import { Shipment } from "@/app/interfaces/shipment.interface";
import DeleteShipmentModal from "@/components/shipments/delete-shipment-modal";
import EditShipmentModal from "@/components/shipments/edit-shipment-modal";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, Search } from "lucide-react";
import Link from "next/link";

interface CreateColumnsProps {
  onRefresh: () => Promise<void>;
}

export const createColumns = ({
  onRefresh,
}: CreateColumnsProps): ColumnDef<Shipment>[] => [
  {
    accessorKey: "scheduledDate",
    size: 150,
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Scheduled Date
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const date = new Date(row.getValue("scheduledDate"));
      const day = date.getDate().toString().padStart(2, "0");
      const month = (date.getMonth() + 1).toString().padStart(2, "0");
      const year = date.getFullYear();
      return <div>{`${day}-${month}-${year}`}</div>;
    },
  },
  {
    accessorKey: "customerName",
    size: 200,
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Customer Name
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => <div>{row.getValue("customerName")}</div>,
  },
  {
    accessorKey: "from",
    size: 200,
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          From
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => <div>{row.getValue("from")}</div>,
  },
  {
    accessorKey: "to",
    size: 180,
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          To
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => <div>{row.getValue("to")}</div>,
  },
  {
    accessorKey: "description",
    size: 180,
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Description
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => <div>{row.getValue("description")}</div>,
  },
  {
    accessorKey: "isAssigned",
    size: 180,
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Assigned
        </Button>
      );
    },
    enableColumnFilter: true,
    filterFn: (row, id, value) => {
      const rowValue = row.getValue(id);
      return rowValue === value;
    },
    cell: ({ row }) => {
      const isAssigned = row.getValue("isAssigned");
      return (
        <div
          className={cn(
            "flex items-center justify-center px-3 py-1 rounded-full text-xs font-medium w-16",
            isAssigned
              ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400"
              : "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400"
          )}
        >
          {isAssigned ? "Yes" : "No"}
        </div>
      );
    },
  },
  {
    id: "actions",
    size: 50,
    cell: ({ row }) => {
      const shipment = row.original;
      return (
        <div className="flex items-center gap-2">
          <Link href={`/dashboard/shipments/${row.original.id}`}>
            <Search className="h-4 w-4 cursor-pointer hover:text-primary" />
          </Link>
          <EditShipmentModal shipment={shipment} onSuccess={onRefresh} />
          <DeleteShipmentModal shipment={shipment} onSuccess={onRefresh} />
        </div>
      );
    },
  },
];
