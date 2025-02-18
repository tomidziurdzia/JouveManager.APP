import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import Cookies from "js-cookie";
import {
  CreateVehicle,
  UpdateVehicle,
  Vehicle,
} from "../interfaces/vehicle.interface";
import { vehicleUrls } from "@/lib/urls/vehicle";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

const getAuthToken = () => Cookies.get("auth_token");

export const fetchVehicles = async (): Promise<Vehicle[]> => {
  const token = getAuthToken();
  const response = await fetch(`${API_URL}${vehicleUrls.getVehicles}`, {
    headers: token ? { Authorization: `Bearer ${token}` } : {},
  });
  if (!response.ok) throw new Error("Error al obtener los vehículos");
  return response.json();
};

export const useGetVehicles = () => {
  return useQuery({
    queryKey: ["vehicles"],
    queryFn: fetchVehicles,
  });
};

export const fetchVehicleById = async (id: string): Promise<Vehicle> => {
  const token = getAuthToken();
  const response = await fetch(
    `${API_URL}${vehicleUrls.getVehicleById}/${id}`,
    {
      headers: token ? { Authorization: `Bearer ${token}` } : {},
    }
  );
  if (!response.ok) throw new Error("Error al obtener el vehículo");
  return response.json();
};

export const useGetVehicleById = (id: string) => {
  return useQuery({
    queryKey: ["vehicle", id],
    queryFn: () => fetchVehicleById(id),
  });
};

export const createVehicle = async (
  vehicle: CreateVehicle
): Promise<Vehicle> => {
  const token = getAuthToken();
  const response = await fetch(`${API_URL}${vehicleUrls.createVehicle}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    body: JSON.stringify(vehicle),
  });
  if (!response.ok) throw new Error("Error al crear el vehículo");
  return response.json();
};

export const useCreateVehicle = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createVehicle,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["vehicles"] });
    },
  });
};

export const updateVehicle = async (
  vehicle: UpdateVehicle
): Promise<Vehicle> => {
  const token = getAuthToken();
  const response = await fetch(
    `${API_URL}${vehicleUrls.updateVehicle}/${vehicle.id}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
      body: JSON.stringify(vehicle),
    }
  );
  if (!response.ok) throw new Error("Error al actualizar el vehículo");
  return response.json();
};

export const useUpdateVehicle = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateVehicle,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["vehicles"] });
    },
  });
};

export const deleteVehicle = async (
  id: string
): Promise<{ success: boolean; id: string }> => {
  const token = getAuthToken();
  const response = await fetch(`${API_URL}${vehicleUrls.deleteVehicle}/${id}`, {
    method: "DELETE",
    headers: token ? { Authorization: `Bearer ${token}` } : {},
  });
  if (!response.ok) throw new Error("Error al eliminar el vehículo");
  return response.json();
};

export const useDeleteVehicle = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteVehicle,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["vehicles"] });
    },
  });
};
