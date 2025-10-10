import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { storeVehicles } from "./Stores"; // Import storeVehicles from Stores.jsx
import { popularVehicles } from "./PopularVehicles"; // Import popularVehicles array

const VehicleSearch = () => {
  const navigate = useNavigate();
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);

  // Helper to parse price string "Rs. 2,500/day" -> number 2500
  const parsePrice = (priceStr) => {
    if (!priceStr) return 0;
    return Number(priceStr.replace(/\D/g, ""));
  };

  useEffect(() => {
    const lowerQuery = query.toLowerCase().trim();

    if (!lowerQuery) {
      setResults([]);
      return;
    }

    const allStoreVehicles = Object.values(storeVehicles).flat();

    const filteredFromStores = allStoreVehicles.filter((v) => {
      const type = v.fuel ? "car" : "bike"; // crude type detection
      const price = parsePrice(v.price);
      return (
        v.name.toLowerCase().includes(lowerQuery) ||
        type.includes(lowerQuery) ||
        price.toString().includes(lowerQuery)
      );
    });

    const filteredPopular = popularVehicles.filter((v) => {
      const type = v.type.toLowerCase();
      const price = parsePrice(v.price);
      return (
        v.name.toLowerCase().includes(lowerQuery) ||
        type.includes(lowerQuery) ||
        price.toString().includes(lowerQuery)
      );
    });

    setResults([...filteredFromStores, ...filteredPopular]);
  }, [query]);

  const handleBookNow = (vehicle) => {
    localStorage.setItem("selectedVehicle", JSON.stringify(vehicle));
    navigate("/booking");
  };

  return (
    <section className="py-10 px-4 max-w-6xl mx-auto">
      <div className="flex gap-3 mb-8">
        <input
          type="text"
          placeholder="Search by name, type (car/bike) or price..."
          className="flex-1 px-5 py-3 rounded-full border border-gray-300 focus:ring-2 focus:ring-[#ff4f00] focus:outline-none"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </div>

      {results.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {results.map((v, idx) => (
            <div
              key={idx}
              className="bg-white rounded-xl shadow-md hover:shadow-lg border hover:border-[#ff4f00] flex flex-col justify-between"
            >
              <img
                src={v.image}
                alt={v.name}
                className="h-40 w-full object-cover rounded-t-xl"
              />
              <div className="p-4 text-center">
                <h3 className="text-lg font-semibold">{v.name}</h3>
                <p className="text-sm text-gray-600">
                  Type: {v.type || (v.fuel ? "Car" : "Bike")}
                </p>
                {v.fuel && (
                  <p className="text-sm text-gray-500">Fuel: {v.fuel}</p>
                )}
                <p className="text-[#ff4f00] font-semibold mt-2">{v.price}</p>
                <button
                  onClick={() => handleBookNow(v)}
                  className="mt-3 w-full bg-[#ff4f00] hover:bg-[#e03e00] text-white py-2 rounded-lg"
                >
                  Book Now
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : query ? (
        <p className="text-center text-gray-500 mt-10">No vehicles found.</p>
      ) : null}
    </section>
  );
};

export default VehicleSearch;
