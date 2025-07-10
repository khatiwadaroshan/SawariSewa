import React, { useEffect, useState } from "react";
import { instance } from "@/lib/axios"; // your custom axios instance

const Individual = () => {
  const [vehicles, setVehicles] = useState([]);

  useEffect(() => {
    const fetchVehicles = async () => {
      try {
        const res = await instance.get("/vehicles"); // assumes /api/vehicles or similar
        setVehicles(res.data);
      } catch (error) {
        console.error("Failed to fetch vehicles:", error);
      }
    };

    fetchVehicles();
  }, []);

  return (
    <section className="max-w-7xl mx-auto p-6">
      <h1 className="text-4xl font-bold mb-10 text-center">
        Rent Vehicles from Individual Rentees
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {vehicles.map((v) => (
          <div
            key={v._id}
            className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition"
          >
            <img
              src={v.image}
              alt={v.name}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h2 className="text-xl font-semibold">{v.name}</h2>
              {v.type === "car" && <p>Fuel: {v.fueltype}</p>}
              <p className="text-[#ff4f00] font-bold">Rs. {v.price}/day</p>

              <div className="flex items-center gap-3 mt-3">
                <img
                  src={v.renteeid?.profilePhoto}
                  alt={v.renteeid?.name}
                  className="w-10 h-10 rounded-full border"
                />
                <div>
                  <p className="font-medium">{v.renteeid?.name}</p>
                  <p className="text-sm text-gray-600">{v.renteeid?.phone}</p>
                </div>
              </div>

              <p className="mt-2 text-sm text-gray-500">
                Availability: Coming Soon
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Individual;
