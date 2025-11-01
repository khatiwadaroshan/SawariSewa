import Admin from "../models/admin.model.js";
import User from "../models/user.model.js";
import Vehicle from "../models/vehicle.model.js";
import Booking from "../models/booking.models.js";

import bcrypt from "bcryptjs";
import { generateToken } from "../utils/generationtoken.js";

// Admin Login

export const adminLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Email and password required" });
    }

    const admin = await Admin.findOne({ email });
    if (!admin) return res.status(404).json({ message: "Admin not found" });

    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) return res.status(400).json({ message: "Invalid password" });

    // Generate JWT and set cookie
    generateToken(admin._id, res);

    res.status(200).json({
      message: "Login successful",
      adminId: admin._id,
      fullname: admin.fullname,
    });
  } catch (error) {
    console.error("adminLogin error:", error.message);
    res.status(500).json({ message: "Server error" });
  }
};

// Fetch All Users

export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select("-password");
    res.status(200).json({ users }); // always return an object with users key
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch users" });
  }
};

// Fetch All Vehicles
export const getAllVehicles = async (req, res) => {
  try {
    const vehicles = await Vehicle.find();
    res.status(200).json({ vehicles });
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch vehicles" });
  }
};

// Fetch All Bookings

export const getAllBookings = async (req, res) => {
  try {
    // Fetch bookings from DB
    const bookings = await Booking.find(); // simple fetch

    // Send response
    res.status(200).json({ bookings });
  } catch (error) {
    console.error("Failed to fetch bookings:", error);
    res
      .status(500)
      .json({ message: "Failed to fetch bookings", error: error.message });
  }
};

export const getAllPayments = async (req, res) => {
  try {
    const payments = await Payment.find()
      .populate("userId", "fullname email")
      .populate("vehicleId", "name type price")
      .sort({ createdAt: -1 });

    res.status(200).json({ payments });
  } catch (error) {
    console.error("Failed to fetch payments:", error);
    res
      .status(500)
      .json({ message: "Failed to fetch payments", error: error.message });
  }
};