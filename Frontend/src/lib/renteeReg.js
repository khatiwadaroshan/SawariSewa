import { useAuthStore } from "@/Store/useAuthStore";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

export function IsRentee({ children }) {
  const navigate = useNavigate();
  const { authUser } = useAuthStore();

  useEffect(() => {
    if (authUser?.isRentee) {
      navigate("/registervehicle");
    }
  }, [authUser, navigate]);

  // While waiting for authUser or if not a rentee, just render children
  return authUser?.isRentee ? null : children;
}
