import api from "./api";
import type { User } from "../types";

export async function fetchAgents(): Promise<User[]> {
  const response = await api.get<User[]>("/users/agents");
  return response.data;
}

export async function updateAgent(id: string, data: Partial<User>): Promise<User> {
  const response = await api.patch<User>(`/users/${id}`, data);
  return response.data;
}

export async function deleteAgent(id: string): Promise<void> {
  await api.delete(`/users/${id}`);
}
