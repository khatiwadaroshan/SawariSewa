import React, { useState } from "react";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { instance } from "@/lib/axios";


const RegisterRentee = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    fullname: "",
    email: "",
    password: "",
    address: "",
    phone: "",
    nidnumber: "",
  });

  const [files, setFiles] = useState({
    profilePhoto: null,
    nidImage: null,
    vehicleRegistrationCard: null,
    numberPlateImage: null,
    licenseImage: null,
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setFiles({ ...files, [e.target.name]: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const data = new FormData();

      // Append text fields
      Object.entries(formData).forEach(([key, val]) => {
        data.append(key, val);
      });

      // Append file fields
      Object.entries(files).forEach(([key, file]) => {
        if (file) {
          data.append(key, file);
        }
      });

      const res = await instance.post("/rentee/register", data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        
      });

      toast.success("Rentee Registered!");

      // Reset form after successful registration
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

      navigate("/login"); // Redirect after registration
    } catch (err) {
      console.error(err);
      toast.error(err?.response?.data?.message || "Failed to register rentee");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      encType="multipart/form-data"
      className="p-6 bg-white shadow-xl rounded-xl space-y-6 max-w-md mx-auto"
    >
      <h1 className="text-xl font-bold text-center">Register Rentee</h1>

      {/* Text Inputs */}
      {["fullname", "email", "password", "address", "phone", "nidnumber"].map(
        (field) => (
          <div key={field}>
            <Label htmlFor={field} className="capitalize">
              {field}
            </Label>
            <Input
              id={field}
              type={field === "password" ? "password" : "text"}
              name={field}
              value={formData[field]}
              required
              onChange={handleChange}
              className="mt-1"
            />
          </div>
        )
      )}

      {/* File Inputs */}
      {[
        "profilePhoto",
        "nidImage",
        "vehicleRegistrationCard",
        "numberPlateImage",
        "licenseImage",
      ].map((fileKey, index) => (
        <div key={index}>
          <Label htmlFor={fileKey} className="capitalize">
            {fileKey.replace(/([A-Z])/g, " $1")}
          </Label>
          <Input
            id={fileKey}
            type="file"
            accept="image/*"
            name={fileKey}
            onChange={handleFileChange}
            required={fileKey !== "licenseImage"} // licenseImage optional
            className="mt-1"
          />
        </div>
      ))}

      <button
        type="submit"
        className="w-full bg-purple-600 text-white py-2 rounded hover:bg-purple-700 transition"
      >
        Register Rentee
      </button>
    </form>
  );
};

export default RegisterRentee;
