import Rentee from "../models/rentee.model.js";
import bcrypt from "bcryptjs";
import cloudinary from "../lib/cloudinary.js";

// Upload helper
const uploadToCloudinary = (fileBuffer, folder, filename) =>
  new Promise((resolve, reject) => {
    cloudinary.uploader
      .upload_stream({ folder, public_id: filename }, (error, result) => {
        if (error) reject(error);
        else resolve(result.secure_url);
      })
      .end(fileBuffer);
  });

export const registerRentee = async (req, res) => {
  try {
    const { fullname, email, password, address, phone, nidnumber } = req.body;

    const requiredFiles = [
      "profilePhoto",
      "nidImage",
      "vehicleRegistrationCard",
      "numberPlateImage",
    ];

    for (const field of requiredFiles) {
      if (!req.files[field]) {
        return res.status(400).json({ message: `Missing file: ${field}` });
      }
    }

    const profilePhoto = await uploadToCloudinary(
      req.files.profilePhoto[0].buffer,
      "rentees",
      `profilePhoto_${Date.now()}`
    );

    const nidImage = await uploadToCloudinary(
      req.files.nidImage[0].buffer,
      "rentees",
      `nidImage_${Date.now()}`
    );

    const vehicleRegistrationCard = await uploadToCloudinary(
      req.files.vehicleRegistrationCard[0].buffer,
      "rentees",
      `vehicleRegistrationCard_${Date.now()}`
    );

    const numberPlateImage = await uploadToCloudinary(
      req.files.numberPlateImage[0].buffer,
      "rentees",
      `numberPlateImage_${Date.now()}`
    );

    let licenseImage = "";
    if (req.files.licenseImage) {
      licenseImage = await uploadToCloudinary(
        req.files.licenseImage[0].buffer,
        "rentees",
        `licenseImage_${Date.now()}`
      );
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
