"use client";

import { useGetUsers } from "@/app/actions/user";
import { User } from "@/app/interfaces/user.interface";
import { DataTableFilterField } from "@/types";
import {
  ColumnFiltersState,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
  VisibilityState,
} from "@tanstack/react-table";
import { columns } from "./data-table-columns";
import React, { useState } from "react";
import DataTable from "./data-table";
import { DataTableToolbar } from "./data-table-toolbar";
import { DataTableToolbarActions } from "./data-table-toolbar-actions";

export default function UsersTable() {
  const { data: users = [] } = useGetUsers();

  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = useState({});

  const table = useReactTable({
    data: users,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  });

  const filterFields: DataTableFilterField<User>[] = [
    {
      id: "fullName",
      label: "Name",
      placeholder: "Filter name...",
    },
    {
      id: "fullName",
      label: "Full Name",
      options: Array.from(new Set(users.map((user) => user.fullName))).map(
        (fullName) => ({
          label: fullName,
          value: fullName,
        })
      ),
    },
    {
      id: "email",
      label: "Email",
      options: Array.from(new Set(users.map((user) => user.email))).map(
        (email) => ({
          label: email,
          value: email,
        })
      ),
    },
    {
      id: "roles",
      label: "Roles",
      options: Array.from(new Set(users.flatMap((user) => user.roles))).map(
        (role) => ({
          label: role,
          value: role,
        })
      ),
    },
  ];

  return (
    <>
      <DataTable table={table}>
        <DataTableToolbar table={table} filterFields={filterFields}>
          <DataTableToolbarActions table={table} />
        </DataTableToolbar>
      </DataTable>
    </>
  );
}
