"use client";

import { useGetSemiTrailers } from "@/app/actions/semi-trailer";
import { SemiTrailer } from "@/app/interfaces/semi-trailer";
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

export default function SemiTrailersTable() {
  const { data: semiTrailers = [] } = useGetSemiTrailers();

  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = useState({});

  const table = useReactTable({
    data: semiTrailers,
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

  const filterFields: DataTableFilterField<SemiTrailer>[] = [
    {
      id: "licensePlate",
      label: "License Plate",
      placeholder: "Filter license plate...",
    },
    {
      id: "brand",
      label: "Brand",
      options: Array.from(
        new Set(semiTrailers.map((semiTrailer) => semiTrailer.brand))
      ).map((brand) => ({
        label: brand,
        value: brand,
      })),
    },
    {
      id: "model",
      label: "Model",
      options: Array.from(
        new Set(semiTrailers.map((semiTrailer) => semiTrailer.model))
      ).map((model) => ({
        label: model,
        value: model,
      })),
    },
    {
      id: "type",
      label: "Type",
      options: Array.from(
        new Set(semiTrailers.map((semiTrailer) => semiTrailer.type))
      ).map((type) => ({
        label: type,
        value: type,
      })),
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
