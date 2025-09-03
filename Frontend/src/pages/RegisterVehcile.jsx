import React, { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { instance } from "@/lib/axios";
import { useNavigate, useLocation } from "react-router-dom";

const CLOUDINARY_URL = "https://api.cloudinary.com/v1_1/dc751hryx/image/upload";
const UPLOAD_PRESET = "my_upload_preset";

const RegisterVehicle = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState({
    name: "",
    price: "",
    registrationNumber: "",
    type: "",
    fueltype: "",
    image: null,
    _id: null,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    setForm((prev) => ({ ...prev, image: e.target.files[0] }));
  };

  useEffect(() => {
    if (location.state?.vehicle) {
      const vehicle = location.state.vehicle;
      setForm({
        name: vehicle.name,
        price: vehicle.price,
        registrationNumber: vehicle.registrationNumber,
        type: vehicle.type,
        fueltype: vehicle.fueltype || "",
        image: null,
        _id: vehicle._id,
      });
      setEditing(true);
    }
  }, [location.state]);

  const handleSubmit = async (e) => {
    e.preventDefault();


    try {
      let imageUrl = form.image;

      if (form.image instanceof File) {
        const imageData = new FormData();
        imageData.append("file", form.image);
        imageData.append("upload_preset", UPLOAD_PRESET);

        const res = await fetch(CLOUDINARY_URL, {
          method: "POST",
          body: imageData,
        });

        const cloudinaryRes = await res.json();
        imageUrl = cloudinaryRes.secure_url;
      }

      const vehicleData = {
        name: form.name,
        price: form.price,
        registrationNumber: form.registrationNumber,
        type: form.type,
        fueltype: form.type === "car" ? form.fueltype : "",
        image: imageUrl,
      };

      if (editing && form._id) {
        const res = await instance.put(`/vehicles/update/${form._id}`, vehicleData);
        toast.success("Vehicle updated successfully!");
        navigate("/individual", { state: { newVehicle: res.data } });
      } else {
        const res = await instance.post("/vehicles/register", vehicleData);
        toast.success("Vehicle registered successfully!");
        navigate("/individual", { state: { newVehicle: res.data } });
      }

      setForm({
        name: "",
        price: "",
        registrationNumber: "",
        type: "",
        fueltype: "",
        image: null,
        _id: null,
      });

      navigate("/individual");
      
  
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-10 bg-gradient-to-br from-indigo-50 to-purple-100">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-2xl space-y-6 bg-white p-8 rounded-3xl shadow-xl border"
      >
        <h2 className="text-3xl font-bold text-center text-purple-600">
          {editing ? "Edit Vehicle" : "Register Vehicle"}
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
              required={!editing}
            />
          </div>
        </div>

        <Button
          type="submit"
          className="w-full bg-gradient-to-r from-purple-600 to-indigo-500 hover:scale-105 text-white text-lg py-4"
        >
          {editing ? "Update Vehicle" : "Register Vehicle"}
        </Button>
      </form>
    </div>
  );
};

export default RegisterVehicle;
