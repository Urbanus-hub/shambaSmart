import { Router } from "express";
import { listAgents, update, remove } from "../controllers/userController";
import { authMiddleware } from "../middleware/authMiddleware";
import { roleMiddleware } from "../middleware/roleMiddleware";

const router = Router();

router.get("/agents", authMiddleware, listAgents);
router.patch("/:id", authMiddleware, roleMiddleware("ADMIN"), update);
router.delete("/:id", authMiddleware, roleMiddleware("ADMIN"), remove);

export default router;
