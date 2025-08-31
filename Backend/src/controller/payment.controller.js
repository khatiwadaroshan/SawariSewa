import axios from "axios";
import Payment from "../models/payment.models.js";

const ESEWA_BASE_URL = "https://uat.esewa.com.np/epay/main"; // test env
const ESEWA_VERIFY_URL = "https://uat.esewa.com.np/epay/transrec";
const MERCHANT_CODE = "EPAYTEST"; // use your merchant code in production

// Create local Payment record (before sending to eSewa)
export const createPayment = async (req, res) => {
  try {
    const { bookingId, amount, method } = req.body;

    if (!bookingId || !amount || !method) {
      return res
        .status(400)
        .json({ message: "All required fields are required" });
    }

    const payment = new Payment({
      bookingId,
      amount,
      method,
      status: "Pending",
    });

    await payment.save();

    // if method is eSewa → return form params
    if (method === "eSewa") {
      return res.status(201).json({
        success: true,
        payment,
        esewaData: {
          amt: amount,
          psc: 0,
          pdc: 0,
          txAmt: 0,
          tAmt: amount,
          pid: payment._id.toString(),
          scd: MERCHANT_CODE,
          su: "http://localhost:5000/api/payments/verify", // success URL
          fu: "http://localhost:5000/api/payments/failed", // fail URL
        },
      });
    }

    res.status(201).json({ success: true, payment });
  } catch (error) {
    console.error("Error creating payment:", error);
    res.status(500).json({ message: "Failed to create payment", error });
  }
};

// Verify Payment (called by eSewa redirect)
export const verifyPayment = async (req, res) => {
  try {
    const { oid, amt, refId } = req.query;

    const response = await axios.post(
      ESEWA_VERIFY_URL,
      {},
      {
        params: {
          amt,
          scd: MERCHANT_CODE,
          pid: oid,
          rid: refId,
        },
      }
    );

    if (response.data.includes("Success")) {
      await Payment.findByIdAndUpdate(oid, {
        status: "Completed",
        transactionId: refId,
      });
      return res.redirect("http://localhost:5173/payment-success");
    } else {
      await Payment.findByIdAndUpdate(oid, { status: "Failed" });
      return res.redirect("http://localhost:5173/payment-failed");
    }
  } catch (error) {
    console.error("Error verifying payment:", error);
    res.status(500).json({ message: "Payment verification failed", error });
  }
};

// Get all payments
export const getAllPayments = async (req, res) => {
  try {
    const payments = await Payment.find().populate("bookingId");
    res.status(200).json(payments);
  } catch (error) {
    console.error("Error fetching payments:", error);
    res.status(500).json({ message: "Failed to fetch payments", error });
  }
};

// Get payment by ID
export const getPaymentById = async (req, res) => {
  try {
    const { id } = req.params;
    const payment = await Payment.findById(id).populate("bookingId");

    if (!payment) return res.status(404).json({ message: "Payment not found" });

    res.status(200).json(payment);
  } catch (error) {
    console.error("Error fetching payment:", error);
    res.status(500).json({ message: "Failed to fetch payment", error });
  }
};

// Refund (just mark as refunded)
export const refundPayment = async (req, res) => {
  try {
    const { id } = req.params;
    const payment = await Payment.findByIdAndUpdate(
      id,
      { status: "Refunded" },
      { new: true }
    );

    if (!payment) return res.status(404).json({ message: "Payment not found" });

    res.status(200).json({ success: true, message: "Refunded", payment });
  } catch (error) {
    console.error("Error refunding payment:", error);
    res.status(500).json({ message: "Failed to refund payment", error });
  }
};
