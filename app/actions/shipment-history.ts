import Cookies from "js-cookie";
import { shipmentHistory } from "@/lib/urls/shipment-history";
import { ShipmentHistory } from "../interfaces/shipment-history";
import { useQuery } from "@tanstack/react-query";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

const getAuthToken = () => Cookies.get("auth_token");

export const fetchShipmentHistory = async (
  shipmentId: string
): Promise<ShipmentHistory[]> => {
  console.log(shipmentId);
  const token = getAuthToken();
  const response = await fetch(
    `${API_URL}${shipmentHistory.getShipmentHistory}${shipmentId}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  if (!response.ok) throw new Error("Error al obtener el historial de envíos");
  return response.json();
};

export const useGetShipmentHistory = (shipmentId: string) => {
  return useQuery({
    queryKey: ["shipment-history"],
    queryFn: () => fetchShipmentHistory(shipmentId),
  });
};
