import React, { useEffect, useState } from "react";
import { instance } from "@/lib/axios";

// Helper to format dates
const formatDate = (d) => {
  if (!d) return "-";
  return new Date(d).toLocaleDateString("en-GB", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
};

const Bookings = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const res = await instance.get("/admin/bookings");
        setBookings(res.data.bookings || []);
      } catch (err) {
        console.error("Error fetching bookings:", err);
        setBookings([]);
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold mb-6 text-purple-700">
        📑 All Bookings
      </h2>

      {loading ? (
        <div className="text-gray-500">Loading...</div>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border rounded-xl shadow-md">
            <thead className="bg-purple-100">
              <tr>
                <th className="border px-4 py-2">Start Date</th>
                <th className="border px-4 py-2">End Date</th>
                <th className="border px-4 py-2">Contact</th>
                <th className="border px-4 py-2">Citizenship No.</th>
                <th className="border px-4 py-2">Documents</th>
              </tr>
            </thead>
            <tbody>
              {bookings.length > 0 ? (
                bookings.map((b) => (
                  <tr key={b._id} className="hover:bg-purple-50">
                    <td className="border px-4 py-2">
                      {formatDate(b.startDate)}
                    </td>
                    <td className="border px-4 py-2">
                      {formatDate(b.endDate)}
                    </td>
                    <td className="border px-4 py-2">
                      {b.contactNumber || "-"}
                    </td>
                    <td className="border px-4 py-2">
                      {b.citizenshipNumber || "-"}
                    </td>
                    <td className="border px-4 py-2 space-x-2">
                      {b.citizenshipFrontPhoto && (
                        <a
                          href={b.citizenshipFrontPhoto}
                          target="_blank"
                          rel="noreferrer"
                          className="text-blue-600 underline"
                        >
                          Front
                        </a>
                      )}
                      {b.citizenshipBackPhoto && (
                        <a
                          href={b.citizenshipBackPhoto}
                          target="_blank"
                          rel="noreferrer"
                          className="text-blue-600 underline"
                        >
                          Back
                        </a>
                      )}
                      {b.licensePhoto && (
                        <a
                          href={b.licensePhoto}
                          target="_blank"
                          rel="noreferrer"
                          className="text-blue-600 underline"
                        >
                          License
                        </a>
                      )}
                      {b.selfieWithCitizenship && (
                        <a
                          href={b.selfieWithCitizenship}
                          target="_blank"
                          rel="noreferrer"
                          className="text-blue-600 underline"
                        >
                          Selfie
                        </a>
                      )}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="text-center py-6 text-gray-500">
                    No bookings found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Bookings;
