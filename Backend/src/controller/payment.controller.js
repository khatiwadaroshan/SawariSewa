import Payment from "../models/payment.model.js";

// Create payment
export const createPayment = async (req, res) => {
  try {
    const { amount, status, userName, vehicleName, paymentDate } = req.body;

    // Validate numeric amount
    if (isNaN(amount)) {
      return res.status(400).json({ message: "Amount must be a number" });
    }

    const payment = await Payment.create({
      amount,
      status,
      userName,
      vehicleName,
      paymentDate: paymentDate || new Date(),
    });

    res.status(201).json({ message: "Payment saved!", payment });
  } catch (error) {
    console.error("Error creating payment:", error);
    res
      .status(500)
      .json({ message: "Failed to save payment", error: error.message });
  }
};

// Get all payments
export const getAllPayments = async (req, res) => {
  try {
    const payments = await Payment.find();
    res.status(200).json({ payments });
  } catch (error) {
    console.error("Failed to fetch payments:", error);
    res.status(500).json({ message: "Failed to fetch payments", error: error.message });
  }
};
