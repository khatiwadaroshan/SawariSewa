
import Vehicle from "../models/vehicle.model.js";
import cloudinary from "../lib/cloudinary.js";
import mongoose from "mongoose";

// REGISTER A VEHICLE
export const registerVehicle = async (req, res) => {
  try {
    const {
      name,
      price,
      registrationNumber,
      type,
      fueltype,
      status,
      image,
      
    } = req.body;

    // Check required fields
    if (
      !name ||
      !price ||
      !registrationNumber ||
      !type ||
      !image 
      
    ) {
      return res.status(400).json({ message: "All fields are required" });
    }

    

    // Check duplicate registration number
    const vehicleExists = await Vehicle.findOne({ registrationNumber });
    if (vehicleExists) {
      return res.status(400).json({ message: "Vehicle already registered" });
    }

    // Upload image to Cloudinary
    const uploaded = await cloudinary.uploader.upload(image, {
      folder: "vehicles",
    });

    // Create vehicle
    const newVehicle = new Vehicle({
      name,
      price,
      registrationNumber,
      type,
      fueltype,
      status: status || "available",
      image: uploaded.secure_url,
     
    });

    await newVehicle.save();
    res.status(201).json(newVehicle);
  } catch (error) {
    console.error("Create vehicle error:", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};

// GET ALL VEHICLES
export const getAllVehicles = async (req, res) => {
  try {
    const vehicles = await Vehicle.find();
    res.status(200).json(vehicles);
  } catch (error) {
    res.status(500).json({ message: "Failed to get vehicles" });
  }
};

// GET VEHICLE BY ID
export const getVehicleById = async (req, res) => {
  try {
    const vehicle = await Vehicle.findById(req.params.id).populate(
      "name phone email"
    );
    if (!vehicle) return res.status(404).json({ message: "Vehicle not found" });
    res.status(200).json(vehicle);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch vehicle" });
  }
};

// UPDATE VEHICLE
export const updateVehicle = async (req, res) => {
  try {
    const {
      name,
      price,
      registrationNumber,
      type,
      fueltype,
      status,
      image,
    } = req.body;

    const vehicle = await Vehicle.findById(req.params.id);
    if (!vehicle) return res.status(404).json({ message: "Vehicle not found" });

  

    // Upload new image if changed
    let imageUrl = vehicle.image;
    if (image && image !== vehicle.image) {
      const upload = await cloudinary.uploader.upload(image, {
        folder: "vehicles",
      });
      imageUrl = upload.secure_url;
    }

    // Update fields
    vehicle.name = name || vehicle.name;
    vehicle.price = price || vehicle.price;
    vehicle.registrationNumber =registrationNumber || vehicle.registrationNumber;
    vehicle.type = type || vehicle.type;
    vehicle.fueltype = fueltype || vehicle.fueltype;
    vehicle.status = status || vehicle.status;
    vehicle.image = imageUrl;
  
   

    const updatedVehicle = await vehicle.save();
    res.status(200).json(updatedVehicle);
  } catch (error) {
    console.error("Update vehicle error:", error.message);
    res.status(500).json({ message: "Update failed" });
  }
};

// DELETE VEHICLE
export const deleteVehicle = async (req, res) => {
  try {
    const vehicle = await Vehicle.findById(req.params.id);
    if (!vehicle) return res.status(404).json({ message: "Vehicle not found" });

    await vehicle.remove();
    res.status(200).json({ message: "Vehicle deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete vehicle" });
  }
};
