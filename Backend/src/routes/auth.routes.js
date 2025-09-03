import express from "express";
import {
  checkAuth,
  login,
  logout,
  signup,
  updatepp,
  verifyEmail, // add this
} from "../controller/auth.controller.js";
import { protectRoute } from "../middleware/auth.middleware.js";

const router = express.Router();

// Signup
router.post("/signup", signup);

// Email verification
router.get("/verify-email", verifyEmail); // new route

// Login
router.post("/login", login);

// Logout
router.post("/logout", logout);

// Update profile picture
router.put("/updatepp", protectRoute, updatepp);

router.get("/checkauth", protectRoute,checkAuth)

export default router;
