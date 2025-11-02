import express from "express";
import {
  adminLogin,
  getAllUsers,
  getAllVehicles,
  getAllBookings,
  getAllPayments,
  getUserDetails,
} from "../controller/admin.controller.js";
import { protectAdmin } from "../middleware/adminAuth.middleware.js";

const router = express.Router();

// Admin login (public)
router.post("/login", adminLogin);

// Protected admin routes
router.get("/users", protectAdmin, getAllUsers);
router.get("/users/:userId", protectAdmin, getUserDetails);
router.get("/vehicles", protectAdmin, getAllVehicles);
router.get("/bookings", protectAdmin, getAllBookings);
router.get("/payments", protectAdmin, getAllPayments);

export default router;
