import Course from "../models/Course.js";
import LiveClass from "../models/LiveClass.js";

export const getInstructorStats = async (req, res) => {
  try {
    const instructorId = req.user._id;

    // courses
    const courses = await Course.find({ instructor: instructorId })
      .sort({ createdAt: -1 })
      .limit(5);

    const totalCourses = await Course.countDocuments({
      instructor: instructorId,
    });

    // live classes
    const liveClasses = await LiveClass.find({
      instructor: instructorId,
      date: { $gte: new Date() }, // upcoming only
    })
      .sort({ date: 1 })
      .limit(5)
      .populate("course", "title");

    const totalLiveClasses = await LiveClass.countDocuments({
      instructor: instructorId,
    });

    // students (simple count)
    const allCourses = await Course.find({
      instructor: instructorId,
    });

    const totalStudents = allCourses.reduce(
      (acc, c) => acc + (c.students?.length || 0),
      0
    );

    res.json({
      totalCourses,
      totalStudents,
      totalLiveClasses,
      recentCourses: courses,
      upcomingClasses: liveClasses,
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};