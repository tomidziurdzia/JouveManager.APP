import { useQuery } from "@tanstack/react-query";
import Cookies from "js-cookie";
import { travelShipmentsUrls } from "@/lib/urls/travel-shipments";
import {
  TravelShipment,
  TravelShipments,
} from "../interfaces/travel-shipment.interface";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

const getAuthToken = () => Cookies.get("auth_token");

export const fetchTravelShipments = async (): Promise<TravelShipment[]> => {
  const token = getAuthToken();
  const response = await fetch(
    `${API_URL}${travelShipmentsUrls.getTravelShipments}`,
    {
      headers: token ? { Authorization: `Bearer ${token}` } : {},
    }
  );
  if (!response.ok) throw new Error("Error al obtener los viajes");
  return response.json();
};

export const useGetTravelShipments = () => {
  return useQuery({
    queryKey: ["travel-shipments"],
    queryFn: fetchTravelShipments,
  });
};

export const fetchTravelShipmentById = async (
  id: string
): Promise<TravelShipments> => {
  const token = getAuthToken();
  const response = await fetch(
    `${API_URL}${travelShipmentsUrls.getTravelShipmentsById}/${id}`,
    {
      headers: token ? { Authorization: `Bearer ${token}` } : {},
    }
  );
  if (!response.ok) throw new Error("Error al obtener el viaje");
  return response.json();
};

export const useGetTravelShipmentById = (id: string) => {
  return useQuery({
    queryKey: ["travel-shipment", id],
    queryFn: () => fetchTravelShipmentById(id),
  });
};
