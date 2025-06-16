import mongoose from "mongoose";

const vechileSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
   
    registrationNumber: {
      type: String,
      unique: true,
    },
    
    image: {
      type: String,
      required: true,
    },
    renteeid: {
      type: Number,
      required: true,
    },
    type: {
      type: String,
      enum: ["car", "bike", "etc"],
      required: true,
    },
    fueltype: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ["available", "rented", "maintenance"],
      default: "available",
    },
  },
  {
    timestamps: true,
  }
);