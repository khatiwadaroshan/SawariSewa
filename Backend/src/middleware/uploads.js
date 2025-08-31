
import multer from "multer";

const storage = multer.memoryStorage(); // store file in memory to send to Cloudinary
const upload = multer({ storage });

export default upload;
