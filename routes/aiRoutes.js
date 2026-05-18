import express from "express";
import { askAI } from "../controllers/aiController.js";
import { isAuth } from "../middleware/authMiddleware.js";

const router = express.Router();

// ask AI (protected)
router.post("/ask", isAuth, askAI);

export default router;