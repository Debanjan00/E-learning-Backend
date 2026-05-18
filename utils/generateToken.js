import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "secretkey123";

const generateToken = (user) => {
  return jwt.sign(
    { id: user._id },
    JWT_SECRET,
    { expiresIn: "7d" }
  );
};

export default generateToken;