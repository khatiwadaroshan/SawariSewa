import React, { useState } from "react";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { instance } from "@/lib/axios";

const RegisterRentee = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    
    
    address: "",
    phone: "",
    nidNumber: "",
    
  });

  const [files, setFiles] = useState({
  
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
      Object.entries(formData).forEach(([key, val]) => data.append(key, val));

      // Append files if they exist
      Object.entries(files).forEach(([key, file]) => {
        if (file) data.append(key, file);
      });

      // Send request
      const response = await instance.post("/rentee/register", data, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      
      localStorage.setItem("renteeId", response.data._id);


      toast.success("Rentee Registered Successfully!");

      // Reset form
      setFormData({
        
        
        
        address: "",
        phone: "",
        nidnumber: "",
        
      });
      setFiles({
        
        nidImage: null,
        vehicleRegistrationCard: null,
        numberPlateImage: null,
        licenseImage: null,
      });

      navigate("/registervehicle");
    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.message || err.message);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-tr from-white via-[#fef0ed] to-[#fde5df] flex items-center justify-center px-4 py-12">
      <form
        onSubmit={handleSubmit}
        encType="multipart/form-data"
        className="w-full max-w-lg bg-white rounded-3xl shadow-xl p-8 space-y-8 border-4 border-[#f83002] relative overflow-hidden"
      >
        {/* Unique accent shape */}
        <div className="absolute -top-16 -right-16 w-40 h-40 bg-[#f83002] opacity-10 rounded-full rotate-45 pointer-events-none"></div>

        <h1 className="text-4xl font-extrabold text-[#f83002] text-center tracking-wide drop-shadow-md">
          Register Rentee
        </h1>

        {/* Text Inputs */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[
            
          
            "address",
            "phone",
            "nidNumber",
            
          ].map((field) => (
            <div key={field} className="flex flex-col">
              <Label
                htmlFor={field}
                className="mb-2 text-sm font-semibold text-gray-800"
              >
                {field}
              </Label>
              <Input
                id={field}
                type="text"
                name={field}
                value={formData[field]}
                required
                onChange={handleChange}
                placeholder={`Enter your ${field}`}
                className="border-2 border-gray-300 rounded-lg px-4 py-3 text-gray-700 focus:outline-none focus:border-[#f83002] focus:ring-2 focus:ring-[#f83002]/40 transition"
              />
            </div>
          ))}
        </div>

        {/* File Inputs */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[
          
            "nidImage",
            "vehicleRegistrationCard",
            "numberPlateImage",
            "licenseImage",
          ].map((fileKey, idx) => (
            <div key={idx} className="flex flex-col">
              <Label
                htmlFor={fileKey}
                className="mb-2 text-sm font-semibold text-gray-800 capitalize"
              >
                {fileKey.replace(/([A-Z])/g, " $1")}
              </Label>
              <Input
                id={fileKey}
                type="file"
                accept="image/*"
                name={fileKey}
                onChange={handleFileChange}
                required={fileKey !== "licenseImage"} // optional
                className="border-2 border-gray-300 rounded-lg px-3 py-2 cursor-pointer focus:outline-none focus:border-[#f83002] focus:ring-2 focus:ring-[#f83002]/40 transition"
              />
            </div>
          ))}
        </div>

        <button
          type="submit"
          className="w-full bg-gradient-to-r from-[#f83002] to-[#cc2800] text-white font-extrabold text-lg py-3 rounded-2xl shadow-lg hover:scale-105 hover:shadow-xl transition-transform"
        >
          Register Rentee
        </button>
      </form>
    </div>
  );
};

export default RegisterRentee;
