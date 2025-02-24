import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Truck, User, CalendarDays } from "lucide-react";
import { formatDate } from "@/lib/utils";
import { TravelShipments } from "@/app/interfaces/travel-shipment.interface";

export default function TravelHeader({
  travelShipment,
}: {
  travelShipment: TravelShipments;
}) {
  return (
    <div className="flex flex-col gap-4">
      <Card>
        <CardHeader>
          <CardTitle>Travel Information</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-6 md:grid-cols-2">
            {/* Left Column */}
            <div className="space-y-6">
              {/* Date */}
              <div className="flex items-start gap-4">
                <div className="rounded-md bg-primary/10 p-2">
                  <CalendarDays className="h-4 w-4 text-primary" />
                </div>
                <div className="space-y-1">
                  <p className="text-sm font-medium leading-none">Date:</p>
                  <p className="text-sm text-muted-foreground">
                    {formatDate(new Date(travelShipment.date))}
                  </p>
                </div>
              </div>

              {/* Vehicle */}
              <div className="flex items-start gap-4">
                <div className="rounded-md bg-primary/10 p-2">
                  <Truck className="h-4 w-4 text-primary" />
                </div>
                <div className="space-y-1">
                  <p className="text-sm font-medium leading-none">Vehicle:</p>
                  <p className="text-sm text-muted-foreground">
                    {travelShipment.vehicleLicensePlate}
                  </p>
                </div>
              </div>
            </div>

            {/* Right Column */}
            <div className="space-y-6">
              {/* Driver */}
              <div className="flex items-start gap-4">
                <div className="rounded-md bg-primary/10 p-2">
                  <User className="h-4 w-4 text-primary" />
                </div>
                <div className="space-y-1">
                  <p className="text-sm font-medium leading-none">Driver:</p>
                  <p className="text-sm text-muted-foreground">
                    {travelShipment.driverName}
                  </p>
                </div>
              </div>

              {/* Semi-Trailer */}
              <div className="flex items-start gap-4">
                <div className="rounded-md bg-primary/10 p-2">
                  <Truck className="h-4 w-4 text-primary" />
                </div>
                <div className="space-y-1">
                  <p className="text-sm font-medium leading-none">
                    Semi-Trailer:
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {travelShipment.semiTrailerLicensePlate}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
