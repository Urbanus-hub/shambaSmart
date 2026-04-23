"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAgents = getAgents;
exports.updateUser = updateUser;
exports.deleteUser = deleteUser;
const pool_1 = __importDefault(require("../db/pool"));
async function getAgents() {
    const result = await pool_1.default.query("SELECT id, name, email, role, employee_id, created_at FROM users WHERE role = 'AGENT' ORDER BY name ASC");
    return result.rows;
}
async function updateUser(id, data) {
    const result = await pool_1.default.query(`UPDATE users 
     SET name = COALESCE($1, name),
         email = COALESCE($2, email)
     WHERE id = $3 RETURNING id, name, email, role, employee_id`, [data.name, data.email, id]);
    return result.rows[0];
}
async function deleteUser(id) {
    await pool_1.default.query("DELETE FROM users WHERE id = $1", [id]);
}
