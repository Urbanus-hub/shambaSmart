import { v4 as uuid } from "uuid";
import pool from "../db/pool";

export async function addFieldUpdate(
  fieldId: string,
  agentId: string,
  note: string,
) {
  const id = uuid();
  const result = await pool.query(
    "INSERT INTO field_updates (id, field_id, agent_id, note) VALUES ($1, $2, $3, $4) RETURNING *",
    [id, fieldId, agentId, note],
  );
  return result.rows[0];
}

export async function listFieldUpdates(fieldId: string) {
  const result = await pool.query(
    "SELECT id, field_id, agent_id, note, created_at FROM field_updates WHERE field_id = $1 ORDER BY created_at DESC",
    [fieldId],
  );
  return result.rows;
}
