import Order from "../models/Order.js";
import Course from "../models/Course.js";
import razorpay from "../config/razorpay.js";
import crypto from "crypto";

export const createOrder = async (req, res) => {
  try {
    const userId = req.user._id;
    const { courseId } = req.body;

    const course = await Course.findById(courseId);

    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }

    const alreadyBought = await Order.findOne({
      user: userId,
      course: courseId,
    });

    if (alreadyBought) {
      return res.status(400).json({
        message: "Course already purchased",
      });
    }

    const options = {
      amount: course.price * 100,
      currency: "INR",
      receipt: `receipt_${courseId}`,
    };

    const order = await razorpay.orders.create(options);

    res.json({
      order,
      courseId,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const verifyPayment = async (req, res) => {
  try {
    const userId = req.user._id;

    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      courseId,
    } = req.body;

    const body = razorpay_order_id + "|" + razorpay_payment_id;

    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(body.toString())
      .digest("hex");

    if (expectedSignature !== razorpay_signature) {
      return res.status(400).json({ message: "Payment verification failed" });
    }

    const course = await Course.findById(courseId);

    const order = await Order.create({
      user: userId,
      course: courseId,
      amount: course.price,
      status: "completed",
    });

    res.json({
      message: "Payment successful & course purchased",
      order,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};