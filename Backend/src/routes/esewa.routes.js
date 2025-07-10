import express from "express";
import {
  handleEsewaSuccess,
  handleEsewaFailure,
} from "../controller/esewa.controller.js";

const router = express.Router();

router.get("/success", handleEsewaSuccess);
router.get("/failure", handleEsewaFailure);

export default router;
