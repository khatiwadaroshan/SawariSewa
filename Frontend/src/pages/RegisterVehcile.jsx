import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { instance } from "@/lib/axios";

const CLOUDINARY_URL = "https://api.cloudinary.com/v1_1/dc751hryx/image/upload";
const UPLOAD_PRESET = "my_upload_preset"; // your actual Cloudinary upload preset

const RegisterVehicle = () => {
  const [form, setForm] = useState({
    name: "",
    price: "",
    registrationNumber: "",
    type: "",
    fueltype: "",
    image: null,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    setForm((prev) => ({ ...prev, image: e.target.files[0] }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const renteeId = localStorage.getItem("renteeId");
    if (!renteeId) {
      toast.error("Please log in as a rentee first.");
      return;
    }

    if (!form.image) {
      toast.error("Please upload a vehicle image.");
      return;
    }

    try {
      // Step 1: Upload image to Cloudinary
      const imageData = new FormData();
      imageData.append("file", form.image);
      imageData.append("upload_preset", UPLOAD_PRESET);

      const res = await fetch(CLOUDINARY_URL, {
        method: "POST",
        body: imageData,
      });

      const cloudinary = await res.json();
      const imageUrl = cloudinary.secure_url;

      // Step 2: Submit vehicle to backend
      const vehicleData = {
        name: form.name,
        price: form.price,
        registrationNumber: form.registrationNumber,
        type: form.type,
        fueltype: form.type === "car" ? form.fueltype : "",
        image: imageUrl,
        renteeid: renteeId,
      };

      const response = await instance.post("/vehicles", vehicleData);

      if (response.status === 201) {
        toast.success("Vehicle registered successfully!");
        setForm({
          name: "",
          price: "",
          registrationNumber: "",
          type: "",
          fueltype: "",
          image: null,
        });
      } else {
        toast.error("Registration failed");
      }
    } catch (error) {
      console.error("Error registering vehicle:", error);
      toast.error("Something went wrong");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-10 bg-gradient-to-br from-indigo-50 to-purple-100">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-2xl space-y-6 bg-white p-8 rounded-3xl shadow-xl border"
      >
        <h2 className="text-3xl font-bold text-center text-purple-600">
          Register Vehicle
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <Label htmlFor="name">Vehicle Name</Label>
            <Input
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="e.g. Hyundai i20"
              required
            />
          </div>

          <div>
            <Label htmlFor="price">Price (Rs/day)</Label>
            <Input
              name="price"
              type="number"
              value={form.price}
              onChange={handleChange}
              placeholder="e.g. 2500"
              required
            />
          </div>

          <div>
            <Label htmlFor="registrationNumber">Registration Number</Label>
            <Input
              name="registrationNumber"
              value={form.registrationNumber}
              onChange={handleChange}
              placeholder="e.g. BA 5 CHA 1234"
              required
            />
          </div>

          <div>
            <Label htmlFor="type">Vehicle Type</Label>
            <select
              name="type"
              value={form.type}
              onChange={handleChange}
              className="w-full p-2 border rounded-md"
              required
            >
              <option value="">Select</option>
              <option value="car">Car</option>
              <option value="bike">Bike</option>
            </select>
          </div>

          {form.type === "car" && (
            <div>
              <Label htmlFor="fueltype">Fuel Type</Label>
              <select
                name="fueltype"
                value={form.fueltype}
                onChange={handleChange}
                className="w-full p-2 border rounded-md"
                required
              >
                <option value="">Select</option>
                <option value="Petrol">Petrol</option>
                <option value="Diesel">Diesel</option>
                <option value="Electric">Electric</option>
              </select>
            </div>
          )}

          <div className="md:col-span-2">
            <Label htmlFor="image">Vehicle Image</Label>
            <Input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              required
            />
          </div>
        </div>

        <Button
          type="submit"
          className="w-full bg-gradient-to-r from-purple-600 to-indigo-500 hover:scale-105 text-white text-lg py-4"
        >
          Register Vehicle
        </Button>
      </form>
    </div>
  );
};

export default RegisterVehicle;
