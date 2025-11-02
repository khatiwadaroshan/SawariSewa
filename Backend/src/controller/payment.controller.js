import Payment from "../models/payment.model.js";
import Booking from "../models/booking.models.js";
import Vehicle from "../models/vehicle.model.js";
import crypto from "crypto";

// eSewa Configuration
const ESEWA_MERCHANT_ID =  "EPAYTEST";
const ESEWA_SECRET_KEY =  "8gBm/:&EnhH.1/q";
const ESEWA_PAYMENT_URL =
  process.env.ESEWA_PAYMENT_URL ||
  "https://rc-epay.esewa.com.np/api/epay/main/v2/form";
const SUCCESS_URL =
  process.env.SUCCESS_URL || "http://localhost:5173/paymentsuccess";
const FAILURE_URL =
  process.env.FAILURE_URL || "http://localhost:5173/paymentfailure";

// Generate eSewa signature
const generateSignature = (message) => {
  const hmac = crypto.createHmac("sha256", ESEWA_SECRET_KEY);
  hmac.update(message);
  return hmac.digest("base64");
};

// Initialize Payment
export const initiatePayment = async (req, res) => {
  try {
    const { bookingId, amount, paymentMethod } = req.body;
    const userId = req.user._id;

    if (!bookingId|| !amount) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    // Verify booking exists
    const booking = await Booking.findById(bookingId);
    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }

    // Verify vehicle exists
    // const vehicle = await Vehicle.findById(vehicleId);
    // if (!vehicle) {
    //   return res.status(404).json({ message: "Vehicle not found" });
    // }

    // Create payment record
    const payment = await Payment.create({
      userId,
      
      bookingId,
      amount,
      paymentMethod: paymentMethod || "eSewa",
      status: "pending",
    });

    if (paymentMethod === "eSewa") {
      // Generate unique transaction ID
      const transactionUuid = `${payment._id}-${Date.now()}`;

      // Prepare eSewa parameters
      const totalAmount = amount.toString();
      const productCode = "EPAYTEST";

      // Create signature message
      const signatureMessage = `total_amount=${totalAmount},transaction_uuid=${transactionUuid},product_code=${productCode}`;
      const signature = generateSignature(signatureMessage);

      // Update payment with transaction details
      payment.transactionId = transactionUuid;
      await payment.save();

      // Return eSewa payment details
      return res.status(200).json({
        success: true,
        paymentId: payment._id,
        esewaParams: {
          amount: totalAmount,
          tax_amount: "0",
          total_amount: totalAmount,
          transaction_uuid: transactionUuid,
          product_code: productCode,
          product_service_charge: "0",
          product_delivery_charge: "0",
          success_url: SUCCESS_URL,
          failure_url: FAILURE_URL,
          signed_field_names: "total_amount,transaction_uuid,product_code",
          signature: signature,
        },
        esewaUrl: ESEWA_PAYMENT_URL,
      });
    } else if (paymentMethod === "Cash") {
      // For cash payment, mark as pending
      return res.status(200).json({
        success: true,
        paymentId: payment._id,
        message: "Cash payment recorded. Please pay at pickup.",
      });
    } else {
      return res.status(400).json({ message: "Invalid payment method" });
    }
  } catch (error) {
    console.error("Payment initiation error:", error);
    return res.status(500).json({ message: "Payment initiation failed" });
  }
};

// Verify eSewa Payment
export const verifyEsewaPayment = async (req, res) => {
  try {
    const { data } = req.query;

    if (!data) {
      return res.status(400).json({ message: "Invalid payment data" });
    }

    // Decode base64 data from eSewa
    const decodedData = JSON.parse(
      Buffer.from(data, "base64").toString("utf-8")
    );

    const {
      transaction_code,
      status,
      total_amount,
      transaction_uuid,
      product_code,
      signed_field_names,
      signature,
    } = decodedData;

    // Verify signature
    const signatureMessage = `transaction_code=${transaction_code},status=${status},total_amount=${total_amount},transaction_uuid=${transaction_uuid},product_code=${product_code},signed_field_names=${signed_field_names}`;
    const expectedSignature = generateSignature(signatureMessage);

    if (signature !== expectedSignature) {
      return res.status(400).json({ message: "Invalid signature" });
    }

    // Find payment by transaction UUID
    const payment = await Payment.findOne({
      transactionId: transaction_uuid,
    });

    if (!payment) {
      return res.status(404).json({ message: "Payment not found" });
    }

    // Update payment status
    if (status === "COMPLETE") {
      payment.status = "completed";
      payment.transactionId = transaction_code;
      await payment.save();

      // Update booking status
      await Booking.findByIdAndUpdate(payment.bookingId, {
        status: "confirmed",
      });

      // Update vehicle status
      await Vehicle.findByIdAndUpdate(payment.vehicleId, {
        status: "rented",
      });

      return res.status(200).json({
        success: true,
        message: "Payment verified successfully",
        payment,
      });
    } else {
      payment.status = "failed";
      await payment.save();

      return res.status(400).json({
        success: false,
        message: "Payment failed",
      });
    }
  } catch (error) {
    console.error("Payment verification error:", error);
    return res.status(500).json({ message: "Payment verification failed" });
  }
};

// Get User Payments
export const getMyPayments = async (req, res) => {
  try {
    const userId = req.user._id;

    const payments = await Payment.find({ userId })
      
      .populate("bookingId")
      .sort({ createdAt: -1 });

    return res.status(200).json({ payments });
  } catch (error) {
    console.error("Get payments error:", error);
    return res.status(500).json({ message: "Failed to fetch payments" });
  }
};

// Get Payment by ID
export const getPaymentById = async (req, res) => {
  try {
    const { paymentId } = req.params;

    const payment = await Payment.findById(paymentId)
      .populate("userId", "fullname email")
      
      .populate("bookingId");

    if (!payment) {
      return res.status(404).json({ message: "Payment not found" });
    }

    return res.status(200).json({ payment });
  } catch (error) {
    console.error("Get payment error:", error);
    return res.status(500).json({ message: "Failed to fetch payment" });
  }
};
