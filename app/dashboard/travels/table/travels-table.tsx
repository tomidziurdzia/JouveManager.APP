"use client";

import { useGetTravels } from "@/app/actions/travel";
import { Travel } from "@/app/interfaces/travel.interface";
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

export default function TravelsTable() {
  const { data: travels = [] } = useGetTravels();

  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = useState({});

  const table = useReactTable({
    data: travels,
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

  const filterFields: DataTableFilterField<Travel>[] = [
    {
      id: "date",
      label: "Date",
      placeholder: "Filter date...",
    },
    {
      id: "date",
      label: "Date",
      options: Array.from(
        new Set(
          travels.map((travel) => {
            const date = new Date(travel.date);
            const day = date.getDate().toString().padStart(2, "0");
            const month = (date.getMonth() + 1).toString().padStart(2, "0");
            const year = date.getFullYear();
            return `${day}-${month}-${year}`;
          })
        )
      ).map((date) => ({
        label: date,
        value: date,
      })),
    },
    {
      id: "driverName",
      label: "Driver Name",
      options: Array.from(
        new Set(travels.map((travel) => travel.driverName))
      ).map((driverName) => ({
        label: driverName,
        value: driverName,
      })),
    },
    {
      id: "assistantName",
      label: "Assistant Name",
      options: Array.from(
        new Set(travels.map((travel) => travel.assistantName))
      ).map((assistantName) => ({
        label: assistantName,
        value: assistantName,
      })),
    },
    {
      id: "vehicleLicensePlate",
      label: "Vehicle License Plate",
      options: Array.from(
        new Set(travels.map((travel) => travel.vehicleLicensePlate))
      ).map((vehicleLicensePlate) => ({
        label: vehicleLicensePlate,
        value: vehicleLicensePlate,
      })),
    },
    {
      id: "semiTrailerLicensePlate",
      label: "Semi Trailer License Plate",
      options: Array.from(
        new Set(travels.map((travel) => travel.semiTrailerLicensePlate))
      ).map((semiTrailerLicensePlate) => ({
        label: semiTrailerLicensePlate,
        value: semiTrailerLicensePlate,
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
