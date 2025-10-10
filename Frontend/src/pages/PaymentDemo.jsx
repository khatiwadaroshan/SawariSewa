import React from "react";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

const PaymentDemo = () => {
  const navigate = useNavigate();
  const bookingData = JSON.parse(localStorage.getItem("bookingData"));
  const booking = bookingData?.booking;
  const vehicle = bookingData?.vehicle;

  if (!booking || !vehicle) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-xl text-gray-700">
          No booking or vehicle data available.
        </p>
      </div>
    );
  }

  const handlePayment = (success) => {
    if (success) {
      toast.success("Payment Successful ✅");
      navigate("/bookingconfirmation");
    } else {
      toast.error("Payment Failed ❌");
      navigate("/booking");
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-tr from-indigo-50 via-purple-100 to-pink-50 p-6">
      <div className="bg-white shadow-xl rounded-3xl p-8 max-w-md w-full text-center border border-purple-200">
        <h1 className="text-3xl font-bold mb-6 text-purple-700">
          💳 Payment Gateway
        </h1>

        <img
          src={vehicle.image}
          alt={vehicle.name}
          className="w-full h-48 object-cover rounded-xl mb-4"
        />
        <h2 className="text-2xl font-semibold mb-2">{vehicle.name}</h2>
        <p className="text-lg text-gray-600 mb-4">{vehicle.type}</p>
        <p className="text-2xl font-bold text-[#ff4f00] mb-6">
          {vehicle.price}
        </p>

        <div className="flex justify-center gap-4">
          <button
            onClick={() => handlePayment(true)}
            className="px-6 py-3 bg-green-500 text-white rounded-xl hover:bg-green-600 transition-all font-semibold"
          >
            Pay Now
          </button>
          <button
            onClick={() => handlePayment(false)}
            className="px-6 py-3 bg-red-500 text-white rounded-xl hover:bg-red-600 transition-all font-semibold"
          >
            Cancel
          </button>
        </div>

        <p className="mt-6 text-gray-500 text-sm">
          This is a demo payment. On real integration, the payment gateway will
          handle transactions securely.
        </p>
      </div>
    </div>
  );
};

export default PaymentDemo;
