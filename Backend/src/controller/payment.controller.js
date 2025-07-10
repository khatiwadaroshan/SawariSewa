import Payment from "../models/Payment.js";

// Create Payment
export const createPayment = async (req, res) => {
  try {
    const { bookingId, amount, method, status } = req.body;

    if (!bookingId || !amount || !method) {
      return res
        .status(400)
        .json({ message: "All required fields must be provided" });
    }

    const newPayment = new Payment({
      bookingId,
      amount,
      method,
      status: status || "Paid",
    });

    await newPayment.save();
    res.status(201).json({ success: true, payment: newPayment });
  } catch (error) {
    console.error("Error creating payment:", error);
    res.status(500).json({ message: "Failed to create payment", error });
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

    if (!payment) {
      return res.status(404).json({ message: "Payment not found" });
    }

    res.status(200).json(payment);
  } catch (error) {
    console.error("Error fetching payment:", error);
    res.status(500).json({ message: "Failed to fetch payment", error });
  }
};

// Refund Payment (just updates status)
export const refundPayment = async (req, res) => {
  try {
    const { id } = req.params;

    const payment = await Payment.findByIdAndUpdate(
      id,
      { status: "Refunded" },
      { new: true }
    );

    if (!payment) {
      return res.status(404).json({ message: "Payment not found" });
    }

    res.status(200).json({
      success: true,
      message: "Payment marked as refunded",
      payment,
    });
  } catch (error) {
    console.error("Error refunding payment:", error);
    res.status(500).json({ message: "Failed to refund payment", error });
  }
};
