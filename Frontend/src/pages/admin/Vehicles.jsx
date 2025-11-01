import React, { useEffect, useState } from "react";

import { instance } from "@/lib/axios";

const Vehicles = () => {
  const [vehicles, setVehicles] = useState([]);

  useEffect(() => {
    const fetchVehicles = async () => {
      try {
      const res = await instance.get("/admin/vehicles", {
          withCredentials: true,
        });
        setVehicles(res.data.Vehicles || []);
      } catch (err) {
        console.log(err);
        setVehicles([]);
      }
    };
    fetchVehicles();
  }, []);

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">All Vehicles</h2>
      <table className="min-w-full bg-white border">
        <thead>
          <tr>
            <th className="border px-4 py-2">Name</th>
            <th className="border px-4 py-2">Type</th>
            <th className="border px-4 py-2">Price</th>
          </tr>
        </thead>
        <tbody>
          {vehicles.length > 0 ? (
            vehicles.map((v) => (
              <tr key={v._id}>
                <td className="border px-4 py-2">{v.name}</td>
                <td className="border px-4 py-2">{v.type}</td>
                <td className="border px-4 py-2">{v.price}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="3" className="text-center py-4">
                No vehicles found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Vehicles;
