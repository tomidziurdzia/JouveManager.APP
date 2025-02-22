"use client";

import { Shipment } from "@/app/interfaces/shipment.interface";
import {
  ColumnFiltersState,
  getCoreRowModel,
  getFilteredRowModel,
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

export default function ShipmentsTable({
  shipments,
}: {
  shipments: Shipment[];
}) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = useState({});

  const table = useReactTable({
    data: shipments,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
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

  return (
    <>
      <DataTable table={table}>
        <DataTableToolbar table={table}>
          <DataTableToolbarActions table={table} />
        </DataTableToolbar>
      </DataTable>
    </>
  );
}
