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
    vehicleId: vehicle?._id || "", // Add vehicleId
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

    const citizenshipRegex = /^\d{11}$/;
    if (!citizenshipRegex.test(formData.citizenshipNumber)) {
      toast.error("Citizenship number must be exactly 11 digits.");
      return;
    }

    const start = new Date(formData.startDate);
    const end = new Date(formData.endDate);
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const maxStartDate = new Date();
    maxStartDate.setDate(today.getDate() + 10);

    if (start < today) {
      toast.error("Start date cannot be in the past.");
      return;
    }

    if (start > maxStartDate) {
      toast.error("Start date must be within the next 10 days.");
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

    const maxEndDate = new Date(start);
    maxEndDate.setDate(start.getDate() + 10);

    if (end > maxEndDate) {
      toast.error("End date must be within 10 days from start date.");
      return;
    }

    // Check all required fields
    const requiredFields = [
      "vehicleId",
      "startDate",
      "endDate",
      "contactNumber",
      "citizenshipNumber",
      "citizenshipFrontPhoto",
      "citizenshipBackPhoto",
      "licensePhoto",
      "selfieWithCitizenship",
    ];

    for (const field of requiredFields) {
      if (!formData[field]) {
        toast.error(
          `Please fill/upload: ${field.replace(/([A-Z])/g, " $1").trim()}`
        );
        return;
      }
    }

    if (!formData.vehicleId) {
      toast.error(
        "Vehicle information is missing. Please select a vehicle again."
      );
      navigate("/stores");
      return;
    }

    setLoading(true);
    try {
      const response = await fetch("http://localhost:5001/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
        credentials: "include",
      });

      const data = await response.json();

      if (response.ok) {
        toast.success("Booking created successfully!");
        localStorage.setItem(
          "bookingData",
          JSON.stringify({ booking: data.booking, vehicle })
        );
        navigate("/bookingconfirmation");
      } else {
        toast.error(data.message || "Booking failed!");
      }
    } catch (err) {
      console.error("Booking error:", err);
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
  const maxStartDateStr = new Date(Date.now() + 10 * 24 * 60 * 60 * 1000)
    .toISOString()
    .split("T")[0];

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
          <div className="mb-4 p-4 bg-purple-50 rounded-xl text-center">
            <p className="text-lg font-semibold">
              Selected Vehicle:{" "}
              <span className="text-[#ff4f00]">{vehicle.name}</span>
            </p>
            <p className="text-lg font-semibold">
              Price: <span className="text-[#ff4f00]">{vehicle.price}</span>
            </p>
            {vehicle.type && (
              <p className="text-sm text-gray-600">
                Type: <span className="capitalize">{vehicle.type}</span>
              </p>
            )}
          </div>
        )}

        {!vehicle && (
          <div className="mb-4 p-4 bg-red-50 rounded-xl text-center">
            <p className="text-red-600 font-semibold">
              ⚠️ No vehicle selected. Please select a vehicle first.
            </p>
          </div>
        )}

        {/* Date Selection */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="startDate" className="font-semibold">
              Start Date *
            </Label>
            <Input
              type="date"
              name="startDate"
              value={formData.startDate}
              onChange={handleChange}
              min={todayStr}
              max={maxStartDateStr}
              required
              className="mt-1"
            />
            <p className="text-xs text-gray-500 mt-1">
              Select within next 10 days
            </p>
          </div>

          <div>
            <Label htmlFor="endDate" className="font-semibold">
              End Date *
            </Label>
            <Input
              type="date"
              name="endDate"
              value={formData.endDate}
              onChange={handleChange}
              min={formData.startDate || todayStr}
              max={maxEndDateStr}
              disabled={!formData.startDate}
              required
              className="mt-1"
            />
            <p className="text-xs text-gray-500 mt-1">
              Max 10 days from start date
            </p>
          </div>
        </section>

        {/* Contact Information */}
        <section className="space-y-4">
          <div>
            <Label htmlFor="contactNumber" className="font-semibold">
              Contact Number *
            </Label>
            <Input
              type="tel"
              name="contactNumber"
              value={formData.contactNumber}
              onChange={handleChange}
              placeholder="98XXXXXXXX"
              maxLength={10}
              required
              className="mt-1"
            />
            <p className="text-xs text-gray-500 mt-1">10 digit mobile number</p>
          </div>

          <div>
            <Label htmlFor="citizenshipNumber" className="font-semibold">
              Citizenship Number *
            </Label>
            <Input
              name="citizenshipNumber"
              value={formData.citizenshipNumber}
              onChange={handleChange}
              placeholder="Enter 11 digit citizenship number"
              maxLength={11}
              required
              className="mt-1"
            />
            <p className="text-xs text-gray-500 mt-1">
              11 digit citizenship number
            </p>
          </div>
        </section>

        {/* Document Uploads */}
        <section className="space-y-4">
          <h3 className="text-xl font-bold text-gray-700 mb-4">
            📄 Upload Required Documents
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {imageFields.map(({ name, label }) => (
              <div key={name} className="space-y-2">
                <Label htmlFor={name} className="font-semibold">
                  {label} *
                </Label>
                <Input
                  type="file"
                  name={name}
                  id={name}
                  accept="image/*"
                  onChange={handleFileChange}
                  required
                  className="cursor-pointer"
                  disabled={loading}
                />
                {formData[name] && (
                  <div className="mt-2 relative">
                    <img
                      src={formData[name]}
                      alt={label}
                      className="w-full h-40 object-cover rounded-xl border-2 border-green-500"
                    />
                    <span className="absolute top-2 right-2 bg-green-500 text-white px-2 py-1 rounded-full text-xs">
                      ✓ Uploaded
                    </span>
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* Terms and Conditions */}
        <div className="bg-gray-50 p-4 rounded-xl">
          <p className="text-sm text-gray-600">
            <span className="font-semibold">Note:</span> By submitting this
            booking, you agree to our{" "}
            <a href="/termsofservices" className="text-purple-600 underline">
              Terms of Service
            </a>{" "}
            and{" "}
            <a href="/privacypolicy" className="text-purple-600 underline">
              Privacy Policy
            </a>
            . All documents will be verified by our team.
          </p>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading || !vehicle}
          className={`w-full py-4 text-xl font-bold text-white rounded-xl transition-all duration-300 ${
            loading || !vehicle
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-purple-600 hover:bg-purple-700 hover:shadow-xl transform hover:scale-105"
          }`}
        >
          {loading ? (
            <span className="flex items-center justify-center gap-2">
              <svg
                className="animate-spin h-5 w-5 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
              Processing...
            </span>
          ) : (
            "Confirm Booking"
          )}
        </button>

        {/* Cancel Button */}
        <button
          type="button"
          onClick={() => navigate(-1)}
          className="w-full py-3 text-lg font-semibold text-gray-700 bg-gray-200 rounded-xl hover:bg-gray-300 transition-all duration-300"
        >
          Cancel
        </button>
      </form>
    </div>
  );
};

export default Booking;
