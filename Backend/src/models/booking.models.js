import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema(
  {
    
    startDate: {
      type: Date,
      required: true,
    },
    endDate: {
      type: Date,
      required: true,
    },
   

    citizenshipNumber: {
      type: String,
      required: true,
    },

    citizenshipFrontPhoto: { type: String, required: true },
    citizenshipBackPhoto: { type: String, required: true },
    licensePhoto: { type: String, required: true },
    selfieWithCitizenship: { type: String, required: true },
    contactNumber: { type: String, required: true },
  },
  {
    timestamps: true,
    collection: "bookings",
  }
);

const Booking = mongoose.model("Booking", bookingSchema);
export default Booking;
