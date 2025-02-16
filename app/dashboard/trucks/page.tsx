"use client";

import React from "react";
import TrucksTable from "./table/trucks-table";
import { DataTableSkeleton } from "./table/data-table-skeleton";
import { useGetVehicles } from "@/app/actions/vehicle";

export default function TruckPage() {
  const { isLoading } = useGetVehicles();
  return (
    <>
      {isLoading ? (
        <DataTableSkeleton
          columnCount={6}
          searchableColumnCount={1}
          filterableColumnCount={2}
          cellWidths={["10rem", "12rem", "12rem", "8rem", "8rem"]}
          shrinkZero
        />
      ) : (
        <TrucksTable />
      )}
    </>
  );
}
