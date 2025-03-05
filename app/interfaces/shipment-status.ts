export enum ShipmentStatus {
  NotStarted = "NotStarted",
  InProgress = "InProgress",
  Completed = "Completed",
  Cancelled = "Cancelled",
}

export const shipmentStatusLabel: Record<ShipmentStatus, string> = {
  [ShipmentStatus.NotStarted]: "No Iniciado",
  [ShipmentStatus.InProgress]: "En Progreso",
  [ShipmentStatus.Completed]: "Completado",
  [ShipmentStatus.Cancelled]: "Cancelado",
};
