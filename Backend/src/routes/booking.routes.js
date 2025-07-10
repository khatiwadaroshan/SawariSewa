import express from "express";
import { createBooking } from "../controller/booking.controller.js";

const router = express.Router();

router.post("/", createBooking); // handles POST /api/bookings

export default router;
