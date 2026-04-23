import api from "./api";
import type { User } from "../types";

export async function fetchAgents(): Promise<User[]> {
  const response = await api.get<User[]>("/users/agents");
  return response.data;
}
