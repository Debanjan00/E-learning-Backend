import Test from "../models/Test.js";
import Course from "../models/Course.js";
import Groq from "groq-sdk";

// ✅ GROQ CLIENT
const groq = new Groq({
  apiKey:
    process.env.OPENAI_API_KEY?.trim(),
});

// ✅ CREATE AI TEST
export const createAITest =
  async (req, res) => {

    try {

      const {
        title,
        courseId,
        difficulty,
        totalQuestions,
      } = req.body;

      // ✅ VALIDATION
      if (
        !title ||
        !courseId ||
        !difficulty ||
        !totalQuestions
      ) {

        return res
          .status(400)
          .json({
            success: false,

            message:
              "Fill all fields",
          });
      }

      // ✅ FIND COURSE
      const course =
        await Course.findById(
          courseId
        );

      if (!course) {

        return res
          .status(404)
          .json({
            success: false,

            message:
              "Course not found",
          });
      }

      // ✅ AI PROMPT
      const prompt = `
Generate ${totalQuestions} multiple choice questions for the course "${course.title}".

Difficulty:
${difficulty}

IMPORTANT:
Return ONLY a valid JSON array.

Format:
[
  {
    "question":
    "What is React?",

    "options":
    [
      "Library",
      "Database",
      "Operating System",
      "Browser"
    ],

    "correctAnswer":
    "Library"
  }
]
`;

      // ✅ AI REQUEST
      const completion =
        await groq.chat
          .completions.create({
            messages: [
              {
                role:
                  "user",

                content:
                  prompt,
              },
            ],

            model:
              "llama-3.3-70b-versatile",

            temperature: 0.7,
          });

      // ✅ AI RESPONSE
      let aiResponse =
        completion.choices[0]
          .message.content;

      // ✅ CLEAN RESPONSE
      aiResponse =
        aiResponse
          .replace(
            /```json/g,
            ""
          )
          .replace(
            /```/g,
            ""
          )
          .trim();

      // ✅ PARSE JSON
      let questions;

      try {

        questions =
          JSON.parse(
            aiResponse
          );

      } catch (parseError) {

        console.log(
          "JSON Parse Error:",
          parseError
        );

        console.log(
          "AI RESPONSE:",
          aiResponse
        );

        return res
          .status(500)
          .json({
            success: false,

            message:
              "AI JSON parse failed",
          });
      }

      // ✅ SAVE TEST
      const test =
        await Test.create({
          title,

          course:
            courseId,

          difficulty,

          questions,

          createdBy:
            req.user._id,
        });

      // ✅ SUCCESS RESPONSE
      res.status(201).json({
        success: true,

        message:
          "AI Test created successfully ✅",

        test,
      });

    } catch (error) {

      console.log(
        "CREATE TEST ERROR:",
        error
      );

      res.status(500).json({
        success: false,

        message:
          "Server Error",
      });
    }
  };

// ✅ GET ALL TESTS
export const getTests =
  async (req, res) => {

    try {

      const tests =
        await Test.find()

          .populate(
            "course",
            "title"
          )

          .populate(
            "createdBy",
            "name"
          )

          .sort({
            createdAt: -1,
          });

      res.json(tests);

    } catch (error) {

      console.log(error);

      res.status(500).json({
        success: false,

        message:
          "Server Error",
      });
    }
  };

// ✅ GET SINGLE TEST
export const getSingleTest =
  async (req, res) => {

    try {

      const test =
        await Test.findById(
          req.params.id
        )

          .populate(
            "course",
            "title"
          )

          .populate(
            "createdBy",
            "name"
          );

      if (!test) {

        return res
          .status(404)
          .json({
            success: false,

            message:
              "Test not found",
          });
      }

      res.json(test);

    } catch (error) {

      console.log(error);

      res.status(500).json({
        success: false,

        message:
          "Server Error",
      });
    }
  };

// ✅ DELETE TEST
export const deleteTest =
  async (req, res) => {

    try {

      const test =
        await Test.findById(
          req.params.id
        );

      if (!test) {

        return res
          .status(404)
          .json({
            success: false,

            message:
              "Test not found",
          });
      }

      await test.deleteOne();

      res.json({
        success: true,

        message:
          "Test deleted ✅",
      });

    } catch (error) {

      console.log(error);

      res.status(500).json({
        success: false,

        message:
          "Delete failed",
      });
    }
  };