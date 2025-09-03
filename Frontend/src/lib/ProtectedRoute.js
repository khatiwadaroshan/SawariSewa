import { useAuthStore } from "@/Store/useAuthStore";
import { useNavigate } from "react-router-dom";


export function ProtectedRoute({ children }) {
  const navigate = useNavigate();
  const { authUser } = useAuthStore();

  return authUser ? children : (navigate("/login"));
}

export function ToHomePage({ children }) {
  const navigate = useNavigate();
  const { authUser } = useAuthStore();

  return authUser ? (navigate("/")) : children;
}
