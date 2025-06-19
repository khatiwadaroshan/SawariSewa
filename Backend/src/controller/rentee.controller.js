import cloudinary from "../lib/cloudinary.js";
import Rentee from "../models/rentee.model.js";
import bcrypt from "bcryptjs";

export const registerRentee = async (req, res) => {
  try {
    const { fullname, email, password, address, phone, nidnumber } = req.body;

    // File fields from multer
    const profilePhoto = req.files["profilePhoto"]?.[0]?.path || "";
    const nidImage = req.files["nidImage"]?.[0]?.path || "";
    const vehicleRegistrationCard =
      req.files["vehicleRegistrationCard"]?.[0]?.path || "";
    const numberPlateImage = req.files["numberPlateImage"]?.[0]?.path || "";
    const licenseImage = req.files["licenseImage"]?.[0]?.path || "";

    if (
      !profilePhoto ||
      !nidImage ||
      !vehicleRegistrationCard ||
      !numberPlateImage
    ) {
      return res.status(400).json({ message: "Required images missing" });
    }

    const existingRentee = await Rentee.findOne({ email });
    if (existingRentee) {
      return res
        .status(400)
        .json({ message: "Rentee with this email already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newRentee = new Rentee({
      name: fullname,
      email,
      phone,
      address,
      password: hashedPassword,
      nidNumber: nidnumber,
      profilePhoto,
      nidImage,
      vehicleRegistrationCard,
      numberPlateImage,
      licenseImage,
    });

    await newRentee.save();

    res.status(201).json({
      message: "Rentee registered successfully",
      renteeId: newRentee._id,
    });
  } catch (error) {
    console.error("Error registering rentee:", error);
    res.status(500).json({ message: "Server Error" });
  }
};
