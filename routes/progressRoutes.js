import express from "express";

import {
  markLectureComplete,
  getCourseProgress,
} from "../controllers/progressController.js";

import {
  isAuth,
} from "../middleware/authMiddleware.js";

const router =
  express.Router();

// MARK COMPLETE
router.post(
  "/complete",
  isAuth,
  markLectureComplete
);

// GET PROGRESS
router.get(
  "/:courseId",
  isAuth,
  getCourseProgress
);

export default router;