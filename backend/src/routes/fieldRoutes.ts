import { Router } from "express";
import { create, detail, list, update, remove } from "../controllers/fieldController";
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
router.patch("/:id", authMiddleware, roleMiddleware("ADMIN", "AGENT"), update);
//delete a field
router.delete("/:id", authMiddleware, roleMiddleware("ADMIN"), remove);

export default router;
