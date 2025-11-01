
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Verified = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/login");
    }, 4000);
    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 text-center">
      <div className="bg-white shadow-md p-6 rounded-2xl max-w-sm">
        <h1 className="text-3xl font-bold text-green-600 mb-4">
           Email Verified!
        </h1>
        <p className="text-gray-700 mb-4">
          Your email has been successfully verified. <br />
          You can now log in to your account.
        </p>
        
      </div>
    </div>
  );
};

export default Verified;
