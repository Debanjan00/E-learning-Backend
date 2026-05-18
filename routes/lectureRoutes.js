import express from "express";

import {
  createLecture,
  getCourseLectures,
  deleteLecture,
} from "../controllers/lectureController.js";

import { isAuth } from "../middleware/authMiddleware.js";
import { isInstructorOrAdmin } from "../middleware/roleMiddleware.js";

// ✅ IMPORT UPLOAD MIDDLEWARE
import upload from "../middleware/uploadMiddleware.js";

const router = express.Router();

// ✅ CREATE LECTURE WITH VIDEO UPLOAD
router.post(
  "/create/:courseId",
  isAuth,
  isInstructorOrAdmin,
  upload.single("video"),
  createLecture
);

// GET COURSE LECTURES
router.get(
  "/:courseId",
  getCourseLectures
);

// DELETE LECTURE
router.delete(
  "/:lectureId",
  isAuth,
  isInstructorOrAdmin,
  deleteLecture
);

export default router;