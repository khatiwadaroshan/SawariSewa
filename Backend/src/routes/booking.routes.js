import express from "express";
import {
  createBooking,
  getMyBookings,
} from "../controller/booking.controller.js";
import { protectRoute } from "../middleware/auth.middleware.js";

const router = express.Router();

// All booking routes require authentication
router.post("/", protectRoute, createBooking);
router.get("/mybookings", protectRoute, getMyBookings);

export default router;
