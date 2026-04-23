export type UserRole = "ADMIN" | "AGENT";

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  employee_id?: string;
  created_at?: string;
}

export type FieldStage = "PLANTED" | "GROWING" | "READY" | "HARVESTED";
export type FieldStatus = "Completed" | "At Risk" | "Active";

export interface Field {
  id: string;
  name: string;
  crop_type: string;
  planting_date: string;
  growth_duration_days: number;
  expected_harvest_date: string;
  stage: FieldStage;
  assigned_agent_id: string | null;
  agent_name?: string;
  agent_employee_id?: string;
  status?: FieldStatus;
  created_at?: string;
}

export interface CreateFieldPayload {
  name: string;
  crop_type: string;
  planting_date: string;
  growth_duration_days: number;
  stage: FieldStage;
  assigned_agent_id: string | null;
}

export interface FieldUpdate {
  id: string;
  field_id: string;
  agent_id: string;
  agent_name?: string;
  note: string;
  created_at: string;
}
