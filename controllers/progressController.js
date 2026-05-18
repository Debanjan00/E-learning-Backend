import User from "../models/User.js";

// MARK LECTURE COMPLETE
export const markLectureComplete =
  async (req, res) => {

    try {

      const {
        courseId,
        lectureId,
      } = req.body;

      const user =
        await User.findById(
          req.user._id
        );

      let progress =
        user.progress.find(
          (p) =>
            p.course.toString() ===
            courseId
        );

      // CREATE COURSE PROGRESS
      if (!progress) {

        user.progress.push({
          course:
            courseId,

          completedLectures:
            [lectureId],
        });

      } else {

        // AVOID DUPLICATE
        const alreadyCompleted =
          progress.completedLectures.includes(
            lectureId
          );

        if (
          !alreadyCompleted
        ) {

          progress.completedLectures.push(
            lectureId
          );
        }
      }

      await user.save();

      res.json({
        message:
          "Lecture completed ✅",
      });

    } catch (error) {

      res.status(500).json({
        message:
          error.message,
      });
    }
  };

// GET COURSE PROGRESS
export const getCourseProgress =
  async (req, res) => {

    try {

      const {
        courseId,
      } = req.params;

      const user =
        await User.findById(
          req.user._id
        );

      const progress =
        user.progress.find(
          (p) =>
            p.course.toString() ===
            courseId
        );

      if (!progress) {

        return res.json({
          completedLectures:
            [],
        });
      }

      res.json(progress);

    } catch (error) {

      res.status(500).json({
        message:
          error.message,
      });
    }
  };