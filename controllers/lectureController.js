import Lecture from "../models/Lecture.js";

// CREATE LECTURE
export const createLecture = async (
  req,
  res
) => {
  try {

    const { title } =
      req.body;

    const courseId =
      req.params.courseId;

    // CHECK VIDEO FILE
    if (!req.file) {

      return res.status(400).json({
        message:
          "Video file is required",
      });
    }

    // VIDEO URL
    const videoUrl =
      `${req.protocol}://${req.get(
        "host"
      )}/uploads/videos/${
        req.file.filename
      }`;

    // CREATE LECTURE
    const lecture =
      await Lecture.create({

        title,

        videoUrl,

        course: courseId,
      });

    res.status(201).json({
      message:
        "Lecture added successfully",

      lecture,
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message:
        error.message,
    });
  }
};

// GET COURSE LECTURES
export const getCourseLectures = async (
  req,
  res
) => {
  try {

    const lectures =
      await Lecture.find({
        course:
          req.params.courseId,
      });

    res.json({
      lectures,
    });

  } catch (error) {

    res.status(500).json({
      message:
        error.message,
    });
  }
};

// DELETE LECTURE
export const deleteLecture = async (
  req,
  res
) => {
  try {

    const lecture =
      await Lecture.findById(
        req.params.lectureId
      );

    if (!lecture) {

      return res.status(404).json({
        message:
          "Lecture not found",
      });
    }

    await lecture.deleteOne();

    res.json({
      message:
        "Lecture deleted successfully",
    });

  } catch (error) {

    res.status(500).json({
      message:
        error.message,
    });
  }
};