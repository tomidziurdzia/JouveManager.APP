import { TravelShipment } from "./travel-shipment.interface";

export interface CreateShipment {
  customerName: string;
  from: string;
  to: string;
  description: string;
  scheduledDate: string;
}

export interface UpdateShipment {
  customerName: string;
  from: string;
  to: string;
  description: string;
  scheduledDate: string;
}

export interface Shipment {
  id: string;
  customerName: string;
  from: string;
  to: string;
  description: string;
  isAssigned: boolean;
  scheduledDate: string;
  travelShipments: TravelShipment[];
}
