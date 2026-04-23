import api from "./api";
import type { Field, FieldUpdate, CreateFieldPayload } from "../types";

export async function fetchFields(): Promise<Field[]> {
  const response = await api.get<Field[]>("/fields");
  return response.data;
}

export async function fetchField(id: string): Promise<Field> {
  const response = await api.get<Field>(`/fields/${id}`);
  return response.data;
}

export async function createField(payload: CreateFieldPayload): Promise<Field> {
  const response = await api.post("/fields", payload);
  return response.data.data ?? response.data;
}

export async function updateField(
  id: string,
  payload: Partial<CreateFieldPayload>,
): Promise<Field> {
  const response = await api.patch<Field>(`/fields/${id}`, payload);
  return response.data;
}

export async function fetchUpdates(fieldId: string): Promise<FieldUpdate[]> {
  const response = await api.get<FieldUpdate[]>(`/fields/${fieldId}/updates`);
  return response.data;
}

export async function createUpdate(
  fieldId: string,
  note: string,
): Promise<FieldUpdate> {
  const response = await api.post<FieldUpdate>(`/fields/${fieldId}/update`, {
    note,
  });
  return response.data;
}
