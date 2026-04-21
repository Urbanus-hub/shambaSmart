import type { Request, Response } from "express";
import {
  createField,
  getFieldById,
  getFieldsForUser,
  updateField,
} from "../services/fieldService";

export async function create(req: Request, res: Response) {
  try {
    const { name, crop_type, planting_date, stage, assigned_agent_id } =
      req.body;

    if (!name || !crop_type || !planting_date || !stage) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const field = await createField({
      name,
      crop_type,
      planting_date,
      stage,
      assigned_agent_id: assigned_agent_id || null,
    });

    return res.status(201).json(field);
  } catch (error) {
    return res.status(500).json({ message: "Unable to create field" });
  }
}

export async function list(req: Request, res: Response) {
  try {
    const user = req.user;
    if (!user) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const fields = await getFieldsForUser(user.id, user.role);
    return res.json(fields);
  } catch (error) {
    return res.status(500).json({ message: "Unable to fetch fields" });
  }
}

export async function detail(req: Request, res: Response) {
  try {
    const field = await getFieldById(req.params.id);
    if (!field) {
      return res.status(404).json({ message: "Field not found" });
    }

    return res.json(field);
  } catch (error) {
    return res.status(500).json({ message: "Unable to fetch field" });
  }
}

export async function update(req: Request, res: Response) {
  try {
    const field = await updateField(req.params.id, req.body);
    if (!field) {
      return res.status(404).json({ message: "Field not found" });
    }

    return res.json(field);
  } catch (error) {
    return res.status(500).json({ message: "Unable to update field" });
  }
}
