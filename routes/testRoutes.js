import express from "express";

import {
  createAITest,
  getTests,
  getSingleTest,
  deleteTest,
} from "../controllers/testController.js";

import {
  saveResult,
  getAllResults,
  getAnalytics,
} from "../controllers/testResultController.js";

import {
  isAuth,
} from "../middleware/authMiddleware.js";

const router =
  express.Router();

// ✅ CREATE AI TEST
router.post(
  "/create",
  isAuth,
  createAITest
);

// ✅ SAVE RESULT
router.post(
  "/save-result",
  isAuth,
  saveResult
);

// ✅ GET ALL RESULTS
router.get(
  "/results/all",
  isAuth,
  getAllResults
);

// ✅ GET ANALYTICS
router.get(
  "/analytics",
  isAuth,
  getAnalytics
);

// ✅ GET ALL TESTS
router.get(
  "/",
  getTests
);

// ✅ DELETE TEST
router.delete(
  "/:id",
  isAuth,
  deleteTest
);

// ✅ GET SINGLE TEST
router.get(
  "/:id",
  getSingleTest
);

export default router;