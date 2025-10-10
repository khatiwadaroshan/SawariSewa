import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

const BookingConfirmation = () => {
  const navigate = useNavigate();
  const bookingData = JSON.parse(localStorage.getItem("bookingData"));
  const booking = bookingData?.booking;
  const vehicle = bookingData?.vehicle;

  if (!booking || !vehicle) return <p>No booking details available.</p>;

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-tr from-indigo-50 via-purple-100 to-pink-50 px-6 py-12">
      <div className="bg-white shadow-lg rounded-3xl max-w-3xl w-full p-8 space-y-6 border border-purple-200">
        <h1 className="text-4xl font-extrabold text-center text-purple-700 mb-6">
          ✅ Booking Confirmed
        </h1>

        <p>
          Vehicle: <strong>{vehicle.name}</strong>
        </p>
        <p>
          Price: <strong>{vehicle.price}</strong>
        </p>
        <p>Start Date: {new Date(booking.startDate).toLocaleDateString()}</p>
        <p>End Date: {new Date(booking.endDate).toLocaleDateString()}</p>
        <p>Citizenship Number:{booking.citizenshipNumber}</p>
        <p>Contact Number: {booking.contactNumber}</p>

        <Button
          className="w-full py-4 text-xl font-bold bg-purple-600 hover:bg-purple-700 text-white rounded-xl"
          onClick={() => navigate("/")}
        >
          Back to Home
        </Button>
      </div>
    </div>
  );
};

export default BookingConfirmation;
