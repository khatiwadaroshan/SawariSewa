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
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const res = await instance.get("/bookings/mybookings", {
          withCredentials: true,
        });
        // Adjust this depending on your backend response
        const data = res.data.data || res.data.bookings || [];
        setBookings(data);
        console.log("Bookings:", data);
      } catch (err) {
        console.error("Error fetching bookings:", err);
        setError("Failed to fetch bookings. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, []);

  if (loading)
    return <div className="text-gray-600 p-6">Loading your bookings...</div>;

  if (error)
    return <div className="text-red-500 p-6 font-semibold">{error}</div>;

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
                    {b.vehicleId?.name ? (
                      <a
                        href={`/vehicles/${b.vehicleId._id}`}
                        className="text-blue-500 hover:underline"
                      >
                        {b.vehicleId.name}
                      </a>
                    ) : (
                      "-"
                    )}
                  </td>
                  <td className="border px-4 py-2">
                    {formatDate(b.startDate)}
                  </td>
                  <td className="border px-4 py-2">{formatDate(b.endDate)}</td>
                  <td
                    className={`border px-4 py-2 capitalize font-semibold ${
                      b.status === "confirmed"
                        ? "text-green-600"
                        : b.status === "cancelled"
                        ? "text-red-600"
                        : "text-yellow-600"
                    }`}
                  >
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
