import React from "react";
import { useAuthStore } from "@/Store/useAuthStore";

const Profile = () => {
  const { authUser } = useAuthStore(); // assuming your user info is stored here

  if (!authUser) {
    return (
      <p className="text-center mt-10">Please log in to view your profile.</p>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
      <div className="bg-white shadow-md rounded-2xl p-6 w-80 text-center">
        {/* Profile Picture */}
        <img
          src={authUser.profilePic || "utl name/150"}
          alt="Profile"
          className="w-24 h-24 rounded-full mx-auto mb-4 object-cover"
        />

        {/* Full Name */}
        <h2 className="text-xl font-semibold">{authUser.fullname}</h2>

        {/* Email */}
        <p className="text-gray-600">{authUser.email}</p>
      </div>
    </div>
  );
};

export default Profile;
