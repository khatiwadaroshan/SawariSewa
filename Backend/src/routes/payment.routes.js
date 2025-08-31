import express from "express";
import {
  createPayment,
  getAllPayments,
  getPaymentById,
  refundPayment,
  verifyPayment,
} from "../controller/payment.controller.js";

const router = express.Router();

router.post("/", createPayment); // create/initiate payment
router.get("/", getAllPayments); // list all
router.get("/:id", getPaymentById); // get single
router.put("/:id/refund", refundPayment); // refund
router.get("/verify", verifyPayment); // eSewa verification

export default router;
