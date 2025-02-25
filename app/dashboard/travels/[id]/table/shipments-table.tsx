"use client";

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
import { Shipments } from "@/app/interfaces/travel-shipment.interface";

export default function ShipmentsTable({
  shipments,
}: {
  shipments: Shipments[];
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
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    initialState: {
      pagination: {
        pageSize: 20,
      },
    },
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  });

  const filterFields: DataTableFilterField<Shipments>[] = [
    {
      id: "customerName",
      label: "Customer Name",
      placeholder: "Filter customer name...",
    },
    {
      id: "shipmentStatus",
      label: "Shipment Status",
      options: [
        { label: "In Progress", value: "InProgress" },
        { label: "Delivered", value: "Delivered" },
        { label: "Cancelled", value: "Cancelled" },
        { label: "Reprogrammed", value: "Reprogrammed" },
      ],
    },
  ];

  return (
    <>
      <div className="text-lg font-bold mt-8">Shipments</div>
      <DataTable table={table}>
        <DataTableToolbar table={table} filterFields={filterFields}>
          <DataTableToolbarActions table={table} />
        </DataTableToolbar>
      </DataTable>
    </>
  );
}
