import express from "express";
import {
  createCourse,
  getAllCourses,
  getSingleCourse,
  deleteCourse,
} from "../controllers/courseController.js";
import { isAuth } from "../middleware/authMiddleware.js";
import { isInstructorOrAdmin } from "../middleware/roleMiddleware.js";



const router = express.Router();

// create course (protected)
router.post("/create", isAuth, isInstructorOrAdmin, createCourse);

// get all courses
router.get("/", getAllCourses);

// get single course
router.get("/:id", getSingleCourse);

//delete course (protected)
router.delete("/:id", isAuth, isInstructorOrAdmin, deleteCourse);

export default router;