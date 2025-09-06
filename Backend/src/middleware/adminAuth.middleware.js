import jwt from "jsonwebtoken";
import Admin from "../models/admin.model.js";

export const protectAdmin = async (req, res, next) => {
  try {
    const token = req.cookies.JWT;
    if (!token)
      return res.status(401).json({ message: "Unauthorized: Token missing" });

    const decoded = jwt.verify(token, process.env.JWT_Key);
    const admin = await Admin.findById(decoded.userId).select("-password");
    if (!admin) return res.status(404).json({ message: "Admin not found" });

    req.user = admin;
    next();
  } catch (error) {
    console.error(error);
    res.status(401).json({ message: "Invalid or expired token" });
  }
};
