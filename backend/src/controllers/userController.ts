import type { Request, Response } from "express";
import { getAgents } from "../services/userService";

export async function listAgents(_req: Request, res: Response) {
  try {
    const agents = await getAgents();
    return res.json(agents);
  } catch (error) {
    console.error("Error fetching agents:", error);
    return res.status(500).json({ message: "Unable to fetch agents" });
  }
}
