import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const Payment = () => {
  const navigate = useNavigate();
  const formRef = useRef(null);
  const [bookingData, setBookingData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("eSewa");

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("bookingData"));
    if (!data || !data.booking) {
      toast.error("No booking data found. Please book a vehicle first.");
      navigate("/");
      return;
    }
    setBookingData(data);
  }, [navigate]);

  const handlePayment = async () => {
    if (!bookingData) return;

    setLoading(true);

    try {
      const response = await fetch(
        "http://localhost:5001/api/payments/initiate",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify({
            bookingId: bookingData.booking._id,
            amount: bookingData.booking.totalPrice,
            paymentMethod: paymentMethod,
          }),
        }
      );

      const text = await response.text();
      let result;
      try {
        result = JSON.parse(text);
      } catch {
        console.error("Invalid JSON response:", text);
        toast.error("Payment initiation failed.");
        setLoading(false);
        return;
      }

      if (result.success) {
        if (paymentMethod === "eSewa") {
          // Create form dynamically and submit to eSewa
          const form = formRef.current;
          form.innerHTML = ""; // Clear any existing content
          form.action = result.esewaUrl;
          form.method = "POST";

          // Add all eSewa parameters as hidden inputs
          const params = result.esewaParams;
          Object.keys(params).forEach((key) => {
            const input = document.createElement("input");
            input.type = "hidden";
            input.name = key;
            input.value = params[key];
            form.appendChild(input);
          });

          // Submit the form to redirect to eSewa
          form.submit();
        } else if (paymentMethod === "Cash") {
          toast.success("Booking confirmed! Please pay cash at pickup.");
          localStorage.removeItem("bookingData");
          navigate("/");
        }
      } else {
        toast.error(result.message || "Payment initiation failed");
        setLoading(false);
      }
    } catch (err) {
      console.error("Payment error:", err);
      toast.error("Payment failed. Please try again.");
      setLoading(false);
    }
  };


  if (!bookingData) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-xl">Loading...</p>
      </div>
    );
  }

  const { booking, vehicle } = bookingData;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 px-6 py-12">
      <div className="bg-white shadow-2xl rounded-3xl max-w-2xl w-full p-10 space-y-8">
        <h1 className="text-4xl font-bold text-center text-indigo-700 mb-6">
          💳 Payment
        </h1>

        {/* Booking Summary */}
        <div className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-2xl p-6 space-y-3">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            Booking Summary
          </h2>

          <div className="flex justify-between">
            <span className="text-gray-600">Vehicle:</span>
            <span className="font-semibold text-gray-800">{vehicle.name}</span>
          </div>

          <div className="flex justify-between">
            <span className="text-gray-600">Type:</span>
            <span className="font-semibold text-gray-800 capitalize">
              {vehicle.type}
            </span>
          </div>

          <div className="flex justify-between">
            <span className="text-gray-600">Start Date:</span>
            <span className="font-semibold text-gray-800">
              {new Date(booking.startDate).toLocaleDateString()}
            </span>
          </div>

          <div className="flex justify-between">
            <span className="text-gray-600">End Date:</span>
            <span className="font-semibold text-gray-800">
              {new Date(booking.endDate).toLocaleDateString()}
            </span>
          </div>

          <div className="flex justify-between pt-4 border-t-2 border-gray-300">
            <span className="text-xl font-bold text-gray-800">
              Total Amount:
            </span>
            <span className="text-xl font-bold text-green-600">
              Rs. {booking.totalPrice}
            </span>
          </div>
        </div>

        {/* Payment Method Selection */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold text-gray-800">
            Select Payment Method
          </h2>

          <div className="space-y-3">
            {/* eSewa Option */}
            <label className="flex items-center p-4 border-2 rounded-xl cursor-pointer hover:bg-indigo-50 transition-colors">
              <input
                type="radio"
                name="paymentMethod"
                value="eSewa"
                checked={paymentMethod === "eSewa"}
                onChange={(e) => setPaymentMethod(e.target.value)}
                className="w-5 h-5 text-indigo-600"
              />
              <div className="ml-4 flex items-center justify-between w-full">
                <div>
                  <p className="font-semibold text-gray-800">eSewa</p>
                  <p className="text-sm text-gray-600">
                    Pay securely with eSewa
                  </p>
                </div>
                <img
                  src="https://esewa.com.np/common/images/esewa_logo.png"
                  alt="eSewa"
                  className="h-8"
                />
              </div>
            </label>

            {/* Cash Option */}
            <label className="flex items-center p-4 border-2 rounded-xl cursor-pointer hover:bg-indigo-50 transition-colors">
              <input
                type="radio"
                name="paymentMethod"
                value="Cash"
                checked={paymentMethod === "Cash"}
                onChange={(e) => setPaymentMethod(e.target.value)}
                className="w-5 h-5 text-indigo-600"
              />
              <div className="ml-4">
                <p className="font-semibold text-gray-800">Cash</p>
                <p className="text-sm text-gray-600">Pay at pickup</p>
              </div>
            </label>
          </div>
        </div>

        {/* Payment Button */}
        <button
          onClick={handlePayment}
          disabled={loading}
          className="w-full py-4 text-xl font-semibold bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl hover:from-indigo-700 hover:to-purple-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
        >
          {loading ? "Processing..." : "Proceed to Payment"}
        </button>

        {/* Hidden form for eSewa submission */}
        <form ref={formRef} style={{ display: "none" }}></form>
      </div>
    </div>
  );
};

export default Payment;
