import express from "express";
import {
  initiatePayment,
  verifyEsewaPayment,
  getMyPayments,
  getPaymentById,
} from "../controller/payment.controller.js";
import { protectRoute } from "../middleware/auth.middleware.js";

const router = express.Router();

// Initiate payment (protected route)
router.post("/initiate", protectRoute, initiatePayment);

// Verify eSewa payment (public route - called by eSewa redirect)
router.get("/verify-esewa", verifyEsewaPayment);

// Get user's payments (protected route)
router.get("/my-payments", protectRoute, getMyPayments);

// Get specific payment by ID (protected route)
router.get("/:paymentId", protectRoute, getPaymentById);

export default router;
