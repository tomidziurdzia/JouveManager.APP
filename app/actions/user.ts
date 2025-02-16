import { useQuery } from "@tanstack/react-query";
import { User } from "../interfaces/user.interface";
import { usersUrls } from "@/lib/urls/auth";
import Cookies from "js-cookie";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

const getAuthToken = () => Cookies.get("auth_token");

export const fetchUsers = async (): Promise<User[]> => {
  const token = getAuthToken();
  const response = await fetch(`${API_URL}${usersUrls.getUsers}`, {
    headers: token ? { Authorization: `Bearer ${token}` } : {},
  });
  if (!response.ok) throw new Error("Error al obtener los usuarios");
  return response.json();
};

export const useGetUsers = () => {
  return useQuery({
    queryKey: ["users"],
    queryFn: fetchUsers,
  });
};
