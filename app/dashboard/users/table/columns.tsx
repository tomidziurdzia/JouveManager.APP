import { Button } from "@/components/ui/button";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, User } from "lucide-react";
import Image from "next/image";
import { User as UserInterface } from "@/app/interfaces/user.interface";

export const columns: ColumnDef<UserInterface>[] = [
  {
    header: "Image",
    size: 100,
    accessorKey: "avatarUrl",
    cell: ({ row }) => {
      const url = row.getValue("avatarUrl") as string;
      return url ? (
        <Image
          src={url}
          alt="Imagen del usuario"
          width={50}
          height={50}
          style={{ borderRadius: "4px" }}
        />
      ) : (
        <User className="w-10 h-10" />
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
  {
    header: "Email",
    size: 200,
    accessorKey: "email",
    cell: ({ row }) => <div>{row.getValue("email")}</div>,
  },
];
