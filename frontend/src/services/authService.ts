import api from "./api";
import type { User } from "../types";

export interface AuthResponse {
  user: User;
  token: string;
}

export async function login(email: string, password: string) {
  const response = await api.post<AuthResponse>("/auth/login", {
    email,
    password,
  });
  return response.data;
}

export async function register(
  name: string,
  email: string,
  password: string,
  role: "ADMIN" | "AGENT",
) {
  const response = await api.post<AuthResponse>("/auth/register", {
    name,
    email,
    password,
    role,
  });
  return response.data;
}
