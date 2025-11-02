import React, { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { toast } from "sonner";

const PaymentSuccess = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [verifying, setVerifying] = useState(true);
  const [paymentDetails, setPaymentDetails] = useState(null);

  useEffect(() => {
    const verifyPayment = async () => {
      const data = searchParams.get("data");

      if (!data) {
        toast.error("Invalid payment response");
        navigate("/");
        return;
      }

      try {
        const response = await fetch(
          `http://localhost:5001/api/payments/verify-esewa?data=${encodeURIComponent(
            data
          )}`,
          {
            method: "GET",
            credentials: "include",
          }
        );

        const result = await response.json();

        if (result.success) {
          setPaymentDetails(result.payment);
          toast.success("Payment verified successfully!");

          // Clear booking data from localStorage
          localStorage.removeItem("bookingData");
          localStorage.removeItem("paymentId");
        } else {
          toast.error(result.message || "Payment verification failed");
          setTimeout(() => navigate("/"), 3000);
        }
      } catch (error) {
        console.error("Verification error:", error);
        toast.error("Payment verification failed");
        setTimeout(() => navigate("/"), 3000);
      } finally {
        setVerifying(false);
      }
    };

    verifyPayment();
  }, [searchParams, navigate]);

  if (verifying) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 to-blue-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-green-500 mx-auto mb-4"></div>
          <p className="text-xl font-semibold text-gray-700">
            Verifying payment...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 to-blue-50 px-6 py-12">
      <div className="bg-white shadow-2xl rounded-3xl max-w-2xl w-full p-10 text-center space-y-6">
        {/* Success Icon */}
        <div className="flex justify-center">
          <div className="bg-green-100 rounded-full p-6">
            <svg
              className="w-20 h-20 text-green-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>
        </div>

        <h1 className="text-4xl font-bold text-green-600">
          Payment Successful!
        </h1>

        <p className="text-xl text-gray-700">
          Your booking has been confirmed successfully.
        </p>

        {paymentDetails && (
          <div className="bg-gray-50 rounded-2xl p-6 space-y-3 text-left">
            <div className="flex justify-between">
              <span className="text-gray-600">Payment ID:</span>
              <span className="font-semibold text-gray-800">
                {paymentDetails._id}
              </span>
            </div>

            <div className="flex justify-between">
              <span className="text-gray-600">Transaction ID:</span>
              <span className="font-semibold text-gray-800">
                {paymentDetails.transactionId}
              </span>
            </div>

            <div className="flex justify-between">
              <span className="text-gray-600">Amount:</span>
              <span className="font-semibold text-green-600">
                Rs. {paymentDetails.amount}
              </span>
            </div>

            <div className="flex justify-between">
              <span className="text-gray-600">Status:</span>
              <span className="font-semibold text-green-600 capitalize">
                {paymentDetails.status}
              </span>
            </div>

            <div className="flex justify-between">
              <span className="text-gray-600">Date:</span>
              <span className="font-semibold text-gray-800">
                {new Date(paymentDetails.paymentDate).toLocaleString()}
              </span>
            </div>
          </div>
        )}

        <div className="space-y-3 pt-6">
          <button
            onClick={() => navigate("/mybookings")}
            className="w-full py-3 bg-indigo-600 text-white font-semibold rounded-xl hover:bg-indigo-700 transition-colors"
          >
            View My Bookings
          </button>

          <button
            onClick={() => navigate("/")}
            className="w-full py-3 bg-gray-200 text-gray-700 font-semibold rounded-xl hover:bg-gray-300 transition-colors"
          >
            Back to Home
          </button>
        </div>
      </div>
    </div>
  );
};

export default PaymentSuccess;
