import React, { useState, useEffect } from "react";
import { useAuthStore } from "@/Store/useAuthStore";
import { FaEdit } from "react-icons/fa";
import axios from "axios";

const Profile = () => {
  const { authUser, setAuthUser } = useAuthStore();
  const [loading, setLoading] = useState(false);
  const [preview, setPreview] = useState(null);

  // Refresh authUser from localStorage in case of page reload
  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("authUser"));
    if (storedUser) setAuthUser(storedUser);
  }, [setAuthUser]);

  if (!authUser) {
    return (
      <p className="text-center mt-10">Please log in to view your profile.</p>
    );
  }

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Preview image immediately
    setPreview(URL.createObjectURL(file));

    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = async () => {
      try {
        setLoading(true);

        // Upload to backend
        const res = await axios.put(
          "http://localhost:5001/api/auth/updatepp",
          { profilePic: reader.result },
          {
            headers: { "Content-Type": "application/json" },
            withCredentials: true,
          }
        );

        // Update store and localStorage
        const updatedUser = { ...authUser, profilePic: res.data.url };
        setAuthUser(updatedUser);
        localStorage.setItem("authUser", JSON.stringify(updatedUser));

        setPreview(null);
        setLoading(false);
      } catch (error) {
        console.error("Upload failed", error);
        setLoading(false);
      }
    };
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
      <div className="bg-white shadow-md rounded-2xl p-6 w-80 text-center relative">
        {/* Profile Picture with edit */}
        <div className="relative w-24 h-24 mx-auto mb-4">
          <img
            src={
              preview ||
              authUser.profilePic ||
              "https://via.placeholder.com/150"
            }
            alt="Profile"
            className="w-24 h-24 rounded-full object-cover"
          />
          <label className="absolute bottom-0 right-0 bg-gray-200 rounded-full p-1 cursor-pointer hover:bg-gray-300">
            <FaEdit size={16} />
            <input
              type="file"
              className="hidden"
              accept="image/*"
              onChange={handleFileChange}
            />
          </label>
        </div>

        {loading && <p className="text-blue-500">Uploading...</p>}

        {/* Full Name */}
        <h2 className="text-xl font-semibold">{authUser.fullname}</h2>

        {/* Email */}
        <p className="text-gray-600">{authUser.email}</p>
      </div>
    </div>
  );
};

export default Profile;
