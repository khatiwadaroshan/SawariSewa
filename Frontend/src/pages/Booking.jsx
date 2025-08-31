import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

const CLOUDINARY_URL = "https://api.cloudinary.com/v1_1/dc751hryx/image/upload";
const UPLOAD_PRESET = "my_upload_preset";

const Booking = () => {
  const [formData, setFormData] = useState({
    startDate: "",
    endDate: "",
    contactNumber: "",
    citizenshipPhoto: "",
    citizenshipFront: "",
    citizenshipBack: "",
    licensePhoto: "",
    selfieWithCitizenship: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
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

    // Validate all fields
    for (const key of Object.keys(formData)) {
      if (!formData[key]) {
        toast.error(`Please fill/upload the ${key}`);
        return;
      }
    }

    setLoading(true);

    try {
      const response = await fetch("/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        toast.success("Booking completed successfully!");
        setFormData({
          startDate: "",
          endDate: "",
          contactNumber: "",
          citizenshipPhoto: "",
          citizenshipFront: "",
          citizenshipBack: "",
          licensePhoto: "",
          selfieWithCitizenship: "",
        });
      } else {
        let errorMessage = "Unknown error occurred.";

        try {
          const text = await response.text();
          if (text) {
            const errorData = JSON.parse(text);
            errorMessage = errorData.message || errorMessage;
          }
        } catch (jsonErr) {
          errorMessage = `Error parsing server response: ${jsonErr.message}`;
        }

        toast.error(`Booking failed: ${errorMessage}`);
        console.error("Booking error details:", errorMessage);
      }
    } catch (networkError) {
      toast.error(`Network error: ${networkError.message}`);
      console.error("Network error:", networkError);
    } finally {
      setLoading(false);
    }
  };

  const imageFields = [
    { name: "citizenshipPhoto", label: "Citizenship Photo" },
    { name: "citizenshipFront", label: "Citizenship Front" },
    { name: "citizenshipBack", label: "Citizenship Back" },
    { name: "licensePhoto", label: "License Photo" },
    { name: "selfieWithCitizenship", label: "Selfie With Citizenship" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-tr from-indigo-50 via-purple-100 to-pink-50 flex items-center justify-center px-6 py-12">
      <form
        onSubmit={handleSubmit}
        className="bg-white backdrop-blur-sm bg-opacity-90 shadow-lg rounded-3xl max-w-3xl w-full p-10 space-y-8 border border-purple-200"
      >
        <h1 className="text-5xl font-extrabold text-center text-purple-700 drop-shadow-md mb-10">
          🚗 Vehicle Booking
        </h1>

        <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <Label
              htmlFor="startDate"
              className="block text-lg font-semibold text-purple-900 mb-2"
            >
              Start Date
            </Label>
            <Input
              type="date"
              name="startDate"
              value={formData.startDate}
              onChange={handleChange}
              required
              className="border-purple-300 focus:ring-purple-400 focus:border-purple-400"
            />
          </div>

          <div>
            <Label
              htmlFor="endDate"
              className="block text-lg font-semibold text-purple-900 mb-2"
            >
              End Date
            </Label>
            <Input
              type="date"
              name="endDate"
              value={formData.endDate}
              onChange={handleChange}
              required
              className="border-purple-300 focus:ring-purple-400 focus:border-purple-400"
            />
          </div>

          <div className="md:col-span-2">
            <Label
              htmlFor="contactNumber"
              className="block text-lg font-semibold text-purple-900 mb-2"
            >
              Contact Number
            </Label>
            <Input
              type="tel"
              name="contactNumber"
              value={formData.contactNumber}
              onChange={handleChange}
              required
              placeholder="+977 98XXXXXXXX"
              className="border-purple-300 focus:ring-purple-400 focus:border-purple-400"
            />
          </div>
        </section>

        <section className="space-y-6">
          <h2 className="text-2xl font-semibold text-purple-800 border-b border-purple-300 pb-2">
            Upload Documents
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {imageFields.map(({ name, label }) => (
              <div key={name} className="flex flex-col items-center">
                <Label
                  htmlFor={name}
                  className="text-lg font-medium text-purple-900 mb-2"
                >
                  {label}
                </Label>
                <Input
                  type="file"
                  name={name}
                  accept="image/*"
                  onChange={handleFileChange}
                  required
                  className="border-purple-300 focus:ring-purple-400 focus:border-purple-400"
                />
                {formData[name] && (
                  <img
                    src={formData[name]}
                    alt={label}
                    className="mt-4 rounded-xl w-full max-w-[160px] h-36 object-cover shadow-md border border-purple-300"
                    loading="lazy"
                  />
                )}
              </div>
            ))}
          </div>
        </section>

        <button
          type="submit"
          disabled={loading}
          className={`w-full py-5 rounded-2xl bg-gradient-to-r from-purple-600 to-pink-500 text-white text-2xl font-bold shadow-lg transform transition-transform duration-300 ${
            loading
              ? "opacity-60 cursor-not-allowed"
              : "hover:scale-105 hover:shadow-xl"
          }`}
        >
          {loading ? "Processing..." : " Confirm Booking"}
        </button>
      </form>
    </div>
  );
};

export default Booking;
