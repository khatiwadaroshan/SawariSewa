import mongoose from "mongoose";

const paymentSchema = new mongoose.Schema({
  amount: { type: Number, required: true }, // numeric
  status: { type: String, required: true }, // "success" or "failed"
  userName: { type: String, required: true }, // logged-in user name
  vehicleName: { type: String, required: true }, // booked vehicle name
  paymentDate: { type: Date, default: Date.now },
});

export default mongoose.model("Payment", paymentSchema);
