"use client";

import { format } from "date-fns";
import * as React from "react";
import { cn } from "@/lib/utils";
import { useGetShipmentsByDate } from "@/app/actions/shipment";
import { useGetTravelsByDate } from "@/app/actions/travel";
import ShipmentsTable from "./shipment-table/shipments-table";
import { DatePicker } from "@/components/date-picker";
import { DataTableSkeleton } from "./shipment-table/data-table-skeleton";
import TravelsTable from "./travel-table/travels-table";

export default function DashboardPage() {
  const [date, setDate] = React.useState<Date>(new Date());

  const formattedDate = format(date, "yyyy-MM-dd");

  const { data: shipments = [], isLoading: shipmentsLoading } =
    useGetShipmentsByDate(formattedDate);

  const { data: travels = [], isLoading: travelsLoading } =
    useGetTravelsByDate(formattedDate);

  return (
    <div className={cn("w-full space-y-2.5 overflow-auto relative")}>
      <div className="flex items-center justify-between absolute">
        <DatePicker date={date} onDateChange={setDate} />
      </div>
      <div className="grid gap-4 grid-cols-1">
        <>
          {shipmentsLoading ? (
            <DataTableSkeleton
              columnCount={6}
              cellWidths={["10rem", "12rem", "12rem", "8rem", "8rem"]}
              shrinkZero
            />
          ) : (
            <ShipmentsTable shipments={shipments} />
          )}
        </>
      </div>

      <div className="grid gap-4 grid-cols-1 mt-10">
        <>
          {travelsLoading ? (
            <DataTableSkeleton
              columnCount={6}
              cellWidths={["10rem", "12rem", "12rem", "8rem", "8rem"]}
              shrinkZero
            />
          ) : (
            <TravelsTable travels={travels} />
          )}
        </>
      </div>
    </div>
  );
}
