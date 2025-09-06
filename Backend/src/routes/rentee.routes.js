import express from "express";
import { registerRentee } from "../controller/rentee.controller.js";
import upload from "../middleware/uploads.js";

const router = express.Router();

router.post(
  "/register",
  upload.fields([
    { name: "nidImage", maxCount: 1 },
    { name: "vehicleRegistrationCard", maxCount: 1 },
    { name: "numberPlateImage", maxCount: 1 },
    { name: "licenseImage", maxCount: 1 }, // optional
  ]),
  registerRentee
);

export default router;
