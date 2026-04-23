import type { Request, Response } from "express";
import { getAgents, updateUser, deleteUser } from "../services/userService";

export async function listAgents(_req: Request, res: Response) {
  try {
    const agents = await getAgents();
    return res.json(agents);
  } catch (error) {
    console.error("Error fetching agents:", error);
    return res.status(500).json({ message: "Unable to fetch agents" });
  }
}

export async function update(req: Request, res: Response) {
  try {
    const user = await updateUser(req.params.id, req.body);
    if (!user) return res.status(404).json({ message: "User not found" });
    return res.json(user);
  } catch (error) {
    return res.status(500).json({ message: "Unable to update agent" });
  }
}

export async function remove(req: Request, res: Response) {
  try {
    await deleteUser(req.params.id);
    return res.json({ message: "Agent deleted successfully" });
  } catch (error) {
    console.error("Delete agent error:", error);
    return res.status(500).json({ message: "Unable to delete agent" });
  }
}
