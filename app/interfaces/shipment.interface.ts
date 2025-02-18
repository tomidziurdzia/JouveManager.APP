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
  scheduledDate: string;
}
