import Admin from "../models/admin.model.js";
import User from "../models/user.model.js";
import Vehicle from "../models/vehicle.model.js";
import Booking from "../models/booking.models.js";
// import Payment from "../models/payment.model.js";

import bcrypt from "bcryptjs";
import { generateToken } from "../utils/generationtoken.js";
import Payment from "../models/payment.model.js";

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
      role: "admin",
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
    res.status(200).json({ users });
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

// Fetch All Bookings with populated user and vehicle data
export const getAllBookings = async (req, res) => {
  try {
    const bookings = await Booking.find()
      .populate("userId", "fullname email")
      .populate("vehicleId", "name type price")
      .sort({ createdAt: -1 });

    res.status(200).json({ bookings });
  } catch (error) {
    console.error("Failed to fetch bookings:", error);
    res
      .status(500)
      .json({ message: "Failed to fetch bookings", error: error.message });
  }
};

// Fetch All Payments
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

// Get User Details (for viewing rented user info)
export const getUserDetails = async (req, res) => {
  try {
    const { userId } = req.params;

    const user = await User.findById(userId).select("-password");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Get user's bookings
    const bookings = await Booking.find({ userId })
      .populate("vehicleId", "name type price")
      .sort({ createdAt: -1 });

    // Get user's payments
    const payments = await Payment.find({ userId })
      .populate("vehicleId", "name type price")
      .sort({ createdAt: -1 });

    res.status(200).json({
      user,
      bookings,
      payments,
    });
  } catch (error) {
    console.error("Failed to fetch user details:", error);
    res.status(500).json({ message: "Failed to fetch user details" });
  }
};
