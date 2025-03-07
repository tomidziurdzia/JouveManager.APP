export enum ShipmentStatus {
  NotStarted = "NotStarted",
  InProgress = "InProgress",
  Delivered = "Delivered",
  Cancelled = "Cancelled",
  Reprogrammed = "Reprogrammed",
}

export const shipmentStatusLabel: Record<ShipmentStatus, string> = {
  [ShipmentStatus.NotStarted]: "No Iniciado",
  [ShipmentStatus.InProgress]: "En Progreso",
  [ShipmentStatus.Delivered]: "Entregado",
  [ShipmentStatus.Cancelled]: "Cancelado",
  [ShipmentStatus.Reprogrammed]: "Reprogramado",
};

export const shipmentStatusColors: Record<ShipmentStatus, string> = {
  [ShipmentStatus.NotStarted]: "bg-gray-100 text-gray-800",
  [ShipmentStatus.InProgress]: "bg-blue-100 text-blue-800",
  [ShipmentStatus.Delivered]: "bg-green-100 text-green-800",
  [ShipmentStatus.Cancelled]: "bg-red-100 text-red-800",
  [ShipmentStatus.Reprogrammed]: "bg-yellow-100 text-yellow-800",
};

export const shipmentStatusBorderColors: Record<ShipmentStatus, string> = {
  [ShipmentStatus.NotStarted]: "#9CA3AF", // gray-400
  [ShipmentStatus.InProgress]: "#60A5FA", // blue-400
  [ShipmentStatus.Delivered]: "#34D399", // green-400
  [ShipmentStatus.Cancelled]: "#F87171", // red-400
  [ShipmentStatus.Reprogrammed]: "#FBBF24", // yellow-400
};
