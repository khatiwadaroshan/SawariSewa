import mongoose from "mongoose";

const renteeSchema = new mongoose.Schema(
  {


    phone: { type: String,
    required: true,
     
    },

    address: { type: String,
    required: true },

    nidNumber: { type: String, // n:national
    required: true },

    nidImage: { type: String, 
    required: true },

    vehicleRegistrationCard: { type: String,
     required: true },

    numberPlateImage: { type: String, 
    required: true },

    licenseImage: { type: String },

    isVerified: { type: Boolean, 
    default: false },

    role: { type: String, default: "rentee" },

    createdAt: { type: Date,
     default: Date.now },
  },
  { collection: "rentees" }
);

const Rentee = mongoose.model("Rentee", renteeSchema);
export default Rentee;
