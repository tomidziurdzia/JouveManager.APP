"use client";

import { useGetShipments } from "@/app/actions/shipment";
import { Shipment } from "@/app/interfaces/shipment.interface";
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

export default function ShipmentsTable() {
  const { data: shipments = [] } = useGetShipments();

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
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  });

  const filterFields: DataTableFilterField<Shipment>[] = [
    {
      id: "customerName",
      label: "Customer Name",
      placeholder: "Filter customer name...",
    },
    {
      id: "scheduledDate",
      label: "Scheduled Date",
      options: Array.from(
        new Set(shipments.map((shipment) => shipment.scheduledDate))
      ).map((scheduledDate) => ({
        label: scheduledDate,
        value: scheduledDate,
      })),
    },
    {
      id: "from",
      label: "From",
      options: Array.from(
        new Set(shipments.map((shipment) => shipment.from))
      ).map((from) => ({
        label: from,
        value: from,
      })),
    },
    {
      id: "to",
      label: "To",
      options: Array.from(
        new Set(shipments.map((shipment) => shipment.to))
      ).map((to) => ({
        label: to,
        value: to,
      })),
    },
    {
      id: "description",
      label: "Description",
      options: Array.from(
        new Set(shipments.map((shipment) => shipment.description))
      ).map((description) => ({
        label: description,
        value: description,
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
