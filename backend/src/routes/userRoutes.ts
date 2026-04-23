import { Router } from "express";
import { listAgents } from "../controllers/userController";
import { authMiddleware } from "../middleware/authMiddleware";

const router = Router();

router.get("/agents", authMiddleware, listAgents);

export default router;
