import express from "express";
import { deleteVehicle, getAllVehicles, getVehicleById, registerVehicle, updateVehicle } from "../controller/vehicles.controller.js";



const router = express.Router();


router.post("/registerVehicle",registerVehicle ); 


router.get("/getAllVehicles", getAllVehicles);


router.get("/:id",getVehicleById );

router.put("/:id", updateVehicle);


router.delete("/:id", deleteVehicle);

export default router;
