"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.listAgents = listAgents;
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
