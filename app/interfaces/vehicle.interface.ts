export enum TypeVehicle {
  Chassis = "Chassis",
  Truck = "Truck",
  Van = "Van",
  Pickup = "Pickup",
  TractorUnit = "Tractor",
}

export interface CreateVehicle {
  licensePlate?: string;
  brand?: string;
  model?: string;
  imageUrl?: string;
  type?: TypeVehicle;
}

export interface UpdateVehicle {
  id: string;
  licensePlate?: string;
  brand?: string;
  model?: string;
  imageUrl?: string;
  type?: TypeVehicle;
}

export interface Vehicle {
  licensePlate: string;
  brand: string;
  model: string;
  imageUrl?: string;
  type: TypeVehicle;
}
