"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerUser = registerUser;
exports.loginUser = loginUser;
const crypto_1 = __importDefault(require("crypto"));
const pool_1 = __importDefault(require("../db/pool"));
const password_1 = require("../utils/password");
const jwt_1 = require("../utils/jwt");
async function registerUser(name, email, password, role) {
    const existing = await pool_1.default.query("SELECT id FROM users WHERE email = $1", [
        email,
    ]);
    if (existing.rowCount && existing.rowCount > 0) {
        return null;
    }
    const passwordHash = await (0, password_1.hashPassword)(password);
    const id = crypto_1.default.randomUUID();
    // Generate a simple employee ID for agents
    const employee_id = role === "AGENT" ? `SS-${Math.floor(1000 + Math.random() * 9000)}` : null;
    await pool_1.default.query("INSERT INTO users (id, name, email, password, role, employee_id) VALUES ($1, $2, $3, $4, $5, $6)", [id, name, email, passwordHash, role, employee_id]);
    const token = (0, jwt_1.signToken)(id, role);
    const user = {
        id,
        name,
        email,
        role,
        employee_id: employee_id || undefined,
    };
    return { user, token };
}
async function loginUser(email, password) {
    const result = await pool_1.default.query("SELECT id, name, email, password, role, employee_id FROM users WHERE email = $1", [email]);
    if (!result.rowCount || result.rowCount === 0) {
        return null;
    }
    const row = result.rows[0];
    const valid = await (0, password_1.comparePassword)(password, row.password);
    if (!valid) {
        return null;
    }
    const token = (0, jwt_1.signToken)(row.id, row.role);
    const user = {
        id: row.id,
        name: row.name,
        email: row.email,
        role: row.role,
        employee_id: row.employee_id,
    };
    return { user, token };
}
