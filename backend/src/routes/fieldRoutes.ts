import { Router } from "express";
import { create, detail, list, update } from "../controllers/fieldController";
import { authMiddleware } from "../middleware/authMiddleware";
import { roleMiddleware } from "../middleware/roleMiddleware";

const router = Router();

router.post("/", authMiddleware, roleMiddleware("ADMIN"), create);
router.get("/", authMiddleware, list);
router.get("/:id", authMiddleware, detail);
router.put("/:id", authMiddleware, roleMiddleware("ADMIN"), update);

export default router;
