import React from "react";
import { Link, Outlet } from "react-router-dom";

const AdminDashboard = () => {
  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <div className="w-64 bg-gray-800 text-white p-4">
        <h1 className="text-xl font-bold mb-6">Admin Panel</h1>
        <ul>
          <li className="mb-4">
            <Link to="users">Users</Link>
          </li>
          <li className="mb-4">
            <Link to="vehicles">Vehicles</Link>
          </li>
          <li className="mb-4">
            <Link to="bookings">Bookings</Link>
          </li>
          <li className="mb-4">
            <Link to="payments">Payments</Link>
          </li>
        </ul>
      </div>

      {/* Main Content */}
      <div className="flex-1 bg-gray-100 p-6">
        <Outlet />
      </div>
    </div>
  );
};

export default AdminDashboard;
