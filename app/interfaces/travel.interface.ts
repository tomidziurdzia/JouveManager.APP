export interface Travel {
  id: string;
  date: string;
  driverId: string;
  driverName: string;
  assistantId?: string | null;
  assistantName: string;
  vehicleId: string;
  vehicleLicensePlate: string;
  semiTrailerId?: string | null;
  semiTrailerLicensePlate: string;
}

export interface CreateTravel {
  id?: string;
  date: string;
  driverId: string;
  assistantId?: string | null;
  vehicleId: string;
  semiTrailerId?: string | null;
}

export interface UpdateTravel {
  id?: string;
  date: string;
  driverId: string;
  assistantId?: string | null;
  vehicleId: string;
  semiTrailerId?: string | null;
}
