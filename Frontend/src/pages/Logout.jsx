import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "@/Store/useAuthStore";
import { toast } from "sonner";

const Logout = () => {
  const navigate = useNavigate();


  useEffect(() => {
    // Clear user from Zustand store
    useAuthStore.setState({ authUser: null });

    
    toast.success("Logged out successfully!");

    
    const timer = setTimeout(() => {
      navigate("/login");
    }, 1000);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="flex items-center justify-center min-h-screen">
      <p className="text-gray-600">Logging out...</p>
    </div>
  );
};

export default Logout;
