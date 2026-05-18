import express from "express";

import {
  createAITest,
  getTests,
  getSingleTest,
} from "../controllers/testController.js";

import {
  saveResult,
  getAllResults,
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

// ✅ GET ALL TESTS
router.get(
  "/",
  getTests
);

// ✅ GET SINGLE TEST
router.get(
  "/:id",
  getSingleTest
);

// ✅ SAVE STUDENT RESULT
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

export default router;