import express from "express";
import {
  login,
  logout,
  signup,
  updatepp,
} from "../controller/auth.controller.js";
import { protectRoute } from "../middleware/auth.middleware.js";

// creating new express for route

const router = express.Router();
// define route for signup
router.post("/signup", signup);
// define route for login
router.post("/login", login);
// define route fro logout
router.post("/logout", logout);
// define route for update picture
router.put("/updatepp", protectRoute, updatepp);

export default router;
