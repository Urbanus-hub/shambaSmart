import { v4 as uuid } from "uuid";
import pool from "../db/pool";
import type { Field, UserRole } from "../types/models";
import { getFieldStatus } from "./statusService";

type FieldRow = Field & { last_update_at: string | null };

export async function createField(data: Omit<Field, "id">) {
  const id = uuid();
  const result = await pool.query(
    "INSERT INTO fields (id, name, crop_type, planting_date, stage, assigned_agent_id) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *",
    [
      id,
      data.name,
      data.crop_type,
      data.planting_date,
      data.stage,
      data.assigned_agent_id,
    ],
  );
  return result.rows[0];
}

export async function updateField(id: string, payload: Partial<Field>) {
  const result = await pool.query(
    `UPDATE fields
     SET name = COALESCE($1, name),
         crop_type = COALESCE($2, crop_type),
         planting_date = COALESCE($3, planting_date),
         stage = COALESCE($4, stage),
         assigned_agent_id = COALESCE($5, assigned_agent_id)
     WHERE id = $6
     RETURNING *`,
    [
      payload.name,
      payload.crop_type,
      payload.planting_date,
      payload.stage,
      payload.assigned_agent_id,
      id,
    ],
  );
  return result.rows[0] || null;
}

export async function getFieldsForUser(userId: string, role: UserRole) {
  const baseQuery = `
    SELECT f.*, MAX(u.created_at) AS last_update_at
    FROM fields f
    LEFT JOIN field_updates u ON u.field_id = f.id
  `;

  const groupBy = " GROUP BY f.id";

  if (role === "ADMIN") {
    const result = await pool.query(baseQuery + groupBy);
    return result.rows.map((row: FieldRow) => ({
      ...row,
      status: getFieldStatus(
        row.stage,
        row.last_update_at ? new Date(row.last_update_at) : null,
      ),
    }));
  }

  const result = await pool.query(
    baseQuery + " WHERE f.assigned_agent_id = $1" + groupBy,
    [userId],
  );
  return result.rows.map((row: FieldRow) => ({
    ...row,
    status: getFieldStatus(
      row.stage,
      row.last_update_at ? new Date(row.last_update_at) : null,
    ),
  }));
}

export async function getFieldById(id: string) {
  const result = await pool.query(
    `SELECT f.*, MAX(u.created_at) AS last_update_at
     FROM fields f
     LEFT JOIN field_updates u ON u.field_id = f.id
     WHERE f.id = $1
     GROUP BY f.id`,
    [id],
  );

  if (!result.rows[0]) {
    return null;
  }

  const row = result.rows[0];
  return {
    ...row,
    status: getFieldStatus(
      row.stage,
      row.last_update_at ? new Date(row.last_update_at) : null,
    ),
  };
}
