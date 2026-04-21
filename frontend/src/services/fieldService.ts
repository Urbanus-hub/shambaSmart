import api from "./api";
import type { Field, FieldUpdate } from "../types";

export async function fetchFields() {
  const response = await api.get<Field[]>("/fields");
  return response.data;
}

export async function fetchField(id: string) {
  const response = await api.get<Field>(`/fields/${id}`);
  return response.data;
}

export async function createField(payload: Omit<Field, "id">) {
  const response = await api.post<Field>("/fields", payload);
  return response.data;
}

export async function updateField(id: string, payload: Partial<Field>) {
  const response = await api.put<Field>(`/fields/${id}`, payload);
  return response.data;
}

export async function fetchUpdates(fieldId: string) {
  const response = await api.get<FieldUpdate[]>(`/fields/${fieldId}/updates`);
  return response.data;
}

export async function createUpdate(fieldId: string, note: string) {
  const response = await api.post<FieldUpdate>(`/fields/${fieldId}/update`, {
    note,
  });
  return response.data;
}
