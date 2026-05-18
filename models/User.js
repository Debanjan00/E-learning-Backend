import mongoose from "mongoose";

const userSchema =
  new mongoose.Schema(
    {
      name: {
        type: String,
        required: true,
      },

      email: {
        type: String,
        required: true,
        unique: true,
      },

      password: {
        type: String,
        required: true,
      },

      role: {
        type: String,

        enum: [
          "student",
          "instructor",
          "admin",
        ],

        default: "student",
      },

      // PROFILE IMAGE
      image: {
        type: String,
      },

      // USER BIO
      bio: {
        type: String,
      },

      // EMAIL VERIFIED
      isVerified: {
        type: Boolean,
        default: false,
      },

      // OTP
      otp: {
        type: String,
      },

      otpExpiry: {
        type: Date,
      },

      // COURSE PROGRESS
      progress: [
        {
          course: {
            type:
              mongoose.Schema.Types.ObjectId,

            ref: "Course",
          },

          completedLectures: [
            {
              type:
                mongoose.Schema.Types.ObjectId,

              ref: "Lecture",
            },
          ],
        },
      ],
    },
    {
      timestamps: true,
    }
  );

const User =
  mongoose.model(
    "User",
    userSchema
  );

export default User;