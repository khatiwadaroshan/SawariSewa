import multer from "multer";

// Use memory storage for multer
const storage = multer.memoryStorage();

const upload = multer({ storage });

export default upload;
