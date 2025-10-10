import express from "express";
import {
  createPayment,
  getAllPayments,
  
} from "../controller/payment.controller.js";

const router = express.Router();

router.post("/", createPayment); // create/initiate payment
router.get("/", getAllPayments); // list all



export default router;
