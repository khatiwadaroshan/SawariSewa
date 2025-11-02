import React, { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

const CLOUDINARY_URL = "https://api.cloudinary.com/v1_1/dc751hryx/image/upload";
const UPLOAD_PRESET = "my_upload_preset";

const Booking = () => {
  const navigate = useNavigate();
  const vehicle = JSON.parse(localStorage.getItem("selectedVehicle"));

  const [loading, setLoading] = useState(false);
  const [vPrice, setVPrice] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);

  const [booking, setBooking] = useState({
    startDate: "",
    endDate: "",
    contactNumber: "",
    citizenshipNumber: "",
    citizenshipFrontPhoto: "",
    citizenshipBackPhoto: "",
    licensePhoto: "",
    selfieWithCitizenship: "",
  });

  useEffect(() => {
    if (vehicle?.price) setVPrice(vehicle.price);
  }, [vehicle]);

  // Calculate total price whenever dates or vehicle price change
  useEffect(() => {
    if (!booking.startDate || !booking.endDate || !vPrice) {
      setTotalPrice(0);
      return;
    }

    const start = new Date(booking.startDate);
    const end = new Date(booking.endDate);

    if (isNaN(start.getTime()) || isNaN(end.getTime()) || end < start) {
      setTotalPrice(0);
      return;
    }

    const diffInTime = end - start;
    const diffInDays = Math.ceil(diffInTime / (1000 * 60 * 60 * 24));
    const days = diffInDays === 0 ? 1 : diffInDays;
    setTotalPrice(days * vPrice);

    console.log(diffInTime + ": diffTime");
    console.log(diffInDays + ": diffindays");
    console.log(days + ": days");
    console.log(vPrice + ": vPrice");
    
    
    
    console.log(totalPrice + ": totalprice");
    
  }, [booking.startDate, booking.endDate, vPrice]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setBooking((prev) => ({
      ...prev,
      [name]: value,
    }));
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
        setBooking((prev) => ({ ...prev, [name]: result.secure_url }));
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

  const validateBooking = () => {
    const phoneRegex = /^\d{10}$/;
    if (!phoneRegex.test(booking.contactNumber)) {
      toast.error("Contact number must be exactly 10 digits.");
      return false;
    }

    const start = new Date(booking.startDate);
    const end = new Date(booking.endDate);
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const maxEndDate = new Date(start);
    maxEndDate.setDate(start.getDate() + 10);

    if (start < today) {
      toast.error("Start date cannot be in the past.");
      return false;
    }
    if (!booking.endDate) {
      toast.error("End date is required.");
      return false;
    }
    if (end < start) {
      toast.error("End date cannot be before start date.");
      return false;
    }
    if (end > maxEndDate) {
      toast.error("End date must be within 10 days from start date.");
      return false;
    }

    for (const key of Object.keys(booking)) {
      if (!booking[key]) {
        toast.error(`Please fill/upload the ${key}`);
        return false;
      }
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateBooking()) return;

    const vehicleId = vehicle._id || vehicle.id;

    if (!vehicleId) {
      toast.error("No vehicle selected. Please try again.");
      return;
    }

    setLoading(true);
    try {
      const response = await fetch("http://localhost:5001/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...booking, totalPrice, vehicleId }),
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
        const err = await response.json();
        toast.error(err.message || "Booking failed!");
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
  const maxEndDateStr = booking.startDate
    ? new Date(new Date(booking.startDate).getTime() + 10 * 24 * 60 * 60 * 1000)
        .toISOString()
        .split("T")[0]
    : undefined;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-tr from-indigo-50 via-purple-100 to-pink-50 px-6 py-12">
      <div className="bg-white shadow-lg rounded-3xl max-w-3xl w-full p-10 space-y-8 border border-purple-200">
        <h1 className="text-5xl font-extrabold text-center text-purple-700 drop-shadow-md mb-6">
          🚗 Vehicle Booking
        </h1>

        {vehicle && (
          <div className="mb-4 text-center">
            <p className="text-lg font-semibold">
              Selected Vehicle:{" "}
              <span className="text-orange-600">{vehicle.name}</span>
            </p>
            <p className="text-lg font-semibold">
              Price per day:{" "}
              <span className="text-orange-600"> {vPrice}</span>
            </p>
            {booking.startDate && booking.endDate && totalPrice > 0 && (
              <p className="text-lg font-semibold mt-2">
                Total Price:{" "}
                <span className="text-green-600">Rs. {totalPrice}</span>
              </p>
            )}
          </div>
        )}

        <section className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="startDate">Start Date</Label>
            <Input
              type="date"
              id="startDate"
              name="startDate"
              value={booking.startDate}
              onChange={handleInputChange}
              min={todayStr}
              required
            />
          </div>
          <div>
            <Label htmlFor="endDate">End Date</Label>
            <Input
              type="date"
              id="endDate"
              name="endDate"
              value={booking.endDate}
              onChange={handleInputChange}
              min={booking.startDate || todayStr}
              max={maxEndDateStr}
              required
            />
          </div>
          <div className="md:col-span-2">
            <Label htmlFor="contactNumber">Contact Number</Label>
            <Input
              type="tel"
              id="contactNumber"
              name="contactNumber"
              value={booking.contactNumber}
              onChange={handleInputChange}
              placeholder="98XXXXXXXX"
              required
            />
          </div>
          <div className="md:col-span-2">
            <Label htmlFor="citizenshipNumber">Citizenship Number</Label>
            <Input
              id="citizenshipNumber"
              name="citizenshipNumber"
              value={booking.citizenshipNumber}
              onChange={handleInputChange}
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
                id={name}
                name={name}
                accept="image/*"
                onChange={handleFileChange}
                required
              />
              {booking[name] && (
                <img
                  src={booking[name]}
                  alt={label}
                  className="mt-2 w-40 h-32 object-cover rounded-xl"
                />
              )}
            </div>
          ))}
        </section>

        <button
          type="button"
          onClick={handleSubmit}
          disabled={loading}
          className="w-full py-4 text-xl bg-purple-600 text-white rounded-xl hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
        >
          {loading ? "Processing..." : "Confirm Booking"}
        </button>
      </div>
    </div>
  );
};

export default Booking;
