import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema(
  {
    //   customerId: {
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: "User",
    //     required: true,
    //   },
    //   vehicleId: {
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: "Vehicle",
    //     required: true,
    //   },
    startDate: {
      type: Date,
      required: true,
    },
    endDate: {
      type: Date,
      required: true,
    },
    // status: {
    //   type: String,
    //   enum: ["Pending", "Accepted", "Rejected", "Cancelled", "Completed"],
    //   required: true,
    // },
    // totalAmount: {
    //   type: Number,
    //   required: true,
    // },
    // paymentId: {
    //   type: mongoose.Schema.Types.ObjectId,
    //   ref: "Payment",
    // },

    citizenshipFrontPhoto: { type: String, required: true },
    citizenshipBackPhoto: { type: String, required: true },
    licensePhoto: { type: String, required: true },
    selfieWithCitizenship: { type: String, required: true },
    contactNumber: { type: String, required: true, unique: true },
  },
  {
    timestamps: true,
    collection: "bookings",
  }
);

const Booking = mongoose.model("Booking", bookingSchema);
export default Booking;
