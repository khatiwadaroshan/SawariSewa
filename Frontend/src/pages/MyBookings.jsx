import React, { useEffect, useState } from "react";
import { instance } from "@/lib/axios";

const formatDate = (date) =>
  new Date(date).toLocaleDateString("en-GB", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

const MyBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const res = await instance.get("/booking/mybookings", {
          withCredentials: true,
        });
        setBookings(res.data.bookings || []);
      } catch (error) {
        console.error("Error fetching bookings:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchBookings();
  }, []);

  if (loading) return <div className="text-gray-600 p-6">Loading...</div>;

  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold mb-6 text-purple-700">
        🧾 My Bookings
      </h2>
      {bookings.length === 0 ? (
        <p className="text-gray-500">You have no bookings yet.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border rounded-xl shadow-md">
            <thead className="bg-purple-100">
              <tr>
                <th className="border px-4 py-2">Vehicle</th>
                <th className="border px-4 py-2">Start Date</th>
                <th className="border px-4 py-2">End Date</th>
                <th className="border px-4 py-2">Status</th>
              </tr>
            </thead>
            <tbody>
              {bookings.map((b) => (
                <tr key={b._id} className="hover:bg-purple-50">
                  <td className="border px-4 py-2">
                    {b.vehicleId?.name || "-"}
                  </td>
                  <td className="border px-4 py-2">
                    {formatDate(b.startDate)}
                  </td>
                  <td className="border px-4 py-2">{formatDate(b.endDate)}</td>
                  <td className="border px-4 py-2 capitalize">
                    {b.status || "Pending"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default MyBookings;
