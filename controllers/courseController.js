import Course from "../models/Course.js";
import Lecture from "../models/Lecture.js";

// CREATE COURSE
export const createCourse = async (req, res) => {
  try {
    const {
      title,
      description,
      price,
      image,
    } = req.body;

    const course = await Course.create({
      title,
      description,
      price,
      image,
      instructor: req.user._id,
    });

    res.status(201).json({
      message: "Course created successfully",
      course,
    });

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// GET ALL COURSES
export const getAllCourses = async (req, res) => {
  try {
    const courses = await Course.find()
      .populate("instructor", "name");

    res.json(courses);

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// GET SINGLE COURSE + LECTURES
export const getSingleCourse = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id)
      .populate("instructor", "name email");

    if (!course) {
      return res.status(404).json({
        message: "Course not found",
      });
    }

    // GET LECTURES OF COURSE
    const lectures = await Lecture.find({
      course: req.params.id,
    });

    res.json({
      ...course._doc,
      lectures,
    });

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// DELETE COURSE
export const deleteCourse = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);

    if (!course) {
      return res.status(404).json({
        message: "Course not found",
      });
    }

    // DELETE ALL LECTURES
    await Lecture.deleteMany({
      course: req.params.id,
    });

    // DELETE COURSE
    await course.deleteOne();

    res.json({
      message: "Course deleted successfully",
    });

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};