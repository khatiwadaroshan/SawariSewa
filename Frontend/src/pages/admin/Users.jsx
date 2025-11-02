import React, { useEffect, useState } from "react";
import { instance } from "@/lib/axios";

const Users = () => {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [userDetails, setUserDetails] = useState(null);
  const [loading, setLoading] = useState(false);

  const getUsers = async () => {
    try {
      const res = await instance.get("/admin/users");
      setUsers(res.data.users || []);
    } catch (err) {
      console.error("Failed to fetch users:", err);
    }
  };

  const getUserDetails = async (userId) => {
    try {
      setLoading(true);
      const res = await instance.get(`/admin/users/${userId}`);
      setUserDetails(res.data);
      setSelectedUser(userId);
    } catch (err) {
      console.error("Failed to fetch user details:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getUsers();
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold mb-6 text-purple-700">👥 All Users</h2>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Users List */}
        <div className="bg-white rounded-xl shadow-md p-4 max-h-[600px] overflow-y-auto">
          <h3 className="text-xl font-semibold mb-4">Users List</h3>
          <table className="min-w-full">
            <thead className="bg-purple-100 sticky top-0">
              <tr>
                <th className="border px-4 py-2 text-left">Name</th>
                <th className="border px-4 py-2 text-left">Email</th>
                <th className="border px-4 py-2 text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.length > 0 ? (
                users.map((u) => (
                  <tr
                    key={u._id}
                    className={`hover:bg-purple-50 ${
                      selectedUser === u._id ? "bg-purple-100" : ""
                    }`}
                  >
                    <td className="border px-4 py-2">{u.fullname}</td>
                    <td className="border px-4 py-2">{u.email}</td>
                    <td className="border px-4 py-2 text-center">
                      <button
                        onClick={() => getUserDetails(u._id)}
                        className="bg-purple-600 text-white px-3 py-1 rounded hover:bg-purple-700"
                      >
                        View Details
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="3" className="text-center py-4 text-gray-500">
                    No users found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* User Details Panel */}
        <div className="bg-white rounded-xl shadow-md p-6">
          <h3 className="text-xl font-semibold mb-4">User Details</h3>

          {loading ? (
            <div className="text-center py-10">Loading...</div>
          ) : userDetails ? (
            <div className="space-y-6">
              {/* User Info */}
              <div className="border-b pb-4">
                <h4 className="font-semibold text-lg mb-2">
                  Personal Information
                </h4>
                <div className="space-y-2">
                  <p>
                    <span className="font-medium">Name:</span>{" "}
                    {userDetails.user.fullname}
                  </p>
                  <p>
                    <span className="font-medium">Email:</span>{" "}
                    {userDetails.user.email}
                  </p>
                  <p>
                    <span className="font-medium">Verified:</span>{" "}
                    {userDetails.user.isVerified ? "✅ Yes" : "❌ No"}
                  </p>
                  <p>
                    <span className="font-medium">Is Rentee:</span>{" "}
                    {userDetails.user.isRentee ? "Yes" : "No"}
                  </p>
                  <p>
                    <span className="font-medium">Joined:</span>{" "}
                    {new Date(userDetails.user.createdAt).toLocaleDateString()}
                  </p>
                </div>
              </div>

              {/* Bookings */}
              <div className="border-b pb-4">
                <h4 className="font-semibold text-lg mb-2">
                  Bookings ({userDetails.bookings.length})
                </h4>
                {userDetails.bookings.length > 0 ? (
                  <div className="space-y-2 max-h-40 overflow-y-auto">
                    {userDetails.bookings.map((booking) => (
                      <div key={booking._id} className="bg-gray-50 p-2 rounded">
                        <p className="text-sm">
                          <span className="font-medium">
                            {booking.vehicleId?.name}
                          </span>{" "}
                          - {booking.status}
                        </p>
                        <p className="text-xs text-gray-600">
                          {new Date(booking.startDate).toLocaleDateString()} to{" "}
                          {new Date(booking.endDate).toLocaleDateString()}
                        </p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-500 text-sm">No bookings yet</p>
                )}
              </div>

              {/* Payments */}
              <div>
                <h4 className="font-semibold text-lg mb-2">
                  Payments ({userDetails.payments.length})
                </h4>
                {userDetails.payments.length > 0 ? (
                  <div className="space-y-2 max-h-40 overflow-y-auto">
                    {userDetails.payments.map((payment) => (
                      <div key={payment._id} className="bg-gray-50 p-2 rounded">
                        <p className="text-sm">
                          <span className="font-medium">
                            Rs. {payment.amount}
                          </span>{" "}
                          - {payment.status}
                        </p>
                        <p className="text-xs text-gray-600">
                          {new Date(payment.paymentDate).toLocaleDateString()}
                        </p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-500 text-sm">No payments yet</p>
                )}
              </div>
            </div>
          ) : (
            <div className="text-center py-10 text-gray-500">
              Select a user to view details
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Users;
