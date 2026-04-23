import { v4 as uuid } from "uuid";
import pool from "../db/pool";
import type { User } from "../types/models";
import { hashPassword, comparePassword } from "../utils/password";
import { signToken } from "../utils/jwt";

export async function registerUser(
  name: string,
  email: string,
  password: string,
  role: "ADMIN" | "AGENT",
) {
  const existing = await pool.query("SELECT id FROM users WHERE email = $1", [
    email,
  ]);
  if (existing.rowCount && existing.rowCount > 0) {
    return null;
  }

  const passwordHash = await hashPassword(password);
  const id = uuid();
  
  // Generate a simple employee ID for agents
  const employee_id = role === "AGENT" ? `SS-${Math.floor(1000 + Math.random() * 9000)}` : null;

  await pool.query(
    "INSERT INTO users (id, name, email, password, role, employee_id) VALUES ($1, $2, $3, $4, $5, $6)",
    [id, name, email, passwordHash, role, employee_id],
  );

  const token = signToken(id, role);

  const user: User = { id, name, email, role, employee_id: employee_id || undefined };
  return { user, token };
}

export async function loginUser(email: string, password: string) {
  const result = await pool.query(
    "SELECT id, name, email, password, role, employee_id FROM users WHERE email = $1",
    [email],
  );
  if (!result.rowCount || result.rowCount === 0) {
    return null;
  }

  const row = result.rows[0];
  const valid = await comparePassword(password, row.password);
  if (!valid) {
    return null;
  }

  const token = signToken(row.id, row.role);

  const user: User = {
    id: row.id,
    name: row.name,
    email: row.email,
    role: row.role,
    employee_id: row.employee_id,
  };
  return { user, token };
}
