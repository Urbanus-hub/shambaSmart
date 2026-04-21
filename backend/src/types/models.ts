export type UserRole = "ADMIN" | "AGENT";
export type FieldStage = "PLANTED" | "GROWING" | "READY" | "HARVESTED";

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
}

export interface Field {
  id: string;
  name: string;
  crop_type: string;
  planting_date: string;
  stage: FieldStage;
  assigned_agent_id: string | null;
}

export interface FieldUpdate {
  id: string;
  field_id: string;
  agent_id: string;
  note: string;
  created_at: string;
}
