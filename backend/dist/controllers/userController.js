"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.listAgents = listAgents;
exports.update = update;
exports.remove = remove;
const userService_1 = require("../services/userService");
async function listAgents(_req, res) {
    try {
        const agents = await (0, userService_1.getAgents)();
        return res.json(agents);
    }
    catch (error) {
        console.error("Error fetching agents:", error);
        return res.status(500).json({ message: "Unable to fetch agents" });
    }
}
async function update(req, res) {
    try {
        const user = await (0, userService_1.updateUser)(req.params.id, req.body);
        if (!user)
            return res.status(404).json({ message: "User not found" });
        return res.json(user);
    }
    catch (error) {
        return res.status(500).json({ message: "Unable to update agent" });
    }
}
async function remove(req, res) {
    try {
        await (0, userService_1.deleteUser)(req.params.id);
        return res.json({ message: "Agent deleted successfully" });
    }
    catch (error) {
        console.error("Delete agent error:", error);
        return res.status(500).json({ message: "Unable to delete agent" });
    }
}
