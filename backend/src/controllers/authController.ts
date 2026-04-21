import type { Request, Response } from "express";
import { loginUser, registerUser } from "../services/authService";

export async function register(req: Request, res: Response) {
  try {
    const { name, email, password, role } = req.body;

    if (!name || !email || !password || !role) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const result = await registerUser(name, email, password, role);
    if (!result) {
      return res.status(409).json({ message: "Email already registered" });
    }

    return res.status(201).json(result);
  } catch (error) {
    return res.status(500).json({ message: "Unable to register" });
  }
}

export async function login(req: Request, res: Response) {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Missing email or password" });
    }

    const result = await loginUser(email, password);
    if (!result) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    return res.json(result);
  } catch (error) {
    return res.status(500).json({ message: "Unable to login" });
  }
}
