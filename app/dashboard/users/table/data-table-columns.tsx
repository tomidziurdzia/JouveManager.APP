import { User } from "@/app/interfaces/user.interface";
import { Button } from "@/components/ui/button";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, User2 } from "lucide-react";
import Image from "next/image";

export const columns: ColumnDef<User>[] = [
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
        <User2 className="w-10 h-10" />
      );
    },
  },
  {
    accessorKey: "fullName",
    size: 200,
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Full Name
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => <div>{row.getValue("fullName")}</div>,
  },
  {
    accessorKey: "email",
    size: 200,
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Email
        </Button>
      );
    },
    cell: ({ row }) => <div>{row.getValue("email")}</div>,
  },
  {
    accessorKey: "roles",
    size: 200,
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Roles
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const roles = row.getValue("roles") as string[];
      return <div>{roles.join(" - ")}</div>;
    },
  },
];
