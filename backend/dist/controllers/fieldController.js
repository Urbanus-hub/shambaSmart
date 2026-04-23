"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.create = create;
exports.list = list;
exports.detail = detail;
exports.update = update;
exports.remove = remove;
const fieldService_1 = require("../services/fieldService");
async function create(req, res) {
    try {
        const { name, crop_type, planting_date, growth_duration_days, stage, assigned_agent_id } = req.body;
        if (!name || !crop_type || !planting_date || !growth_duration_days || !stage) {
            return res.status(400).json({ message: "Missing required fields" });
        }
        const field = await (0, fieldService_1.createField)({
            name,
            crop_type,
            planting_date,
            growth_duration_days,
            stage,
            assigned_agent_id: assigned_agent_id || null,
        });
        return res.status(201).json({
            message: "Created successfully",
            data: field,
        });
    }
    catch (error) {
        console.log("error creating field", error);
        return res.status(500).json({ message: "Unable to create field" });
    }
}
async function list(req, res) {
    try {
        const user = req.user;
        if (!user) {
            return res.status(401).json({ message: "Unauthorized" });
        }
        const fields = await (0, fieldService_1.getFieldsForUser)(user.id, user.role);
        return res.json(fields);
    }
    catch (error) {
        return res.status(500).json({ message: "Unable to fetch fields" });
    }
}
async function detail(req, res) {
    try {
        const field = await (0, fieldService_1.getFieldById)(req.params.id);
        if (!field) {
            return res.status(404).json({ message: "Field not found" });
        }
        return res.json(field);
    }
    catch (error) {
        return res.status(500).json({ message: "Unable to fetch field" });
    }
}
async function update(req, res) {
    try {
        const field = await (0, fieldService_1.updateField)(req.params.id, req.body);
        if (!field) {
            return res.status(404).json({ message: "Field not found" });
        }
        return res.json(field);
    }
    catch (error) {
        return res.status(500).json({ message: "Unable to update field" });
    }
}
async function remove(req, res) {
    try {
        await (0, fieldService_1.deleteField)(req.params.id);
        return res.json({ message: "Field deleted successfully" });
    }
    catch (error) {
        return res.status(500).json({ message: "Unable to delete field" });
    }
}
