import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const RegisterRentee = () => {
  const navigate = useNavigate();

  // Text fields state
  const [formData, setFormData] = useState({
    fullname: "",
    email: "",
    password: "",
    address: "",
    phone: "",
    nidnumber: "",
  });

  // Files state
  const [files, setFiles] = useState({
    profilePhoto: null,
    nidImage: null,
    vehicleRegistrationCard: null,
    numberPlateImage: null,
    licenseImage: null,
  });

  // Handle text input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle file input changes
  const handleFileChange = (e) => {
    const { name, files: fileList } = e.target;
    setFiles((prev) => ({ ...prev, [name]: fileList[0] }));
  };

  // Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate required files before submit (optional)
    if (
      !files.profilePhoto ||
      !files.nidImage ||
      !files.vehicleRegistrationCard ||
      !files.numberPlateImage
    ) {
      toast.error("Please upload all required images.");
      return;
    }

    try {
      const data = new FormData();

      // Append text fields
      Object.entries(formData).forEach(([key, value]) => {
        data.append(key, value);
      });

      // Append files
      Object.entries(files).forEach(([key, file]) => {
        if (file) {
          data.append(key, file);
        }
      });

      // Post form data
      const response = await axios.post(
        "http://localhost:5001/api/rentee/register",
        data,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      toast.success("Rentee registered successfully!");
      // Optionally reset form
      setFormData({
        fullname: "",
        email: "",
        password: "",
        address: "",
        phone: "",
        nidnumber: "",
      });
      setFiles({
        profilePhoto: null,
        nidImage: null,
        vehicleRegistrationCard: null,
        numberPlateImage: null,
        licenseImage: null,
      });

      // Navigate to vehicle registration or another page
      navigate("/register-vehicle");
    } catch (error) {
      const msg =
        error?.response?.data?.message || "Server error during registration";
      toast.error(msg);
      console.error("Register rentee error:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-100 flex items-center justify-center px-4 py-10">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-3xl bg-white shadow-xl rounded-3xl p-10 border border-gray-200 space-y-6"
      >
        <h1 className="text-4xl font-bold text-center text-purple-600">
          Rentee Registration
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <Label htmlFor="fullname">Full Name</Label>
            <Input
              name="fullname"
              value={formData.fullname}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <Label htmlFor="email">Email</Label>
            <Input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <Label htmlFor="password">Password</Label>
            <Input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <Label htmlFor="phone">Phone</Label>
            <Input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              required
            />
          </div>
          <div className="md:col-span-2">
            <Label htmlFor="address">Address</Label>
            <Input
              name="address"
              value={formData.address}
              onChange={handleChange}
              required
            />
          </div>
          <div className="md:col-span-2">
            <Label htmlFor="nidnumber">NID Number</Label>
            <Input
              name="nidnumber"
              value={formData.nidnumber}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-6">
          <div>
            <Label htmlFor="profilePhoto">Profile Photo</Label>
            <Input
              type="file"
              name="profilePhoto"
              accept="image/*"
              onChange={handleFileChange}
              required
            />
          </div>
          <div>
            <Label htmlFor="nidImage">NID Image</Label>
            <Input
              type="file"
              name="nidImage"
              accept="image/*"
              onChange={handleFileChange}
              required
            />
          </div>
          <div>
            <Label htmlFor="vehicleRegistrationCard">
              Vehicle Registration Card
            </Label>
            <Input
              type="file"
              name="vehicleRegistrationCard"
              accept="image/*"
              onChange={handleFileChange}
              required
            />
          </div>
          <div>
            <Label htmlFor="numberPlateImage">Number Plate Image</Label>
            <Input
              type="file"
              name="numberPlateImage"
              accept="image/*"
              onChange={handleFileChange}
              required
            />
          </div>
          <div className="md:col-span-2">
            <Label htmlFor="licenseImage">License Image (Optional)</Label>
            <Input
              type="file"
              name="licenseImage"
              accept="image/*"
              onChange={handleFileChange}
            />
          </div>
        </div>

        <button
          type="submit"
          className="w-full mt-8 py-4 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-500 text-white font-bold text-lg hover:scale-105 transition"
        >
          Register
        </button>
      </form>
    </div>
  );
};

export default RegisterRentee;
