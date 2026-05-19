import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import cloudinary from "../config/cloudinary.js";

const storage = new CloudinaryStorage({
  cloudinary,

  params: async (req, file) => {
    let folder = "e-learning/others";

    // IMAGE
    if (file.mimetype.startsWith("image/")) {
      folder = "e-learning/profile";
    }

    // VIDEO
    else if (file.mimetype.startsWith("video/")) {
      folder = "e-learning/videos";
    }

    return {
      folder,
      resource_type: "auto",
      public_id: Date.now() + "-" + file.originalname,
    };
  },
});

// FILE FILTER
const fileFilter = (req, file, cb) => {
  // ALLOW IMAGES
  if (file.mimetype.startsWith("image/")) {
    cb(null, true);
  }

  // ALLOW VIDEOS
  else if (file.mimetype.startsWith("video/")) {
    cb(null, true);
  }

  else {
    cb(
      new Error("Only image and video files allowed"),
      false
    );
  }
};

const upload = multer({
  storage,
  fileFilter,
});

export default upload;