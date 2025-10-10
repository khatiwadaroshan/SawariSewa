import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

const CLOUDINARY_URL = "https://api.cloudinary.com/v1_1/dc751hryx/image/upload";
const UPLOAD_PRESET = "my_upload_preset";

const Booking = () => {
  const navigate = useNavigate();
  const vehicle = JSON.parse(localStorage.getItem("selectedVehicle"));

  const [formData, setFormData] = useState({
    startDate: "",
    endDate: "",
    contactNumber: "",
    citizenshipNumber: "",
    citizenshipFrontPhoto: "",
    citizenshipBackPhoto: "",
    licensePhoto: "",
    selfieWithCitizenship: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => {
      if (name === "startDate")
        return { ...prev, startDate: value, endDate: "" };
      return { ...prev, [name]: value };
    });
  };

  const handleFileChange = async (e) => {
    const { name, files } = e.target;
    if (!files || !files[0]) return;

    setLoading(true);
    const data = new FormData();
    data.append("file", files[0]);
    data.append("upload_preset", UPLOAD_PRESET);

    try {
      const res = await fetch(CLOUDINARY_URL, { method: "POST", body: data });
      const result = await res.json();

      if (result.secure_url) {
        setFormData((prev) => ({ ...prev, [name]: result.secure_url }));
        toast.success(`${name} uploaded successfully!`);
      } else {
        toast.error(`Failed to upload ${name}`);
      }
    } catch (error) {
      toast.error(`Error uploading ${name}: ${error.message}`);
      console.error(`Upload error for ${name}:`, error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation
    const phoneRegex = /^\d{10}$/;
    if (!phoneRegex.test(formData.contactNumber)) {
      toast.error("Contact number must be exactly 10 digits.");
      return;
    }

    const start = new Date(formData.startDate);
    const end = new Date(formData.endDate);
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const maxEndDate = new Date(start);
    maxEndDate.setDate(start.getDate() + 10);

    if (start < today) {
      toast.error("Start date cannot be in the past.");
      return;
    }
    if (!formData.endDate) {
      toast.error("End date is required.");
      return;
    }
    if (end < start) {
      toast.error("End date cannot be before start date.");
      return;
    }
    if (end > maxEndDate) {
      toast.error("End date must be within 10 days from start date.");
      return;
    }

    for (const key of Object.keys(formData)) {
      if (!formData[key]) {
        toast.error(`Please fill/upload the ${key}`);
        return;
      }
    }

    setLoading(true);
    try {
      const response = await fetch("http://localhost:5001/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
        credentials: "include",
      });

      if (response.ok) {
        const data = await response.json();
        toast.success("Booking saved! Proceed to payment.");
        localStorage.setItem(
          "bookingData",
          JSON.stringify({ booking: data.booking, vehicle })
        );
        navigate("/payment");
      } else {
        toast.error("Booking failed!");
      }
    } catch (err) {
      toast.error(`Network error: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  const imageFields = [
    { name: "citizenshipFrontPhoto", label: "Citizenship Front" },
    { name: "citizenshipBackPhoto", label: "Citizenship Back" },
    { name: "licensePhoto", label: "License Photo" },
    { name: "selfieWithCitizenship", label: "Selfie With Citizenship" },
  ];

  const todayStr = new Date().toISOString().split("T")[0];
  const maxEndDateStr = formData.startDate
    ? new Date(
        new Date(formData.startDate).getTime() + 10 * 24 * 60 * 60 * 1000
      )
        .toISOString()
        .split("T")[0]
    : undefined;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-tr from-indigo-50 via-purple-100 to-pink-50 px-6 py-12">
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-lg rounded-3xl max-w-3xl w-full p-10 space-y-8 border border-purple-200"
      >
        <h1 className="text-5xl font-extrabold text-center text-purple-700 drop-shadow-md mb-6">
          🚗 Vehicle Booking
        </h1>

        {vehicle && (
          <div className="mb-4 text-center">
            <p className="text-lg font-semibold">
              Selected Vehicle:{" "}
              <span className="text-[#ff4f00]">{vehicle.name}</span>
            </p>
            <p className="text-lg font-semibold">
              Price: <span className="text-[#ff4f00]">{vehicle.price}</span>
            </p>
          </div>
        )}

        {/* Form inputs & file uploads */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="startDate">Start Date</Label>
            <Input
              type="date"
              name="startDate"
              value={formData.startDate}
              onChange={handleChange}
              min={todayStr}
              required
            />
          </div>
          <div>
            <Label htmlFor="endDate">End Date</Label>
            <Input
              type="date"
              name="endDate"
              value={formData.endDate}
              onChange={handleChange}
              min={formData.startDate || todayStr}
              max={maxEndDateStr}
              required
            />
          </div>
          <div className="md:col-span-2">
            <Label htmlFor="contactNumber">Contact Number</Label>
            <Input
              type="tel"
              name="contactNumber"
              value={formData.contactNumber}
              onChange={handleChange}
              placeholder="98XXXXXXXX"
              required
            />
          </div>
          <div className="md:col-span-2">
            <Label htmlFor="citizenshipNumber">Citizenship Number</Label>
            <Input
              name="citizenshipNumber"
              value={formData.citizenshipNumber}
              onChange={handleChange}
              placeholder="Enter your citizenship number"
              required
            />
          </div>
        </section>

        <section className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {imageFields.map(({ name, label }) => (
            <div key={name} className="flex flex-col items-center">
              <Label htmlFor={name}>{label}</Label>
              <Input
                type="file"
                name={name}
                accept="image/*"
                onChange={handleFileChange}
                required
              />
              {formData[name] && (
                <img
                  src={formData[name]}
                  alt={label}
                  className="mt-2 w-40 h-32 object-cover rounded-xl"
                />
              )}
            </div>
          ))}
        </section>

        <button
          type="submit"
          disabled={loading}
          className="w-full py-4 text-xl bg-purple-600 text-white rounded-xl"
        >
          {loading ? "Processing..." : "Confirm Booking"}
        </button>
      </form>
    </div>
  );
};

export default Booking;
