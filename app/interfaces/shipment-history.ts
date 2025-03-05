import { ShipmentStatus } from "./travel-shipment.interface";

export interface ShipmentHistory {
  id: string;
  oldStatus: ShipmentStatus;
  newStatus: ShipmentStatus;
  comments: string;
  createdAt: string;
  createdBy: string;
  lastModified: string;
  lastModifiedBy: string;
}
