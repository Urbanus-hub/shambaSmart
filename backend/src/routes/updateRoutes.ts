import { Router } from "express";
import { createUpdate, listUpdates } from "../controllers/updateController";
import { authMiddleware } from "../middleware/authMiddleware";
import { roleMiddleware } from "../middleware/roleMiddleware";

const router = Router();

router.post(
  "/:id/update",
  authMiddleware,
  roleMiddleware("ADMIN", "AGENT"),
  createUpdate,
);
router.get("/:id/updates", authMiddleware, listUpdates);

export default router;
