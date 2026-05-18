import User from "../models/User.js";
import bcrypt from "bcryptjs";
import generateToken from "../utils/generateToken.js";
import sendEmail from "../utils/sendEmail.js";

const tempUsers = {};

// REGISTER
export const register = async (
  req,
  res
) => {
  try {

    const {
      name,
      email,
      password,
      role,
    } = req.body;

    const existingUser =
      await User.findOne({
        email,
      });

    if (existingUser) {

      return res.status(400).json({
        message:
          "User already exists",
      });
    }

    const hashedPassword =
      await bcrypt.hash(
        password,
        10
      );

    const otp =
      Math.floor(
        100000 +
          Math.random() *
            900000
      ).toString();

    // TEMP SAVE
    tempUsers[email] = {

      name,

      email,

      role,

      password:
        hashedPassword,

      otp,

      otpExpiry:
        Date.now() +
        5 * 60 * 1000,
    };

    await sendEmail(
      email,
      otp,
      name
    );

    res.json({
      message:
        "OTP sent to your email",
    });

  } catch (error) {

    res.status(500).json({
      message:
        error.message,
    });
  }
};

// VERIFY OTP
export const verifyOTP = async (
  req,
  res
) => {
  try {

    const {
      email,
      otp,
    } = req.body;

    const data =
      tempUsers[email];

    if (!data) {

      return res.status(400).json({
        message:
          "No OTP request found",
      });
    }

    if (
      data.otp !== otp ||

      data.otpExpiry <
        Date.now()
    ) {

      return res.status(400).json({
        message:
          "Invalid or expired OTP",
      });
    }

    // CREATE USER
    const user =
      await User.create({

        name:
          data.name,

        email,

        role:
          data.role,

        password:
          data.password,

        isVerified: true,
      });

    delete tempUsers[email];

    res.json({

      message:
        "User registered successfully",

      token:
        generateToken(user),

      user,
    });

  } catch (error) {

    res.status(500).json({
      message:
        error.message,
    });
  }
};

// LOGIN
export const login = async (
  req,
  res
) => {
  try {

    const {
      email,
      password,
    } = req.body;

    const user =
      await User.findOne({
        email,
      });

    if (!user) {

      return res.status(400).json({
        message:
          "Invalid email",
      });
    }

    const isMatch =
      await bcrypt.compare(
        password,
        user.password
      );

    if (!isMatch) {

      return res.status(400).json({
        message:
          "Invalid password",
      });
    }

    res.json({

      message:
        "Login successful",

      token:
        generateToken(user),

      user,
    });

  } catch (error) {

    res.status(500).json({
      message:
        error.message,
    });
  }
};

// FORGOT PASSWORD
export const forgotPassword = async (
  req,
  res
) => {
  try {

    const { email } =
      req.body;

    const user =
      await User.findOne({
        email,
      });

    if (!user) {

      return res.status(404).json({
        message:
          "User not found",
      });
    }

    // GENERATE OTP
    const otp =
      Math.floor(
        100000 +
          Math.random() *
            900000
      ).toString();

    user.otp = otp;

    user.otpExpiry =
      Date.now() +
      10 * 60 * 1000;

    await user.save();

    // SEND EMAIL
    await sendEmail(
      email,
      otp,
      user.name
    );

    res.json({
      message:
        "OTP sent to email",
    });

  } catch (error) {

    res.status(500).json({
      message:
        error.message,
    });
  }
};

// RESET PASSWORD
export const resetPassword = async (
  req,
  res
) => {
  try {

    const {
      email,
      otp,
      password,
    } = req.body;

    const user =
      await User.findOne({
        email,
      });

    if (!user) {

      return res.status(404).json({
        message:
          "User not found",
      });
    }

    // VERIFY OTP
    if (
      user.otp !== otp
    ) {

      return res.status(400).json({
        message:
          "Invalid OTP",
      });
    }

    // OTP EXPIRED
    if (
      user.otpExpiry <
      Date.now()
    ) {

      return res.status(400).json({
        message:
          "OTP expired",
      });
    }

    // HASH PASSWORD
    const hashedPassword =
      await bcrypt.hash(
        password,
        10
      );

    user.password =
      hashedPassword;

    // CLEAR OTP
    user.otp = null;

    user.otpExpiry = null;

    await user.save();

    res.json({
      message:
        "Password reset successful",
    });

  } catch (error) {

    res.status(500).json({
      message:
        error.message,
    });
  }
};