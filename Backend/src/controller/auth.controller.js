import bcrypt from "bcryptjs";
import User from "../models/user.model.js";
import { generateToken } from "../utils/generationtoken.js";

// for signup

export const signup = async (req, res) => {
  try {
    const { fullname, password, email } = req.body;

    if (!fullname || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    if (password < 8) {
      return res
        .status(400)
        .json({ message: "Password must be at least 8 characters long" });
    }

    const user = await User.findOne({ email });

    if (user) {
      return res.status(400).json({ message: "User already exists" });
    }

    const salt = await bcrypt.genSalt(13);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      fullname,
      email,
      password: hashedPassword,
    });

    await newUser.save();
    generateToken(newUser._id, res);

    res.status(201).json({
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

export const login = async(req,res) => {
  const {email, password} = req.body;
  try{
  
     if(!email || !password){
      return res.status(400).json({message:"Invalid credentials"})
     }
     const user = await User.findOne({email})
     if(!user){
      return res.status(400).json({message:"no user found"})
     }
     const isMatch = await bcrypt.compare(password,user.password)
     
     if(!isMatch){
      return res.status(400).json({message:"invalid password"})
     }

     generateToken(user._id,res);
     res.status(200).json({
      _id: user._id,
      email:user.email,
      password:user.password
     })

     
  }
  catch(error){
    console.log("login error",error.message);
    res.status.json({message:"invalid email and password"})
  }


}
