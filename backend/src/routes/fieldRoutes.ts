import { Router } from "express";
import { create, detail, list, update } from "../controllers/fieldController";
import { authMiddleware } from "../middleware/authMiddleware";
import { roleMiddleware } from "../middleware/roleMiddleware";

const router = Router();
//create field
router.post("/", authMiddleware, roleMiddleware("ADMIN"), create);
//get field
router.get("/", authMiddleware, list);
//get single field details
router.get("/:id", authMiddleware, detail);
//update a field
router.patch("/:id", authMiddleware, roleMiddleware("ADMIN"), update);

export default router;
