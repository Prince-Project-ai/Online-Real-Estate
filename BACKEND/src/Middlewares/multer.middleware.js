import multer from "multer";

// Configure Multer to store files temporarily
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    console.log("Files : ", file);
    cb(null, "src/uploads/profileImg/");
  },
  filename: (req, file, cb) => {
    console.log("Request : ", req);
    const uniqueName = `${Date.now()}_${file.originalname}`;
    cb(null, uniqueName);
  },
});

// File type filtering
const fileFilter = (req, file, cb) => {
  const allowedMimeTypes = [
    "image/jpeg",
    "image/png",
    "image/gif",
    "image/jpg",
  ];

  if (allowedMimeTypes.includes(file.mimetype)) {
    cb(null, true); // Accept the file
  } else {
    cb(
      new ApiError(
        400,
        "Unsupported file type! Only JPEG, JPG, PNG and GIF are allowed"
      ),
      false
    );
  }
};

// // Multer instance for upload
export const upload = multer({
  storage,
  limits: {
    fileSize: 5 * 1024 * 1024, // File size limit: 5MB
  },
  fileFilter,
});

// for other knoledge

// const multipleFeilds = upload.fields([
//     {name: 'profileImage', maxCount: 1}
//     {name: 'document', maxCount: 1}
//     {name: 'profileImage', maxCount: 1}
//     {name: 'profileImage', maxCount: 1}
// ])
