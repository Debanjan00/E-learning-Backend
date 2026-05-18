import User from "../models/User.js";
import Order from "../models/Order.js";
import Course from "../models/Course.js";

// GET MY COURSES
export const getMyCourses = async (
  req,
  res
) => {
  try {

    // ADMIN → ALL COURSES
    if (
      req.user.role === "admin"
    ) {

      const courses =
        await Course.find()
          .populate(
            "instructor",
            "name"
          );

      return res.json({
        message:
          "All courses fetched",

        courses,
      });
    }

    // INSTRUCTOR → OWN COURSES
    if (
      req.user.role ===
      "instructor"
    ) {

      const courses =
        await Course.find({
          instructor:
            req.user._id,
        }).populate(
          "instructor",
          "name"
        );

      return res.json({
        message:
          "Instructor courses fetched",

        courses,
      });
    }

    // STUDENT → PURCHASED COURSES
    const userId =
      req.user._id;

    const orders =
      await Order.find({
        user: userId,
      }).populate("course");

    const courses =
      orders.map(
        (order) =>
          order.course
      );

    res.json({
      message:
        "My courses fetched",

      courses,
    });

  } catch (error) {

    res.status(500).json({
      message:
        error.message,
    });
  }
};

// UPDATE PROFILE
export const updateProfile = async (
  req,
  res
) => {
  try {

    const user =
      await User.findById(
        req.user._id
      );

    if (!user) {

      return res.status(404).json({
        message:
          "User not found",
      });
    }

    const {
      name,
      bio,
    } = req.body;

    // UPDATE NAME
    if (name) {
      user.name = name;
    }

    // UPDATE BIO
    if (bio) {
      user.bio = bio;
    }

    // UPDATE IMAGE
    if (req.file) {

      user.image =
        `${req.protocol}://${req.get(
          "host"
        )}/uploads/profile/${
          req.file.filename
        }`;
    }

    await user.save();

    res.json({
      message:
        "Profile updated successfully",

      user,
    });

  } catch (error) {

    res.status(500).json({
      message:
        error.message,
    });
  }
};