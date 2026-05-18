import express from "express";
import { generateCertificate } from "../controllers/certificateController.js";
import { isAuth } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/:courseId", isAuth, generateCertificate);

export default router;