import React from "react";
import { useNavigate } from "react-router-dom";

const PaymentFailure = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-red-50 to-orange-50 px-6 py-12">
      <div className="bg-white shadow-2xl rounded-3xl max-w-2xl w-full p-10 text-center space-y-6">
        {/* Failure Icon */}
        <div className="flex justify-center">
          <div className="bg-red-100 rounded-full p-6">
            <svg
              className="w-20 h-20 text-red-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </div>
        </div>

        <h1 className="text-4xl font-bold text-red-600">Payment Failed!</h1>

        <p className="text-xl text-gray-700">
          Unfortunately, your payment could not be processed.
        </p>

        <div className="bg-gray-50 rounded-2xl p-6">
          <p className="text-gray-600">
            Please try again or contact support if the problem persists.
          </p>
        </div>

        <div className="space-y-3 pt-6">
          <button
            onClick={() => navigate("/payment")}
            className="w-full py-3 bg-indigo-600 text-white font-semibold rounded-xl hover:bg-indigo-700 transition-colors"
          >
            Try Again
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

export default PaymentFailure;
