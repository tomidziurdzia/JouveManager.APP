export interface TravelShipment {
  id: string;
  shipmentId: string;
  travelId: string;
  shipmentStatus: ShipmentStatus;
  deliveryDate: Date;
}

export interface TravelShipments {
  id: string;
  date: Date;
  driverId: string;
  driverName: string;
  assistantId: string;
  assistantName: string;
  vehicleId: string;
  vehicleLicensePlate: string;
  semiTrailerId: string;
  semiTrailerLicensePlate: string;
  shipments: Shipments[];
}

export interface Shipments {
  shipmentId: string;
  customerName: string;
  from: string;
  to: string;
  description: string;
  scheduledDate: Date;
  shipmentStatus: ShipmentStatus;
  deliveryDate: Date;
  failureReason: string;
}

export enum ShipmentStatus {
  NotStarted = "NotStarted",
  InProgress = "InProgress",
  Delivered = "Delivered",
  Cancelled = "Cancelled",
  Reprogrammed = "Reprogrammed",
}
