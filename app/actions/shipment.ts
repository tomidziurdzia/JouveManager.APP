import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import Cookies from "js-cookie";
import {
  Shipment,
  CreateShipment,
  UpdateShipment,
} from "@/app/interfaces/shipment.interface";
import { shipmentUrls } from "@/lib/urls/shipment";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

const getAuthToken = () => Cookies.get("auth_token");

export const fetchShipments = async (): Promise<Shipment[]> => {
  const token = getAuthToken();
  const response = await fetch(`${API_URL}${shipmentUrls.getShipments}`, {
    headers: token ? { Authorization: `Bearer ${token}` } : {},
  });
  if (!response.ok) throw new Error("Error al obtener los envíos");
  return response.json();
};

export const useGetShipments = () => {
  return useQuery({ queryKey: ["shipments"], queryFn: fetchShipments });
};

export const fetchShipmentById = async (id: string): Promise<Shipment> => {
  const token = getAuthToken();
  const response = await fetch(
    `${API_URL}${shipmentUrls.getShipmentById}/${id}`,
    {
      headers: token ? { Authorization: `Bearer ${token}` } : {},
    }
  );
  if (!response.ok) throw new Error("Error al obtener el envío");
  return response.json();
};

export const useGetShipmentById = (id: string) => {
  return useQuery({
    queryKey: ["shipment", id],
    queryFn: () => fetchShipmentById(id),
  });
};

export const createShipment = async (
  shipment: CreateShipment
): Promise<Shipment> => {
  const token = getAuthToken();
  const response = await fetch(`${API_URL}${shipmentUrls.createShipment}`, {
    method: "POST",
    body: JSON.stringify(shipment),
    headers: token ? { Authorization: `Bearer ${token}` } : {},
  });
  if (!response.ok) throw new Error("Error al crear el envío");
  return response.json();
};

export const useCreateShipment = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createShipment,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["shipments"] });
    },
  });
};

export const updateShipment = async (
  shipment: UpdateShipment
): Promise<UpdateShipment> => {
  const token = getAuthToken();
  const response = await fetch(`${API_URL}${shipmentUrls.updateShipment}`, {
    method: "PUT",
    body: JSON.stringify(shipment),
    headers: token ? { Authorization: `Bearer ${token}` } : {},
  });
  if (!response.ok) throw new Error("Error al actualizar el envío");
  return response.json();
};

export const useUpdateShipment = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateShipment,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["shipments"] });
    },
  });
};

export const deleteShipment = async (id: string): Promise<void> => {
  const token = getAuthToken();
  const response = await fetch(
    `${API_URL}${shipmentUrls.deleteShipment}/${id}`,
    {
      method: "DELETE",
      headers: token ? { Authorization: `Bearer ${token}` } : {},
    }
  );
  if (!response.ok) throw new Error("Error al eliminar el envío");
};

export const useDeleteShipment = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteShipment,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["shipments"] });
    },
  });
};

export const fetchShipmentsByDate = async (
  date: string
): Promise<Shipment[]> => {
  const token = getAuthToken();
  const response = await fetch(
    `${API_URL}${shipmentUrls.getShipmentsByDate}/${date}`,
    {
      headers: token ? { Authorization: `Bearer ${token}` } : {},
    }
  );
  if (!response.ok) throw new Error("Error al obtener los envíos por fecha");
  return response.json();
};

export const useGetShipmentsByDate = (date: string) => {
  return useQuery({
    queryKey: ["shipments", date],
    queryFn: () => fetchShipmentsByDate(date),
  });
};
