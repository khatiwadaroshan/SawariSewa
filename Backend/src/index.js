import express from "express";
import dotenv from "dotenv";
import { connectDb } from "./db/dbConnect.js";
import authRoutes from "./routes/auth.routes.js";
import cookieparser from "cookie-parser";

dotenv.config();

const port = process.env.PORT;
// creating instance of express
const app = express();

// middleware to parse cookies
app.use(express.json());

// import cookie parser to read cookies from new request
app.use(cookieparser());

app.use("/api/auth/", authRoutes);
app.listen(port, (req, res) => {
  console.log(`server listing on port ${port}`);
  connectDb();
});
