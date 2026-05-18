import LiveClass from "../models/LiveClass.js";
import Order from "../models/Order.js";

// CREATE LIVE CLASS (Instructor/Admin)
export const createLiveClass = async (req, res) => {
  try {

    const {
      title,
      courseId,
      meetingLink,
      date,
    } = req.body;

    if (
      !title ||
      !courseId ||
      !meetingLink ||
      !date
    ) {

      return res.status(400).json({
        message:
          "All fields are required",
      });
    }

    const liveClass =
      await LiveClass.create({
        title,

        course:
          courseId,

        instructor:
          req.user._id,

        meetingLink,

        date,
      });

    res.status(201).json({
      message:
        "Live class created successfully",

      liveClass,
    });

  } catch (error) {

    res.status(500).json({
      message:
        error.message,
    });
  }
};

// GET ALL LIVE CLASSES
export const getLiveClasses =
  async (req, res) => {

    try {

      // ADMIN / INSTRUCTOR
      if (
        req.user.role ===
          "admin" ||

        req.user.role ===
          "instructor"
      ) {

        const classes =
          await LiveClass.find()
            .populate(
              "course",
              "title"
            )
            .populate(
              "instructor",
              "name"
            );

        return res.json(
          classes
        );
      }

      // STUDENT PURCHASED COURSES
      const orders =
        await Order.find({
          user:
            req.user._id,
        });

      const enrolledCourses =
        orders.map(
          (order) =>
            order.course
        );

      // ONLY SHOW ENROLLED COURSE LIVE CLASSES
      const classes =
        await LiveClass.find({
          course: {
            $in:
              enrolledCourses,
          },
        })
          .populate(
            "course",
            "title"
          )
          .populate(
            "instructor",
            "name"
          );

      res.json(classes);

    } catch (error) {

      res.status(500).json({
        message:
          error.message,
      });
    }
  };

// GET LIVE CLASSES BY COURSE
export const getCourseLiveClasses =
  async (req, res) => {

    try {

      const classes =
        await LiveClass.find({
          course:
            req.params.courseId,
        }).populate(
          "instructor",
          "name"
        );

      res.json(classes);

    } catch (error) {

      res.status(500).json({
        message:
          error.message,
      });
    }
  };

// DELETE LIVE CLASS (Instructor/Admin)
export const deleteLiveClass =
  async (req, res) => {

    try {

      const liveClass =
        await LiveClass.findById(
          req.params.id
        );

      if (!liveClass) {

        return res.status(404).json({
          message:
            "Class not found",
        });
      }

      await liveClass.deleteOne();

      res.json({
        message:
          "Live class deleted",
      });

    } catch (error) {

      res.status(500).json({
        message:
          error.message,
      });
    }
  };