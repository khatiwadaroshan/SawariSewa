import multer from "multer";

// Memory storage required for cloudinary streaming
const storage = multer.memoryStorage();

const upload = multer({ storage });

export default upload;
