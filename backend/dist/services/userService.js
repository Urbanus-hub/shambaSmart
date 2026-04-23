"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAgents = getAgents;
const pool_1 = __importDefault(require("../db/pool"));
async function getAgents() {
    const result = await pool_1.default.query("SELECT id, name, email, role, employee_id, created_at FROM users WHERE role = 'AGENT' ORDER BY name ASC");
    return result.rows;
}
