import jwt from "jsonwebtoken";
import type { UserRole } from "../types/models";

const jwtSecret = process.env.JWT_SECRET || "changeme";

export function signToken(userId: string, role: UserRole) {
  return jwt.sign({ sub: userId, role }, jwtSecret, { expiresIn: "7d" });
}

export function verifyToken(token: string) {
  return jwt.verify(token, jwtSecret) as { sub: string; role: UserRole };
}
