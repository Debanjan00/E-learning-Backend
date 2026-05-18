import express from "express";
import {
  createLiveClass,
  getLiveClasses,
  getCourseLiveClasses,
  deleteLiveClass,
} from "../controllers/liveClassController.js";

import { isAuth } from "../middleware/authMiddleware.js";
import { isInstructorOrAdmin } from "../middleware/roleMiddleware.js";

const router = express.Router();

// create live class
router.post("/create", isAuth, isInstructorOrAdmin, createLiveClass);

// get all classes
router.get("/",isAuth, getLiveClasses);

// get classes by course
router.get("/course/:courseId", getCourseLiveClasses);

// delete class
router.delete("/:id", isAuth, isInstructorOrAdmin, deleteLiveClass);

export default router;