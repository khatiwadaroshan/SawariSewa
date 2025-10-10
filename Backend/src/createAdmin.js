import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";
import Admin from "./models/admin.model.js";
import { connectDb } from "./db/dbConnect.js";

dotenv.config();

const createAdmin = async () => {
  try {
    console.log("Connecting to database...");
    await connectDb();
    console.log("Database connected");

    // Check if admin already exists
    const existing = await Admin.findOne({ email: "admin@gmail.com" });
    if (existing) {
      console.log("⚠️ Admin already exists. Skipping creation.");
      return process.exit(0);
    }

    // Hash your desired password
    const hashedPassword = await bcrypt.hash("admin123", 10);

    // Create new admin
    const admin = new Admin({
      fullname: "Roshan Khatiwada",
      email: "admin@gmail.com",
      password: hashedPassword,
    });

    await admin.save();
    console.log("✅ Admin created successfully!");
    process.exit(0);
  } catch (err) {
    console.error("❌ Failed to create admin:", err);
    process.exit(1);
  }
};

// Run the script
createAdmin();
