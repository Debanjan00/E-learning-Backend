import TestResult
from "../models/TestResult.js";

// ✅ SAVE RESULT
export const saveResult =
  async (req, res) => {

    try {

      console.log(
        "REQ BODY:",
        req.body
      );

      console.log(
        "REQ USER:",
        req.user
      );

      const {
        testId,
        score,
        totalQuestions,
        percentage,
      } = req.body;

      if (
        !testId ||
        score === undefined
      ) {

        return res
          .status(400)
          .json({
            success: false,

            message:
              "Missing fields",
          });
      }

      const result =
        await TestResult.create({
          student:
            req.user._id,

          test:
            testId,

          score,

          totalQuestions,

          percentage,
        });

      console.log(
        "RESULT SAVED:",
        result
      );

      res.status(201).json({
        success: true,

        message:
          "Result saved ✅",

        result,
      });

    } catch (error) {

      console.log(
        "SAVE ERROR:",
        error
      );

      res.status(500).json({
        success: false,

        message:
          "Save failed",
      });
    }
  };

// ✅ GET ALL RESULTS
export const getAllResults =
  async (req, res) => {

    try {

      const results =
        await TestResult.find()

          .populate(
            "student",
            "name email"
          )

          .populate(
            "test",
            "title"
          )

          .sort({
            createdAt: -1,
          });

      res.json(results);

    } catch (error) {

      console.log(error);

      res.status(500).json({
        success: false,

        message:
          "Failed to fetch results",
      });
    }
  };

// ✅ ANALYTICS
export const getAnalytics =
  async (req, res) => {

    try {

      const results =
        await TestResult.find();

      const totalAttempts =
        results.length;

      const averageScore =
        totalAttempts > 0
          ? (
              results.reduce(
                (acc, item) =>
                  acc +
                  item.percentage,
                0
              ) / totalAttempts
            ).toFixed(1)
          : 0;

      const passedStudents =
        results.filter(
          (r) =>
            r.percentage >= 40
        ).length;

      const failedStudents =
        results.filter(
          (r) =>
            r.percentage < 40
        ).length;

      res.json({
        totalAttempts,

        averageScore,

        passedStudents,

        failedStudents,
      });

    } catch (error) {

      console.log(error);

      res.status(500).json({
        success: false,

        message:
          "Analytics failed",
      });
    }
  };