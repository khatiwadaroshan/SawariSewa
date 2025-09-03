// vehicle.routes.js

import express from "express";
import {
  registerVehicle,
  getAllVehicles,
  getVehicleById,
  updateVehicle,
  deleteVehicle,
} from "../controller/vehicles.controller.js";

const router = express.Router();

// POST - register new vehicle
router.post("/register", registerVehicle);

// GET - all vehicles with rentee details
router.get("/getV", getAllVehicles);

// GET - single vehicle by ID with rentee details
router.get("/:id", getVehicleById);

// PUT - update vehicle
router.put("/update/:id", updateVehicle);

// DELETE - remove vehicle
router.delete("/delete/:id", deleteVehicle);

export default router;
