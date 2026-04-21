import type { Request, Response } from "express";
import { addFieldUpdate, listFieldUpdates } from "../services/updateService";

export async function createUpdate(req: Request, res: Response) {
  try {
    const { note } = req.body;
    const user = req.user;

    if (!note) {
      return res.status(400).json({ message: "Note is required" });
    }

    if (!user) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const update = await addFieldUpdate(req.params.id, user.id, note);
    return res.status(201).json(update);
  } catch (error) {
    return res.status(500).json({ message: "Unable to create update" });
  }
}

export async function listUpdates(req: Request, res: Response) {
  try {
    const updates = await listFieldUpdates(req.params.id);
    return res.json(updates);
  } catch (error) {
    return res.status(500).json({ message: "Unable to fetch updates" });
  }
}
