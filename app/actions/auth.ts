"use server";

import { LoginUser, User } from "@/app/interfaces/user.interface";
import { authUrls } from "@/lib/urls/auth";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export async function login(credentials: LoginUser): Promise<User> {
  try {
    const response = await fetch(`${API_URL}${authUrls.signin}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(credentials),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.detail);
    }

    const user = await response.json();

    const cookieStore = await cookies();

    cookieStore.set("auth_token", user.token);
    cookieStore.set("user", JSON.stringify(user));

    return user;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    throw new Error(error.message || "Failed to sign in");
  }
}

export async function getSession() {
  const cookieStore = cookies();
  const token = (await cookieStore).get("auth_token");

  if (!token) {
    return null;
  }

  const session = await fetch(`${API_URL}${authUrls.getUserToken}`, {
    headers: {
      Authorization: `Bearer ${token.value}`,
    },
  });

  if (!session.ok) {
    return null;
  }

  return session.json();
}

export async function logout() {
  const cookieStore = cookies();

  (await cookieStore).delete("auth_token");
  (await cookieStore).delete("user");

  redirect("/");
}
