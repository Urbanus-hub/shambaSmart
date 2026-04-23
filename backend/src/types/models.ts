
export type UserRole = "ADMIN" | "AGENT";
export type FieldStage = "PLANTED" | "GROWING" | "READY" | "HARVESTED";

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  employee_id?: string;
  created_at?: string;
  password?: string;
}

export interface Field {
  id: string;
  name: string;
  crop_type: string;
  planting_date: string;
  growth_duration_days: number;
  expected_harvest_date: string;
  stage: FieldStage;
  assigned_agent_id: string | null;
  created_at?: string;
}

export interface FieldUpdate {
  id: string;
  field_id: string;
  agent_id: string;
  note: string;
  created_at: string;
}
