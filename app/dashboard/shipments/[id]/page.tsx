"use client";

import { useGetShipmentHistory } from "@/app/actions/shipment-history";
import { MessageSquare, User } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { format } from "date-fns";
import { useParams } from "next/navigation";
import {
  ShipmentStatus,
  shipmentStatusLabel,
} from "@/app/interfaces/shipment-status";

export default function ShipmentHistoryPage() {
  const { id } = useParams();
  const { data: shipmentHistory = [] } = useGetShipmentHistory(id as string);
  return (
    <CardContent className="p-6">
      <div className="flex flex-col gap-4">
        {shipmentHistory.length > 0 ? (
          shipmentHistory.map((change) => (
            <div key={change.id} className="flex flex-col gap-2">
              {/* Header Row */}
              <div className="flex items-center justify-between bg-muted/30 p-3 rounded-lg">
                <div className="flex items-center gap-4">
                  <StatusBadge status={change.newStatus} />
                  <div className="text-sm font-medium">
                    {
                      shipmentStatusLabel[
                        change.oldStatus as unknown as ShipmentStatus
                      ]
                    }{" "}
                    →{" "}
                    {
                      shipmentStatusLabel[
                        change.newStatus as unknown as ShipmentStatus
                      ]
                    }
                  </div>
                </div>
                <div className="text-sm text-muted-foreground">
                  {format(new Date(change.createdAt), "dd/MM/yyyy HH:mm")}
                </div>
              </div>

              {/* Content Card */}
              <Card
                className="border-l-4"
                style={{ borderLeftColor: getStatusColor(change.newStatus) }}
              >
                <CardContent className="p-4">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-sm">
                      <MessageSquare className="h-4 w-4 text-muted-foreground" />
                      <span>{change.comments}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <User className="h-4 w-4 text-muted-foreground" />
                      <span>{change.createdBy}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          ))
        ) : (
          <div className="text-center py-8 text-muted-foreground">
            No hay resultados.
          </div>
        )}
      </div>
    </CardContent>
  );
}

function getStatusColor(status: string): string {
  switch (status as ShipmentStatus) {
    case ShipmentStatus.NotStarted:
      return "#9CA3AF"; // gray-400
    case ShipmentStatus.InProgress:
      return "#60A5FA"; // blue-400
    case ShipmentStatus.Completed:
      return "#34D399"; // green-400
    case ShipmentStatus.Cancelled:
      return "#F87171"; // red-400
    default:
      return "#9CA3AF"; // gray-400
  }
}

function StatusBadge({ status }: { status: string }) {
  const statusColors: Record<ShipmentStatus, string> = {
    [ShipmentStatus.NotStarted]: "bg-gray-100 text-gray-800",
    [ShipmentStatus.InProgress]: "bg-blue-100 text-blue-800",
    [ShipmentStatus.Completed]: "bg-green-100 text-green-800",
    [ShipmentStatus.Cancelled]: "bg-red-100 text-red-800",
  };

  return (
    <span
      className={`text-xs px-2 py-0.5 rounded-full ${
        statusColors[status as ShipmentStatus] ||
        statusColors[ShipmentStatus.NotStarted]
      }`}
    >
      {shipmentStatusLabel[status as ShipmentStatus] || status}
    </span>
  );
}
