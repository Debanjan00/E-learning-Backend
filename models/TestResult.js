import mongoose from "mongoose";

const testResultSchema =
  new mongoose.Schema(
    {
      student: {
        type:
          mongoose.Schema.Types
            .ObjectId,

        ref: "User",
      },

      test: {
        type:
          mongoose.Schema.Types
            .ObjectId,

        ref: "Test",
      },

      score: Number,

      totalQuestions:
        Number,

      percentage:
        Number,
    },

    {
      timestamps: true,
    }
  );

export default mongoose.model(
  "TestResult",
  testResultSchema
);