import express from "express";

import {
  register,
  login,
  verifyOTP,
  forgotPassword,
  resetPassword,
} from "../controllers/authController.js";

const router =
  express.Router();

// REGISTER
router.post(
  "/register",
  register
);

// LOGIN
router.post(
  "/login",
  login
);

// VERIFY OTP
router.post(
  "/verify",
  verifyOTP
);

// FORGOT PASSWORD
router.post(
  "/forgot-password",
  forgotPassword
);

// RESET PASSWORD
router.post(
  "/reset-password",
  resetPassword
);

export default router;