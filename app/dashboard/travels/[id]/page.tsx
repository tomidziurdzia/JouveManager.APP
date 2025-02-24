"use client";

import { useGetTravelShipmentById } from "@/app/actions/travel-shipments";
import { useParams } from "next/navigation";
import { LoadingCard } from "./loading-card";
import TravelHeader from "./travel-header";
import ShipmentsTable from "./table/shipments-table";

export default function TravelPage() {
  const { id } = useParams();
  const { data: travelShipment, isLoading } = useGetTravelShipmentById(
    id as string
  );

  if (isLoading) {
    return (
      <div className="flex flex-col gap-4">
        <LoadingCard />
      </div>
    );
  }

  if (!travelShipment) return null;

  return (
    <div className="flex flex-col gap-4">
      <TravelHeader travelShipment={travelShipment} />
      <ShipmentsTable shipments={travelShipment.shipments} />
    </div>
  );
}
