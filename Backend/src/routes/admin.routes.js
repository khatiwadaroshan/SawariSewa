import express from "express";
import {
  adminLogin,
  getAllUsers,
  getAllVehicles,
  getAllBookings,
  getAllPayments,
} from "../controller/admin.controller.js";
import { protectAdmin } from "../middleware/adminAuth.middleware.js";

const router = express.Router();

// Admin login
router.post("/login", adminLogin);

// Protected routes
router.get("/users", protectAdmin, getAllUsers);
router.get("/vehicles", protectAdmin, getAllVehicles);
router.get("/bookings", protectAdmin, getAllBookings);
router.get("/payments", protectAdmin, getAllPayments);

export default router;
