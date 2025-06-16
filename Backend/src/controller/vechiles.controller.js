import Vehicle from "../models/vehicle.model.js";
import cloudinary from "../lib/cloudinary.js";

// Create vehicle

export const createVehicle = async (req, res) => {
  try {
    const {
      name,
      price,
      registrationNumber,
      type,
      fueltype,
      status,
      image,
      renteeid,
    } = req.body;

    if (
      !name ||!price ||!registrationNumber ||!type ||!fueltype ||!image ||!renteeid
    ) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Check for existing registration number
    const vehicleExists = await Vehicle.findOne({ registrationNumber });
    if (vehicleExists) {
      return res.status(400).json({ message: "Vehicle already registered" });
    }

    // Upload image to cloudinary
    const uploaded = await cloudinary.uploader.upload(image, {
      folder: "vehicles",
    });

    const newVehicle = new Vehicle({
      name,
      price,
      registrationNumber,
      type,
      fueltype,
      status: status || "available",
      image: uploaded.secure_url,
      renteeid,
    });

    await newVehicle.save();
    res.status(201).json(newVehicle);
  } catch (error) {
    console.error("Create vehicle error:", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Get all vehicles

export const getAllVehicles = async (req, res) => {
  try {
    const vehicles = await Vehicle.find();
    res.status(200).json(vehicles);
  } catch (error) {
    res.status(500).json({ message: "Failed to get vehicles" });
  }
};

// Get vehicle by ID

export const getVehicleById = async (req, res) => {
  try {
    const vehicle = await Vehicle.findById(req.params.id);
    if (!vehicle) {
      return res.status(404).json({ message: "Vehicle not found" });
    }
    res.status(200).json(vehicle);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch vehicle" });
  }
};

// Update vehicle

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
      renteeid,
    } = req.body;

    const vehicle = await Vehicle.findById(req.params.id);
    if (!vehicle) {
      return res.status(404).json({ message: "Vehicle not found" });
    }

    // If image is updated, upload new image to cloudinary
    let imageUrl = vehicle.image;
    if (image && image !== vehicle.image) {
      const upload = await cloudinary.uploader.upload(image, {
        folder: "vehicles",
      });
      imageUrl = upload.secure_url;
    }

    vehicle.name = name || vehicle.name;
    vehicle.price = price || vehicle.price;
    vehicle.registrationNumber =
      registrationNumber || vehicle.registrationNumber;

    vehicle.type = type || vehicle.type;
    vehicle.fueltype = fueltype || vehicle.fueltype;
    vehicle.status = status || vehicle.status;
    vehicle.image = imageUrl;
    vehicle.renteeid = renteeid || vehicle.renteeid;

    const updatedVehicle = await vehicle.save();
    res.status(200).json(updatedVehicle);
  } catch (error) {
    res.status(500).json({ message: "Update failed" });
  }
};

//  Delete  vehicles
export const deleteVehicle = async (req, res) => {
  try {
    const vehicle = await Vehicle.findById(req.params.id);
    if (!vehicle) {
      return res.status(404).json({ message: "Vehicle not found" });
    }

    await vehicle.remove();
    res.status(200).json({ message: "Vehicle deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete vehicle" });
  }
};
