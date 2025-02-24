import { Travel } from "@/app/interfaces/travel.interface";
import { Button } from "@/components/ui/button";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, Search } from "lucide-react";
import Link from "next/link";

export const columns: ColumnDef<Travel>[] = [
  {
    accessorKey: "date",
    size: 150,
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Date
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const date = new Date(row.getValue("date"));
      const day = date.getDate().toString().padStart(2, "0");
      const month = (date.getMonth() + 1).toString().padStart(2, "0");
      const year = date.getFullYear();
      return <div>{`${day}-${month}-${year}`}</div>;
    },
  },
  {
    accessorKey: "driverName",
    size: 200,
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Driver Name
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => <div>{row.getValue("driverName")}</div>,
  },
  {
    accessorKey: "assistantName",
    size: 200,
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Assistant Name
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => <div>{row.getValue("assistantName")}</div>,
  },
  {
    header: "Vehicle License Plate",
    size: 180,
    accessorKey: "vehicleLicensePlate",
    cell: ({ row }) => <div>{row.getValue("vehicleLicensePlate")}</div>,
  },
  {
    header: "Semi Trailer License Plate",
    size: 180,
    accessorKey: "semiTrailerLicensePlate",
    cell: ({ row }) => <div>{row.getValue("semiTrailerLicensePlate")}</div>,
  },
  {
    id: "actions",
    size: 50,
    cell: ({ row }) => {
      return (
        <Link href={`/dashboard/travels/${row.original.id}`}>
          <Search className="h-4 w-4 cursor-pointer hover:text-primary" />
        </Link>
      );
    },
  },
];
