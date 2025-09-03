// BookingConfirmation.jsx
import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

const BookingConfirmation = () => {
  const { state } = useLocation();
  const navigate = useNavigate();

  const booking = state?.booking;

  if (!booking) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>No booking details available.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-tr from-indigo-50 via-purple-100 to-pink-50 flex flex-col items-center justify-center px-6 py-12">
      <div className="bg-white shadow-lg rounded-3xl max-w-4xl w-full p-10 space-y-6 border border-purple-200">
        <h1 className="text-4xl font-extrabold text-center text-purple-700 mb-6">
          ✅ Booking Confirmed
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <p>
            <span className="font-semibold">Start Date:</span>{" "}
            {new Date(booking.startDate).toLocaleDateString()}
          </p>
          <p>
            <span className="font-semibold">End Date:</span>{" "}
            {new Date(booking.endDate).toLocaleDateString()}
          </p>
          
          
          <p>
            <span className="font-semibold">Contact Number:</span>{" "}
            {booking.contactNumber}
          </p>
        </div>

        <h2 className="text-2xl font-semibold text-purple-800 border-b border-purple-300 pb-2 mt-6">
          Uploaded Documents
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-4">
          <div>
            <p className="font-medium text-purple-900 mb-2">
              Citizenship Photo
            </p>
            <img
              src={booking.citizenshipPhoto}
              alt="Citizenship"
              className="rounded-xl w-full h-36 object-cover border border-purple-300"
            />
          </div>

          <div>
            <p className="font-medium text-purple-900 mb-2">
              Citizenship Front
            </p>
            <img
              src={booking.citizenshipFrontPhoto}
              alt="Citizenship Front"
              className="rounded-xl w-full h-36 object-cover border border-purple-300"
            />
          </div>

          <div>
            <p className="font-medium text-purple-900 mb-2">Citizenship Back</p>
            <img
              src={booking.citizenshipBackPhoto}
              alt="Citizenship Back"
              className="rounded-xl w-full h-36 object-cover border border-purple-300"
            />
          </div>

          <div>
            <p className="font-medium text-purple-900 mb-2">License Photo</p>
            <img
              src={booking.licensePhoto}
              alt="License"
              className="rounded-xl w-full h-36 object-cover border border-purple-300"
            />
          </div>

          <div className="md:col-span-2">
            <p className="font-medium text-purple-900 mb-2">
              Selfie With Citizenship
            </p>
            <img
              src={booking.selfieWithCitizenship}
              alt="Selfie With Citizenship"
              className="rounded-xl w-full h-36 object-cover border border-purple-300"
            />
          </div>
        </div>

        <Button
          className="mt-8 w-full py-4 text-xl font-bold bg-purple-600 hover:bg-purple-700 text-white rounded-2xl"
          onClick={() => navigate("/")}
        >
          Back to Home
        </Button>
      </div>
    </div>
  );
};

export default BookingConfirmation;
