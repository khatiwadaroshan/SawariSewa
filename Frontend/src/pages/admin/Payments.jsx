import React, { useEffect, useState } from "react";
import { instance } from "@/lib/axios";

const Payments = () => {
  const [payments, setPayments] = useState([]);

  useEffect(() => {
    const fetchPayments = async () => {
      try {
        const res = await instance.get("/admin/payments");
        setPayments(res.data.payments || []);
      } catch (err) {
        console.error("Error fetching payments:", err);
      }
    };
    fetchPayments();
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold mb-6 text-purple-700">
        💰 All Payments
      </h2>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border rounded-xl shadow-md">
          <thead className="bg-purple-100">
            <tr>
              <th className="border px-4 py-2">User</th>
              <th className="border px-4 py-2">Vehicle</th>
              <th className="border px-4 py-2">Amount</th>
              <th className="border px-4 py-2">Status</th>
              <th className="border px-4 py-2">Payment Date</th>
            </tr>
          </thead>
          <tbody>
            {payments.length > 0 ? (
              payments.map((p) => (
                <tr key={p._id} className="hover:bg-purple-50">
                  <td className="border px-4 py-2">{p.userName}</td>
                  <td className="border px-4 py-2">{p.vehicleName}</td>
                  <td className="border px-4 py-2">{p.amount}</td>
                  <td className="border px-4 py-2">{p.status}</td>
                  <td className="border px-4 py-2">
                    {new Date(p.paymentDate).toLocaleString()}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="text-center py-6 text-gray-500">
                  No payments found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Payments;
