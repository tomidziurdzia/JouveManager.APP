import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import Cookies from "js-cookie";
import {
  Travel,
  CreateTravel,
  UpdateTravel,
} from "../interfaces/travel.interface";
import { travelUrls } from "@/lib/urls/travel";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

const getAuthToken = () => Cookies.get("auth_token");

export const fetchTravels = async (): Promise<Travel[]> => {
  const token = getAuthToken();
  const response = await fetch(`${API_URL}${travelUrls.getTravels}`, {
    headers: token ? { Authorization: `Bearer ${token}` } : {},
  });
  if (!response.ok) throw new Error("Error al obtener los viajes");
  return response.json();
};

export const useGetTravels = () => {
  return useQuery({
    queryKey: ["travels"],
    queryFn: fetchTravels,
  });
};

export const fetchTravelById = async (id: string): Promise<Travel> => {
  const token = getAuthToken();
  const response = await fetch(`${API_URL}${travelUrls.getTravelById}/${id}`, {
    headers: token ? { Authorization: `Bearer ${token}` } : {},
  });
  if (!response.ok) throw new Error("Error al obtener el viaje");
  return response.json();
};

export const useGetTravelById = (id: string) => {
  return useQuery({
    queryKey: ["travel", id],
    queryFn: () => fetchTravelById(id),
  });
};

export const createTravel = async (travel: CreateTravel): Promise<Travel> => {
  const token = getAuthToken();
  const newTravel = {
    ...travel,
    assistantId: travel.assistantId === "" ? null : travel.assistantId,
    semiTrailerId: travel.semiTrailerId === "" ? null : travel.semiTrailerId,
  };
  const response = await fetch(`${API_URL}${travelUrls.createTravel}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    body: JSON.stringify(newTravel),
  });
  if (!response.ok) throw new Error("Error al crear el viaje");
  return response.json();
};

export const useCreateTravel = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createTravel,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["travels"] });
    },
  });
};

export const updateTravel = async (
  travel: UpdateTravel
): Promise<UpdateTravel> => {
  const token = getAuthToken();
  const response = await fetch(
    `${API_URL}${travelUrls.updateTravel}/${travel.id}`,
    {
      method: "PUT",
      headers: token ? { Authorization: `Bearer ${token}` } : {},
      body: JSON.stringify(travel),
    }
  );
  if (!response.ok) throw new Error("Error al actualizar el viaje");
  return response.json();
};

export const useUpdateTravel = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateTravel,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["travels"] });
    },
  });
};

export const deleteTravel = async (id: string): Promise<void> => {
  const token = getAuthToken();
  const response = await fetch(`${API_URL}${travelUrls.deleteTravel}/${id}`, {
    method: "DELETE",
    headers: token ? { Authorization: `Bearer ${token}` } : {},
  });
  if (!response.ok) throw new Error("Error al eliminar el viaje");
};

export const useDeleteTravel = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteTravel,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["travels"] });
    },
  });
};

export const fetchTravelsByDate = async (date: string): Promise<Travel[]> => {
  const token = getAuthToken();
  const response = await fetch(
    `${API_URL}${travelUrls.getTravelsByDate}/${date}`,
    {
      headers: token ? { Authorization: `Bearer ${token}` } : {},
    }
  );
  if (!response.ok) throw new Error("Error al obtener los viajes por fecha");
  return response.json();
};

export const useGetTravelsByDate = (date: string) => {
  return useQuery({
    queryKey: ["travels", date],
    queryFn: () => fetchTravelsByDate(date),
  });
};
