import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import Cookies from "js-cookie";
import {
  CreateSemiTrailer,
  SemiTrailer,
  UpdateSemiTrailer,
} from "../interfaces/semi-trailer";
import { semiTrailerUrls } from "@/lib/urls/semi-trailer";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

const getAuthToken = () => Cookies.get("auth_token");

export const fetchSemiTrailers = async (): Promise<SemiTrailer[]> => {
  const token = getAuthToken();
  const response = await fetch(`${API_URL}${semiTrailerUrls.getSemiTrailers}`, {
    headers: token ? { Authorization: `Bearer ${token}` } : {},
  });
  if (!response.ok) throw new Error("Error al obtener los semi-trailers");
  return response.json();
};

export const useGetSemiTrailers = () => {
  return useQuery({
    queryKey: ["semi-trailers"],
    queryFn: fetchSemiTrailers,
  });
};

export const fetchSemiTrailerById = async (
  id: string
): Promise<SemiTrailer> => {
  const token = getAuthToken();
  const response = await fetch(
    `${API_URL}${semiTrailerUrls.getSemiTrailerById}/${id}`,
    {
      headers: token ? { Authorization: `Bearer ${token}` } : {},
    }
  );
  if (!response.ok) throw new Error("Error al obtener el semi-trailer");
  return response.json();
};

export const useGetSemiTrailerById = (id: string) => {
  return useQuery({
    queryKey: ["semi-trailer", id],
    queryFn: () => fetchSemiTrailerById(id),
  });
};

export const createSemiTrailer = async (
  semiTrailer: CreateSemiTrailer
): Promise<SemiTrailer> => {
  const token = getAuthToken();
  const response = await fetch(
    `${API_URL}${semiTrailerUrls.createSemiTrailer}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
      body: JSON.stringify(semiTrailer),
    }
  );
  if (!response.ok) throw new Error("Error al crear el semi-trailer");
  return response.json();
};

export const useCreateSemiTrailer = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createSemiTrailer,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["semi-trailers"] });
    },
  });
};

export const updateSemiTrailer = async (
  semiTrailer: UpdateSemiTrailer
): Promise<void> => {
  console.log(semiTrailer);
  const token = getAuthToken();
  const response = await fetch(
    `${API_URL}${semiTrailerUrls.updateSemiTrailer}/${semiTrailer.id}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
      body: JSON.stringify(semiTrailer),
    }
  );
  if (!response.ok) throw new Error("Error al actualizar el semi-trailer");
};

export const useUpdateSemiTrailer = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateSemiTrailer,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["semi-trailers"] });
    },
  });
};

export const deleteSemiTrailer = async (id: string): Promise<void> => {
  const token = getAuthToken();
  const response = await fetch(
    `${API_URL}${semiTrailerUrls.deleteSemiTrailer}/${id}`,
    {
      method: "DELETE",
      headers: token ? { Authorization: `Bearer ${token}` } : {},
    }
  );
  if (!response.ok) throw new Error("Error al eliminar el semi-trailer");
};

export const useDeleteSemiTrailer = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteSemiTrailer,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["semi-trailers"] });
    },
  });
};
