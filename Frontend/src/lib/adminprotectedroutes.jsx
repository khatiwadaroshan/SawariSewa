import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export function ProtectedAdminRoute({ children }) {
  const navigate = useNavigate();
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAdmin = async () => {
      try {
        // Check if admin is authenticated by trying to fetch admin data
        await axios.get("http://localhost:5001/api/admin/users", {
          withCredentials: true,
        });
        setIsAdmin(true);
      // eslint-disable-next-line no-unused-vars
      } catch (error) {
        console.error("Not authenticated as admin");
        navigate("/admin/login");
      } finally {
        setLoading(false);
      }
    };

    checkAdmin();
  }, [navigate]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-xl">Loading...</div>
      </div>
    );
  }

  return isAdmin ? children : null;
}
