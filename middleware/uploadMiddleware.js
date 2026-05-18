import multer from "multer";

// STORAGE
const storage =
  multer.diskStorage({

    destination: function (
      req,
      file,
      cb
    ) {

      // PROFILE IMAGE
      if (
        file.mimetype.startsWith(
          "image/"
        )
      ) {

        cb(
          null,
          "uploads/profile/"
        );

      }

      // VIDEO
      else if (
        file.mimetype.startsWith(
          "video/"
        )
      ) {

        cb(
          null,
          "uploads/videos/"
        );
      }

      else {

        cb(
          new Error(
            "Invalid file type"
          ),
          false
        );
      }
    },

    filename: function (
      req,
      file,
      cb
    ) {

      cb(
        null,
        Date.now() +
          "-" +
          file.originalname
      );
    },
  });

// FILE FILTER
const fileFilter = (
  req,
  file,
  cb
) => {

  // ALLOW IMAGES
  if (
    file.mimetype.startsWith(
      "image/"
    )
  ) {

    cb(null, true);
  }

  // ALLOW VIDEOS
  else if (
    file.mimetype.startsWith(
      "video/"
    )
  ) {

    cb(null, true);
  }

  else {

    cb(
      new Error(
        "Only image and video files allowed"
      ),
      false
    );
  }
};

const upload = multer({
  storage,
  fileFilter,
});

export default upload;