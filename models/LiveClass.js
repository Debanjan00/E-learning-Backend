import mongoose from "mongoose";

const liveClassSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },

    course: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Course",
      required: true,
    },

    instructor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      // ❌ removed required
    },

    meetingLink: {
      type: String,
      required: true,
    },

    date: {
      type: Date,
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("LiveClass", liveClassSchema);