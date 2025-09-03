import React, { useEffect } from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";

const VerifyEmail = () => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    // Extract token from query string
    const params = new URLSearchParams(location.search);
    const token = params.get("token");

    if (token) {
      // Call backend verify endpoint
      window.location.href = `http://localhost:5001/api/auth/verify-email?token=${token}`;
    } else {
      // If no token → redirect to login
      navigate("/login");
    }
  }, [location, navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center flex-col">
      <h1 className="text-2xl font-bold text-green-600">
        Verifying your email...
      </h1>
      <p className="mt-2 text-gray-600">
        Please wait, you will be redirected shortly.
      </p>
      <p className="mt-4">
        If you are not redirected,{" "}
        <Link to="/login" className="text-blue-500 underline">
          click here
        </Link>
        .
      </p>
    </div>
  );
};

export default VerifyEmail;
