import React from "react";
import { Link } from "react-router-dom";

export default function PaymentFailed() {
  return (
    <div className="p-6 text-center">
      <h1 className="text-3xl font-bold text-red-600 mb-4">Payment Failed!</h1>
      <p className="mb-4">Please try again.</p>
      <Link
        to="/"
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      >
        Go Back to Home
      </Link>
    </div>
  );
}
