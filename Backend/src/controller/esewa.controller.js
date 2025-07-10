import axios from "axios";
import Payment from "../models/payment.models.js";
import Booking from "../models/booking.models.js";

export const handleEsewaSuccess = async (req, res) => {
  const { amt, pid, rid } = req.query; // pid = paymentId

  const xmlPayload = `
    <transaction>
      <id>${rid}</id>
      <amt>${amt}</amt>
      <scd>EPAYTEST</scd>
      <pid>${pid}</pid>
    </transaction>
  `;

  try {
    const { data } = await axios.post(
      "https://uat.esewa.com.np/epay/transrec",
      xmlPayload,
      {
        headers: { "Content-Type": "text/xml" },
      }
    );

    if (data.includes("<response_code>Success</response_code>")) {
      const payment = await Payment.findByIdAndUpdate(
        pid,
        {
          status: "Completed",
          transactionId: rid,
          paidAt: new Date(),
        },
        { new: true }
      );

      await Booking.findByIdAndUpdate(payment.bookingId, {
        paymentId: pid,
        status: "Accepted",
      });

      return res.redirect("http://localhost:3000/payment-success");
    } else {
      await Payment.findByIdAndUpdate(pid, { status: "Failed" });
      return res.redirect("http://localhost:3000/payment-failure");
    }
  } catch (error) {
    console.error("Esewa verification failed", error);
    res.status(500).send("Payment verification error");
  }
};

export const handleEsewaFailure = (req, res) => {
  res.redirect("http://localhost:3000/payment-failure");
};
