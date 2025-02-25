import { Shipments } from "@/app/interfaces/travel-shipment.interface";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";

export const columns: ColumnDef<Shipments>[] = [
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
    accessorKey: "shipmentStatus",
    size: 180,
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Travel Status
        </Button>
      );
    },
    enableColumnFilter: true,
    filterFn: (row, id, value) => {
      const rowValue = row.getValue(id);
      return rowValue === value;
    },
    cell: ({ row }) => {
      const shipmentStatus = row.getValue("shipmentStatus");

      const statusStyles = {
        InProgress:
          "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400",
        Delivered:
          "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400",
        Cancelled:
          "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400",
        Reprogrammed:
          "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400",
      };

      return (
        <div
          className={cn(
            "flex items-center justify-center px-3 py-1 rounded-full text-xs font-medium",
            statusStyles[shipmentStatus as keyof typeof statusStyles] ||
              "bg-gray-100 text-gray-700"
          )}
        >
          {shipmentStatus as string}
        </div>
      );
    },
  },
  {
    accessorKey: "deliveryDate",
    size: 180,
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Delivery Date
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => <div>{row.getValue("deliveryDate")}</div>,
  },
  {
    accessorKey: "failureReason",
    size: 180,
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Failure Reason
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => <div>{row.getValue("failureReason")}</div>,
  },
];
