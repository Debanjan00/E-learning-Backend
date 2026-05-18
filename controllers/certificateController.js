import PDFDocument from "pdfkit";
import Order from "../models/Order.js";

export const generateCertificate = async (req, res) => {
  try {
    const userId = req.user._id;
    const { courseId } = req.params;

    const order = await Order.findOne({
      user: userId,
      course: courseId,
    }).populate("course");

    if (!order) {
      return res.status(400).json({
        message: "You have not purchased this course",
      });
    }

    const doc = new PDFDocument();

    res.setHeader("Content-Type", "application/pdf");
    res.setHeader(
      "Content-Disposition",
      "attachment; filename=certificate.pdf"
    );

    doc.pipe(res);

    doc.fontSize(25).text("Certificate of Completion", {
      align: "center",
    });

    doc.moveDown();

    doc.fontSize(16).text(`This is to certify that`, {
      align: "center",
    });

    doc.moveDown();

    doc.fontSize(20).text(`${req.user.name}`, {
      align: "center",
    });

    doc.moveDown();

    doc.fontSize(16).text(
      `has successfully completed the course`,
      { align: "center" }
    );

    doc.moveDown();

    doc.fontSize(18).text(`${order.course.title}`, {
      align: "center",
    });

    doc.moveDown();

    doc.text(`Date: ${new Date().toLocaleDateString()}`, {
      align: "center",
    });

    doc.end();
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};