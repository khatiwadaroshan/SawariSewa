import bcrypt from "bcryptjs";
import crypto from "crypto";
import nodemailer from "nodemailer";
import User from "../models/user.model.js";
import { generateToken } from "../utils/generationtoken.js";
import cloudinary from "../lib/cloudinary.js";

// SIGNUP
export const signup = async (req, res) => {
  try {
    const { fullname, password, email } = req.body;

    if (!fullname || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    //  Check fullname: only letters and spaces allowed
    const nameRegex = /^[A-Za-z\s]+$/;
    if (!nameRegex.test(fullname)) {
      return res.status(400).json({
        message:
          "Full name must only contain letters and spaces (no numbers or special characters).",
      });
    }

    if (password.length < 8) {
      return res.status(400).json({
        message: "Password must be at least 8 characters long",
      });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    // hash password
    const salt = await bcrypt.genSalt(12);
    const hashedPassword = await bcrypt.hash(password, salt);

    // create token
    const verificationToken = crypto.randomBytes(32).toString("hex");

    const newUser = new User({
      fullname,
      email,
      password: hashedPassword,
      verificationToken,
      isVerified: false,
    });

    // transporter
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    // verification URL (notice consistent path!)
    const verificationUrl = `${process.env.CLIENT_URL}/verify-email?token=${verificationToken}`;

    await transporter.sendMail({
      from: `"Sawari Sewa" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: "Verify your email",
      html: `
      <p>Hi ${fullname},</p>
      <p>Please verify your email by clicking below:</p>
      <a href="${verificationUrl}">Verify Email</a>
      `,
    });

    await newUser.save();

    res.status(201).json({
      success: true,
      message: "Please click the link on your email to sign-in.",
    });
  } catch (error) {
    console.error("signup error:", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Login
export const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    if (!email || !password) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "No user found" });
    }

    // if (!user.isVerified) {
    //   return res
    //     .status(401)
    //     .json({ message: "Please verify your email before logging in." });
    // }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid password" });
    }

    generateToken(user._id, res);
    res.status(200).json({
      success: true,
      message: "Login Successfully",
      _id: user._id,
      fullname: user.fullname,
      email: user.email,
      profilePic: user.profilePic || null,
    });
  } catch (error) {
    console.log("login error:", error.message);
    res.status(500).json({ message: "Invalid email or password" });
  }
};

// LOGOUT
export const logout = async (req, res) => {
  try {
    res.cookie("JWT", "", {
      maxAge: 0,
      httpOnly: true,

    });
    res.status(200).json({ message: "Logout successfully" });
  } catch (error) {
    console.log("logout error:", error.message);
    res.status(500).json({ message: "Logout failed" });
  }
};

//  UPDATE PROFILE PICTURE

export const updatepp = async (req, res) => {
  const { profilePic } = req.body;
  try {
    if (!profilePic) {
      return res
        .status(400)
        .json({ message: "Please upload your profile picture" });
    }

    // Upload to Cloudinary
    const upload = await cloudinary.uploader.upload(profilePic);

    // Update the user in the database
    const updatedUser = await User.findByIdAndUpdate(
      req.user.id,
      { profilePic: upload.secure_url },
      { new: true }
    );

    res
      .status(200)
      .json({ message: "Upload successfully", url: updatedUser.profilePic });
  } catch (error) {
    console.log("Profile picture upload failed:", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};

// VERIFY EMAIL
export const verifyEmail = async (req, res) => {
  try {
    const { token } = req.query;

    const user = await User.findOne({ verificationToken: token });
    if (!user) {
      return res.status(400).send("Invalid or expired token");
    }

    user.isVerified = true;
    user.verificationToken = undefined;
    await user.save();

    //redirect to frontend login page after verification
    res.redirect(`${process.env.CLIENT_URL}/login`);
  } catch (error) {
    console.error("verify email error:", error.message);
    res.status(500).send("Internal server error");
  }
};

export const checkAuth = (req, res) => {
  try {
    res.status(200).json(req.user);
  } catch (error) {
    res.status(500).json({ message: "internal server error" });
  }
};
