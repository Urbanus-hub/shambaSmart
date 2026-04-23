import { v4 as uuid } from "uuid";
import pool from "../db/pool";
import type { Field, UserRole } from "../types/models";
import { getFieldStatus } from "./statusService";

type FieldRow = Field & {
  last_update_at: string | null;
  agent_name?: string;
  agent_employee_id?: string;
};

export async function createField(data: Omit<Field, "id">) {
  const id = uuid();
  const result = await pool.query(
    `INSERT INTO fields (id, name, crop_type, planting_date, growth_duration_days, stage, assigned_agent_id)
     VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *`,
    [
      id,
      data.name,
      data.crop_type,
      data.planting_date,
      data.growth_duration_days,
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
         growth_duration_days = COALESCE($4, growth_duration_days),
         stage = COALESCE($5, stage),
         assigned_agent_id = COALESCE($6, assigned_agent_id)
     WHERE id = $7
     RETURNING *`,
    [
      payload.name,
      payload.crop_type,
      payload.planting_date,
      payload.growth_duration_days,
      payload.stage,
      payload.assigned_agent_id,
      id,
    ],
  );
  return result.rows[0] || null;
}

function enrichRow(row: FieldRow) {
  return {
    ...row,
    status: getFieldStatus(
      row.stage,
      new Date(row.expected_harvest_date)
    ),
  };
}

export async function getFieldsForUser(userId: string, role: UserRole) {
  const baseQuery = `
    SELECT f.*,
           u.name AS agent_name,
           u.employee_id AS agent_employee_id,
           MAX(fu.created_at) AS last_update_at
    FROM fields f
    LEFT JOIN users u ON u.id = f.assigned_agent_id
    LEFT JOIN field_updates fu ON fu.field_id = f.id
  `;
  const groupBy = " GROUP BY f.id, u.name, u.employee_id";

  if (role === "ADMIN") {
    const result = await pool.query(baseQuery + groupBy);
    return result.rows.map(enrichRow);
  }

  const result = await pool.query(
    baseQuery + " WHERE f.assigned_agent_id = $1" + groupBy,
    [userId],
  );
  return result.rows.map(enrichRow);
}

export async function getFieldById(id: string) {
  const result = await pool.query(
    `SELECT f.*,
            u.name AS agent_name,
            u.employee_id AS agent_employee_id,
            MAX(fu.created_at) AS last_update_at
     FROM fields f
     LEFT JOIN users u ON u.id = f.assigned_agent_id
     LEFT JOIN field_updates fu ON fu.field_id = f.id
     WHERE f.id = $1
     GROUP BY f.id, u.name, u.employee_id`,
    [id],
  );

  if (!result.rows[0]) {
    return null;
  }

  return enrichRow(result.rows[0]);
}
