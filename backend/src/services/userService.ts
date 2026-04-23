import pool from "../db/pool";
import type { User } from "../types/models";

export async function getAgents(): Promise<User[]> {
  const result = await pool.query(
    "SELECT id, name, email, role, employee_id, created_at FROM users WHERE role = 'AGENT' ORDER BY name ASC",
  );
  return result.rows;
}
