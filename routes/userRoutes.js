import express from "express";

import { isAuth }
from "../middleware/authMiddleware.js";

import {
  getMyCourses,
  updateProfile,
} from "../controllers/userController.js";
import upload from "../middleware/uploadMiddleware.js";

const router =
  express.Router();

// GET USER PROFILE
router.get(
  "/me",
  isAuth,
  (req, res) => {

    res.json({
      message:
        "User profile fetched",

      user: req.user,
    });
  }
);

// GET MY COURSES
router.get(
  "/my-courses",
  isAuth,
  getMyCourses
);

// UPDATE PROFILE
router.put(
  "/update-profile",
  isAuth,
  upload.single("image"),
  updateProfile
);

export default router;