import express from "express";
import {
  createPayment,
  getAllPayments,
  getPaymentById,
  refundPayment,
} from "../controllers/paymentController.js";

const router = express.Router();

router.post("/", createPayment);
router.get("/", getAllPayments);
router.get("/:id", getPaymentById);
router.put("/refund/:id", refundPayment); // Refund route

export default router;
