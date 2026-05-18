import express from "express";
import { isAuth } from "../middleware/authMiddleware.js";
import {
  createOrder,
  verifyPayment,
} from "../controllers/paymentController.js";

const router = express.Router();

// create Razorpay order
router.post("/create-order", isAuth, createOrder);

// verify payment
router.post("/verify", isAuth, verifyPayment);

export default router;