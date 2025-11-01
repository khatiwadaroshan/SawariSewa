import React, { useState } from "react";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { instance } from "@/lib/axios";

const Register = () => {
  const navigate = useNavigate();
  const [profilePic, setProfilePic] = useState("");
  // const [profileFile, setProfileFile] = useState(null);
  const [input, setInput] = useState({
    fullname: "",
    email: "",
    password: "",
  });

  // Upload image to Cloudinary
  const handleImageUpload = async (file) => {
    if (!file) return;
    const data = new FormData();
    data.append("file", file);
    data.append("upload_preset", "my_upload_preset");

    try {
      const res = await fetch(
        "https://api.cloudinary.com/v1_1/dc751hryx/image/upload",
        { method: "POST", body: data }
      );
      const json = await res.json();
      setProfilePic(json.secure_url);
      toast.success("Profile picture uploaded!");
    } catch (err) {
      console.error("Upload error:", err);
      toast.error("Failed to upload image.");
    }
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    // Validate fullname
    const nameRegex = /^[A-Za-z\s]+$/;
    if (!nameRegex.test(input.fullname)) {
      toast.error("Full name must only contain letters and spaces.");
      return;
    }

    // Make sure user uploaded profile picture
    if (!profilePic) {
      toast.error("Please upload your profile picture first!");
      return;
    }

    try {
      const res = await instance.post(
        "/auth/signup",
        { ...input, profilePic },
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );

      if (res.data.success) {
        toast.success(res.data.message);
        navigate("/login");
      }

      console.log("User created:", res.data);
    } catch (error) {
      const errormessage =
        error.response?.data.message || "An unexpected error occurred";
      toast.error(errormessage);
    }
  };

  return (
    <div className="min-h-screen bg-gray-300 flex items-center justify-center px-4">
      <form
        onSubmit={submitHandler}
        className="w-full max-w-md bg-white shadow-lg rounded-2xl p-6"
      >
        <h1 className="text-3xl font-bold text-center text-[#f83002] mb-6">
          Create Account
        </h1>

        <div className="space-y-4">
          <div>
            <Label
              htmlFor="fullname"
              className="text-sm font-semibold text-black"
            >
              Full Name
            </Label>
            <Input
              type="text"
              placeholder="John Doe"
              value={input.fullname}
              onChange={(e) => setInput({ ...input, fullname: e.target.value })}
              className="mt-1 border-gray-300 focus:border-[#f83002] focus:ring-[#f83002]"
            />
          </div>

          <div>
            <Label htmlFor="email" className="text-sm font-semibold text-black">
              Email
            </Label>
            <Input
              type="email"
              placeholder="john@example.com"
              value={input.email}
              onChange={(e) => setInput({ ...input, email: e.target.value })}
              className="mt-1 border-gray-300 focus:border-[#f83002] focus:ring-[#f83002]"
            />
          </div>

          <div>
            <Label
              htmlFor="password"
              className="text-sm font-semibold text-black"
            >
              Password
            </Label>
            <Input
              type="password"
              placeholder="********"
              value={input.password}
              onChange={(e) => setInput({ ...input, password: e.target.value })}
              className="mt-1 border-gray-300 focus:border-[#f83002] focus:ring-[#f83002]"
            />
          </div>

          <div>
            <Label
              htmlFor="profilePic"
              className="text-sm font-semibold text-black"
            >
              Profile Picture
            </Label>
            <Input
              type="file"
              accept="image/*"
              onChange={(e) => {
                // setProfileFile(e.target.files[0]); // save file
                handleImageUpload(e.target.files[0]); 
              }}
              className="mt-1 border-gray-300 focus:border-[#f83002] focus:ring-[#f83002]"
            />
          </div>

          <button
            type="submit"
            disabled={!profilePic} // disable until profilePic exists
            className={`w-full mt-4 py-3 rounded-md text-white transition duration-200 ${
              !profilePic
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-[#f83002] hover:bg-[#cc2800]"
            }`}
          >
            Register
          </button>

          <p className="text-sm text-center text-gray-600 mt-2">
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-[#f83002] font-semibold hover:underline"
            >
              Login
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
};

export default Register;
