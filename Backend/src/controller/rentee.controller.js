import Rentee from "../models/rentee.model.js";
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
    const {  address, phone, nidNumber } = req.body;

    if(!address || !phone || !nidNumber) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const requiredFiles = [
      "nidImage",
      "vehicleRegistrationCard",
      "numberPlateImage",
    ];

    for (const field of requiredFiles) {
      if (!req.files[field]) {
        return res.status(400).json({ message: `Missing file: ${field}` });
      }
    }

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

    const licenseImage = req.files.licenseImage
      ? await uploadToCloudinary(
          req.files.licenseImage[0].buffer,
          "rentees",
          `licenseImage_${Date.now()}`
        )
      : "";


    const newRentee = new Rentee({
      
      
      phone,
      address,
      nidNumber: nidNumber,
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
