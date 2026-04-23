"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.addFieldUpdate = addFieldUpdate;
exports.listFieldUpdates = listFieldUpdates;
const crypto_1 = __importDefault(require("crypto"));
const pool_1 = __importDefault(require("../db/pool"));
async function addFieldUpdate(fieldId, agentId, note) {
    const id = crypto_1.default.randomUUID();
    const result = await pool_1.default.query("INSERT INTO field_updates (id, field_id, agent_id, note) VALUES ($1, $2, $3, $4) RETURNING *", [id, fieldId, agentId, note]);
    return result.rows[0];
}
async function listFieldUpdates(fieldId) {
    const result = await pool_1.default.query("SELECT id, field_id, agent_id, note, created_at FROM field_updates WHERE field_id = $1 ORDER BY created_at DESC", [fieldId]);
    return result.rows;
}
