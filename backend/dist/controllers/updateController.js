"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createUpdate = createUpdate;
exports.listUpdates = listUpdates;
const updateService_1 = require("../services/updateService");
async function createUpdate(req, res) {
    try {
        const { note } = req.body;
        const user = req.user;
        if (!note) {
            return res.status(400).json({ message: "Note is required" });
        }
        if (!user) {
            return res.status(401).json({ message: "Unauthorized" });
        }
        const update = await (0, updateService_1.addFieldUpdate)(req.params.id, user.id, note);
        return res.status(201).json(update);
    }
    catch (error) {
        return res.status(500).json({ message: "Unable to create update" });
    }
}
async function listUpdates(req, res) {
    try {
        const updates = await (0, updateService_1.listFieldUpdates)(req.params.id);
        return res.json(updates);
    }
    catch (error) {
        return res.status(500).json({ message: "Unable to fetch updates" });
    }
}
