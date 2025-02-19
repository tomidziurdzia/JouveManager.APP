"use client";

import { addDays, format, subDays } from "date-fns";
import { CalendarIcon, ChevronLeft, ChevronRight } from "lucide-react";
import * as React from "react";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { cn } from "@/lib/utils";
import { useGetShipmentsByDate } from "@/app/actions/shipment";
import { useGetTravelsByDate } from "@/app/actions/travel";
import { Skeleton } from "@/components/ui/skeleton";

export default function DashboardPage() {
  const [date, setDate] = React.useState<Date>(new Date());
  const [open, setOpen] = React.useState(false);

  const formattedDate = format(date, "yyyy-MM-dd");

  const {
    data: shipments = [],
    isLoading: shipmentsLoading,
    error: shipmentsError,
  } = useGetShipmentsByDate(formattedDate);

  const {
    data: travels = [],
    isLoading: travelsLoading,
    error: travelsError,
  } = useGetTravelsByDate(formattedDate);

  return (
    <div className={cn("w-full space-y-2.5 overflow-auto")}>
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            size="icon"
            onClick={() => setDate(subDays(date, 1))}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
              <Button
                variant={"outline"}
                className="w-[280px] justify-start text-left font-normal"
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {format(date, "PPP")}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <Calendar
                mode="single"
                selected={date}
                onSelect={(newDate) => {
                  if (newDate) {
                    setDate(newDate);
                    setOpen(false);
                  }
                }}
                initialFocus
                defaultMonth={date}
              />
            </PopoverContent>
          </Popover>
          <Button
            variant="outline"
            size="icon"
            onClick={() => setDate(addDays(date, 1))}
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <div className="grid gap-4 grid-cols-1">
        <Card>
          <CardHeader>
            <CardTitle>Shipments - {format(date, "PPP")}</CardTitle>
          </CardHeader>
          <CardContent>
            {shipmentsLoading ? (
              <Skeleton className="w-full h-32" />
            ) : shipmentsError ? (
              <div className="text-center text-red-500">
                Error loading shipments
              </div>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Customer</TableHead>
                    <TableHead>From</TableHead>
                    <TableHead>To</TableHead>
                    <TableHead>Description</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {shipments.length > 0 ? (
                    shipments.map((shipment) => (
                      <TableRow key={shipment.id}>
                        <TableCell className="font-medium">
                          {shipment.customerName}
                        </TableCell>
                        <TableCell>{shipment.from}</TableCell>
                        <TableCell>{shipment.to}</TableCell>
                        <TableCell>{shipment.description}</TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell
                        colSpan={4}
                        className="text-center text-muted-foreground"
                      >
                        No shipments scheduled for this date
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Travels - {format(date, "PPP")}</CardTitle>
          </CardHeader>
          <CardContent>
            {travelsLoading ? (
              <Skeleton className="w-full h-32" />
            ) : travelsError ? (
              <div className="text-center text-red-500">
                Error loading travels
              </div>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Driver</TableHead>
                    <TableHead>Assistant</TableHead>
                    <TableHead>Vehicle Plate</TableHead>
                    <TableHead>Trailer Plate</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {travels.length > 0 ? (
                    travels.map((travel) => (
                      <TableRow key={travel.id}>
                        <TableCell className="font-medium">
                          {travel.driverName}
                        </TableCell>
                        <TableCell>{travel.assistantName}</TableCell>
                        <TableCell>{travel.vehicleLicensePlate}</TableCell>
                        <TableCell>{travel.semiTrailerLicensePlate}</TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell
                        colSpan={4}
                        className="text-center text-muted-foreground"
                      >
                        No travels scheduled for this date
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
