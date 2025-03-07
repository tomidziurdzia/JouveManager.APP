"use client";

import { useGetShipmentHistory } from "@/app/actions/shipment-history";
import { ArrowRight, MessageSquare, User } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { format } from "date-fns";
import { useParams } from "next/navigation";
import {
  ShipmentStatus,
  shipmentStatusLabel,
  shipmentStatusColors,
  shipmentStatusBorderColors,
} from "@/app/interfaces/shipment-status";

export default function ShipmentHistoryPage() {
  function getStatusColor(status: string): string {
    return (
      shipmentStatusBorderColors[status as ShipmentStatus] ||
      shipmentStatusBorderColors[ShipmentStatus.NotStarted]
    );
  }

  function StatusBadge({ status }: { status: string }) {
    return (
      <span
        className={`text-xs px-2 py-0.5 rounded-full ${
          shipmentStatusColors[status as ShipmentStatus] ||
          shipmentStatusColors[ShipmentStatus.NotStarted]
        }`}
      >
        {shipmentStatusLabel[status as ShipmentStatus] || status}
      </span>
    );
  }

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
                  <StatusBadge status={change.oldStatus} />
                  <ArrowRight className="h-4 w-4 text-muted-foreground" />
                  <StatusBadge status={change.newStatus} />
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
                      <span>{change.lastModifiedBy}</span>
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
