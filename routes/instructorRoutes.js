import express from "express";
import { getInstructorStats } from "../controllers/instructorController.js";
import { isAuth } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/stats", isAuth, getInstructorStats);

export default router;