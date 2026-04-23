"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const fieldController_1 = require("../controllers/fieldController");
const authMiddleware_1 = require("../middleware/authMiddleware");
const roleMiddleware_1 = require("../middleware/roleMiddleware");
const router = (0, express_1.Router)();
//create field
router.post("/", authMiddleware_1.authMiddleware, (0, roleMiddleware_1.roleMiddleware)("ADMIN"), fieldController_1.create);
//get field
router.get("/", authMiddleware_1.authMiddleware, fieldController_1.list);
//get single field details
router.get("/:id", authMiddleware_1.authMiddleware, fieldController_1.detail);
//update a field
router.patch("/:id", authMiddleware_1.authMiddleware, (0, roleMiddleware_1.roleMiddleware)("ADMIN"), fieldController_1.update);
//delete a field
router.delete("/:id", authMiddleware_1.authMiddleware, (0, roleMiddleware_1.roleMiddleware)("ADMIN"), fieldController_1.remove);
exports.default = router;
