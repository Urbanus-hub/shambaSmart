"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.register = register;
exports.login = login;
const authService_1 = require("../services/authService");
async function register(req, res) {
    try {
        const { name, email, password, role } = req.body;
        if (!name || !email || !password || !role) {
            return res.status(400).json({ message: "Missing required fields" });
        }
        const result = await (0, authService_1.registerUser)(name, email, password, role);
        if (!result) {
            return res.status(409).json({ message: "Email already registered" });
        }
        return res.status(201).json(result);
    }
    catch (error) {
        return res.status(500).json({ message: "Unable to register" });
    }
}
async function login(req, res) {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ message: "Missing email or password" });
        }
        const result = await (0, authService_1.loginUser)(email, password);
        if (!result) {
            return res.status(401).json({ message: "Invalid credentials" });
        }
        return res.json(result);
    }
    catch (error) {
        return res.status(500).json({ message: "Unable to login" });
    }
}
