import { SemiTrailer } from "@/app/interfaces/semi-trailer";
import { Button } from "@/components/ui/button";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, Truck } from "lucide-react";
import Image from "next/image";

export const columns: ColumnDef<SemiTrailer>[] = [
  {
    accessorKey: "licensePlate",
    size: 200,
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          License Plate
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => <div>{row.getValue("licensePlate")}</div>,
  },
  {
    accessorKey: "brand",
    size: 200,
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Brand
        </Button>
      );
    },
    cell: ({ row }) => <div>{row.getValue("brand")}</div>,
  },
  {
    accessorKey: "model",
    size: 200,
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Model
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => <div>{row.getValue("model")}</div>,
  },
  {
    header: "Type",
    size: 200,
    accessorKey: "type",
    cell: ({ row }) => <div>{row.getValue("type")}</div>,
  },
  {
    header: "Image",
    size: 100,
    accessorKey: "imageUrl",
    cell: ({ row }) => {
      const url = row.getValue("imageUrl") as string;
      return url ? (
        <Image
          src={url}
          alt="Imagen del vehículo"
          width={50}
          height={50}
          style={{ borderRadius: "4px" }}
        />
      ) : (
        <Truck className="w-10 h-10" />
      );
    },
  },
];
