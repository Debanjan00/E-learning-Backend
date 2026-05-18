import mongoose from "mongoose";

const questionSchema =
  new mongoose.Schema({
    question: String,

    options: [String],

    correctAnswer: String,
  });

const testSchema =
  new mongoose.Schema(
    {
      title: {
        type: String,
        required: true,
      },

      course: {
        type:
          mongoose.Schema.Types
            .ObjectId,

        ref: "Course",
      },

      difficulty: {
        type: String,

        enum: [
          "Easy",
          "Medium",
          "Hard",
        ],
      },

      questions: [
        questionSchema,
      ],

      createdBy: {
        type:
          mongoose.Schema.Types
            .ObjectId,

        ref: "User",
      },
    },

    {
      timestamps: true,
    }
  );

export default mongoose.model(
  "Test",
  testSchema
);