import express from "express";
import dotenv from "dotenv";
import { connectDb } from "./db/dbConnect.js";
import authRoutes from "./routes/auth.routes.js"

dotenv.config();

const port = process.env.PORT;
const app = express();
app.use(express.json());
app.use("/api/auth/",authRoutes)
app.listen(port, (req, res) => {
  console.log(`server listing on port ${port}`);
  connectDb();
});
