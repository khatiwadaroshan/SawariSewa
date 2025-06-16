import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

export const protectRoute = async (req, res, next) => {
  const token = req.cookies.JWT;
  try {
    if (!token) {
      return res.status(401).json({ message: "Unauthorized: Token mfissing" });
    }

    // verify and decode token
    const decoded = jwt.verify(token, process.env.JWT_Key);

    // find the user by user.findbyid
    const user = await User.findById(decoded.userId).select("-password");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Store user
    req.user = user;

    next(); //  Moving to next middleware
  } catch (error) {
    console.error(error);
    return res.status(401).json({ message: "Invalid or expired token" });
  }
};
