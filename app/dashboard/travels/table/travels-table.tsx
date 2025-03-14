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
import { createColumns } from "./data-table-columns";
import React, { useState } from "react";
import DataTable from "./data-table";
import { DataTableToolbar } from "./data-table-toolbar";
import { DataTableToolbarActions } from "./data-table-toolbar-actions";
import CreateTravelModal from "@/components/travels/create-travel-modal";

export default function TravelsTable() {
  const { data: travels = [], refetch } = useGetTravels();

  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = useState({});

  const handleRefresh = async () => {
    await refetch();
  };

  const table = useReactTable({
    data: travels,
    columns: createColumns({ onRefresh: handleRefresh }),
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

  const filterFields: DataTableFilterField<Travel>[] = [
    {
      id: "date",
      label: "Date",
      placeholder: "Filter date...",
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
    <div>
      <div className="flex items-center justify-between">
        <DataTable table={table}>
          <DataTableToolbar table={table} filterFields={filterFields}>
            <CreateTravelModal onSuccess={handleRefresh} />
            <DataTableToolbarActions table={table} />
          </DataTableToolbar>
        </DataTable>
      </div>
    </div>
  );
}
