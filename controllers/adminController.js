import User from "../models/User.js";
import Course from "../models/Course.js";
import Order from "../models/Order.js";
import Test from "../models/Test.js";
import LiveClass from "../models/LiveClass.js";
import TestResult from "../models/TestResult.js";

// GET ALL USERS
export const getAllUsers = async (req, res) => {
  try {

    const users =
      await User.find()
        .select("-password");

    res.json({
      message:
        "Users fetched",

      users,
    });

  } catch (error) {

    res.status(500).json({
      message:
        error.message,
    });
  }
};

// GET ALL COURSES
export const getAllCourses =
  async (req, res) => {

    try {

      const courses =
        await Course.find()
          .populate(
            "instructor",
            "name email"
          );

      res.json({
        message:
          "Courses fetched",

        courses,
      });

    } catch (error) {

      res.status(500).json({
        message:
          error.message,
      });
    }
  };

// GET ALL ORDERS
export const getAllOrders =
  async (req, res) => {

    try {

      const orders =
        await Order.find()
          .populate(
            "user",
            "name email"
          )
          .populate(
            "course",
            "title price"
          );

      res.json({
        message:
          "Orders fetched",

        orders,
      });

    } catch (error) {

      res.status(500).json({
        message:
          error.message,
      });
    }
  };

// GET ANALYTICS
export const getAnalytics =
  async (req, res) => {

    try {

      const totalUsers =
        await User.countDocuments();

      const totalCourses =
        await Course.countDocuments();

      const totalTests =
        await Test.countDocuments();

      const totalLiveClasses =
        await LiveClass.countDocuments();

      const totalResults =
        await TestResult.countDocuments();

      const revenueData =
        await Order.aggregate([
          {
            $group: {
              _id: null,

              totalRevenue: {
                $sum:
                  "$amount",
              },
            },
          },
        ]);

      const totalRevenue =
        revenueData[0]
          ?.totalRevenue || 0;

      res.json({

        totalUsers,

        totalCourses,

        totalTests,

        totalLiveClasses,

        totalResults,

        totalRevenue,
      });

    } catch (error) {

      console.log(error);

      res.status(500).json({
        message:
          "Analytics failed",
      });
    }
  };