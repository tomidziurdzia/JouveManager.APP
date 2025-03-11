"use client";

import { useGetVehicles } from "@/app/actions/vehicle";
import { Vehicle } from "@/app/interfaces/vehicle.interface";
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
import CreateVehicleModal from "@/components/trucks/create-vehicle-modal";

export default function TrucksTable() {
  const { data: vehicles = [], refetch } = useGetVehicles();

  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = useState({});

  const handleRefresh = async () => {
    await refetch();
  };

  const table = useReactTable({
    data: vehicles,
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
        pageSize: 15,
      },
    },
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  });

  const filterFields: DataTableFilterField<Vehicle>[] = [
    {
      id: "licensePlate",
      label: "License Plate",
      placeholder: "Filter license plate...",
    },
    {
      id: "brand",
      label: "Brand",
      options: Array.from(
        new Set(vehicles.map((vehicle) => vehicle.brand))
      ).map((brand) => ({
        label: brand,
        value: brand,
      })),
    },
    {
      id: "model",
      label: "Model",
      options: Array.from(
        new Set(vehicles.map((vehicle) => vehicle.model))
      ).map((model) => ({
        label: model,
        value: model,
      })),
    },
    {
      id: "type",
      label: "Type",
      options: Array.from(new Set(vehicles.map((vehicle) => vehicle.type))).map(
        (type) => ({
          label: type,
          value: type,
        })
      ),
    },
  ];

  return (
    <>
      <DataTable table={table}>
        <DataTableToolbar table={table} filterFields={filterFields}>
          <CreateVehicleModal onSuccess={handleRefresh} />
          <DataTableToolbarActions table={table} />
        </DataTableToolbar>
      </DataTable>
    </>
  );
}
