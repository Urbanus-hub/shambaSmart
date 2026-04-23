import pool from "../db/pool";
import type { User } from "../types/models";

export async function getAgents(): Promise<User[]> {
  const result = await pool.query(
    "SELECT id, name, email, role, employee_id, created_at FROM users WHERE role = 'AGENT' ORDER BY name ASC",
  );
  return result.rows;
}

export async function updateUser(id: string, data: Partial<User>) {
  const result = await pool.query(
    `UPDATE users 
     SET name = COALESCE($1, name),
         email = COALESCE($2, email)
     WHERE id = $3 RETURNING id, name, email, role, employee_id`,
    [data.name, data.email, id],
  );
  return result.rows[0];
}

export async function deleteUser(id: string) {
  await pool.query("DELETE FROM users WHERE id = $1", [id]);
}
