import bcrypt from "bcryptjs";
import User from "../models/user.model.js";
import { generateToken } from "../utils/generationtoken.js";
import cloudinary from "../lib/cloudinary.js";

// for signup

export const signup = async (req, res) => {
  try {
    const { fullname, password, email } = req.body;

    if (!fullname || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    if (password.length < 8) {
      return res
        .status(400)
        .json({ message: "Password must be at least 8 characters long" });
    }

    const user = await User.findOne({ email });

    if (user) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Generate a cryptographic salt using bcrypt with 13 rounds

    const salt = await bcrypt.genSalt(13);

    // Hash the password using the generated salt

    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      fullname,
      email,
      password: hashedPassword,
    });

    await newUser.save();

    generateToken(newUser._id, res);

    res.status(201).json({
      success:true,
      message:"Account created Successfully",
      _id: newUser._id,
      fullname: newUser.fullname,
      email: newUser.email,
      profilePic: newUser.profilePic || null,
    });
  } catch (error) {
    console.log("signup error:", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};

// for login

export const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    if (!email || !password) {
      return res.status(400).json({ message: "Invalid credentials" });
    }
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "no user found" });
    }
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ message: "invalid password" });
    }

    generateToken(user._id, res);
    res.status(200).json({
      success:true,
      message:"Login Successfully",
      _id: user._id,
      email: user.email,
      password: user.password,
    });
  } catch (error) {
    console.log("login error", error.message);
    res.status(500).json({ message: "invalid email and password" });
  }
};
// for logout

export const logout = async (req, res) => {
  try {
    res.cookie("jwt", "", {
      maxAge: 0,
    });
    res.status(402).json({ message: "logout sucessfully" });
  } catch (error) {
    res.status(500).json({ message: "Logout failed" });
    console.log("error:logging out", error.message);
  }
};
// for cloudinary
export const updatepp = async (req, res) => {
  const { profilePic } = req.body;
  try {
    if (!profilePic) {
      return res
        .status(400)
        .json({ message: "please upload your profile picture" });
    }

    const upload = await cloudinary.uploader.upload(profilePic);
    res.status(200).json({ message: "upload successfully" });
  } catch (error) {
    console.log("profile picture upload failed!", error.message);
    res.status(500).json({ message: "internal server error" });
  }
};
