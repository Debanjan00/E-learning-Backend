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

    console.log(error);

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

    // FIND USER
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

      console.log(
        "Uploaded File:",
        req.file
      );

      // CLOUDINARY IMAGE URL
      user.image =
        req.file.path;
    }

    // SAVE USER
    await user.save();

    // GET UPDATED USER
    const updatedUser =
      await User.findById(
        req.user._id
      );

    res.status(200).json({

      message:
        "Profile updated successfully",

      user:
        updatedUser,
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message:
        error.message,
    });
  }
};