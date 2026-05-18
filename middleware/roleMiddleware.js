export const isInstructorOrAdmin = (req, res, next) => {
  try {
    if (req.user.role === "instructor" || req.user.role === "admin") {
      return next();
    }

    return res.status(403).json({
      message: "Access denied. Instructor/Admin only",
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const isAdmin = (req, res, next) => {
  try {
    if (req.user.role === "admin") {
      return next();
    }

    return res.status(403).json({
      message: "Access denied. Admin only",
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};