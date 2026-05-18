import express
from "express";

import {
  isAuth,
} from "../middleware/authMiddleware.js";

import {
  isAdmin,
} from "../middleware/roleMiddleware.js";

import {
  getAllUsers,
  getAllCourses,
  getAllOrders,
  getAnalytics,
} from "../controllers/adminController.js";

const router =
  express.Router();

// ADMIN AUTH
router.use(
  isAuth,
  isAdmin
);

// USERS
router.get(
  "/users",
  getAllUsers
);

// COURSES
router.get(
  "/courses",
  getAllCourses
);

// ORDERS
router.get(
  "/orders",
  getAllOrders
);

// ANALYTICS
router.get(
  "/analytics",
  getAnalytics
);

export default router;