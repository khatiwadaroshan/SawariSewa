import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import PopularVehicles from "./PopularVehicles";
import Stores from "./Stores";
import { storeVehicles } from "./Stores";
import { popularVehicles } from "./PopularVehicles";

export const Header = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  // Combine all vehicles from popular and storeVehicles
  const allStoreVehicles = Object.values(storeVehicles).flat();
  const allVehicles = [...popularVehicles, ...allStoreVehicles];

  // Smart search function
  const filteredVehicles = allVehicles.filter((vehicle) => {
    const term = searchTerm.toLowerCase();

    // Match by name
    const nameMatch = vehicle.name.toLowerCase().includes(term);

    // Match by type
    const typeMatch = vehicle.type?.toLowerCase().includes(term);

    // Match by price (numeric)
    const priceNumber = vehicle.price
      ? parseInt(vehicle.price.replace(/\D/g, "")) // remove "Rs." and "/day"
      : 0;
    const searchNumber = parseInt(term);
    const priceMatch =
      !isNaN(searchNumber) &&
      priceNumber >= searchNumber - 200 &&
      priceNumber <= searchNumber + 200; // near the input number ±200

    return nameMatch || typeMatch || priceMatch;
  });

  const handleBookNow = (vehicle) => {
    const user = JSON.parse(localStorage.getItem("user")); // get current user

    if (!user) {
      // If not logged in, redirect to login page
      alert("Please login first to book a vehicle.");
      navigate("/login");
      return;
    }

    // Save selected vehicle to localStorage (as before)
    localStorage.setItem("selectedVehicle", JSON.stringify(vehicle));
    navigate("/booking");
  };

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-[#fefefe] via-[#fffaf4] to-[#ffece5] py-20 px-6 sm:px-10">
      <div className="max-w-5xl mx-auto text-center">
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-[#1e293b] tracking-tight leading-tight animate-fade-in-up">
          Search, Book & <br className="hidden sm:inline-block" />
          <span className="text-[#ff4f00]">Ride Your Perfect Vehicle</span>
        </h1>

        <p className="text-[#475569] mt-6 text-lg sm:text-xl max-w-2xl mx-auto animate-fade-in-up delay-200">
          Experience seamless vehicle rental like never before. Book your next
          car or bike instantly fast, flexible, and reliable.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mt-10 max-w-2xl mx-auto animate-fade-in-up delay-300">
          <input
            type="text"
            placeholder="Search by name, type, or price..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-5 py-3 rounded-full border border-gray-300 shadow-sm focus:ring-2 focus:ring-[#ff4f00] focus:outline-none transition-all text-[#1e293b] placeholder:text-[#94a3b8]"
          />
          <Button
            onClick={() => {}}
            className="rounded-full px-6 py-3 bg-[#ff4f00] hover:bg-[#e03e00] text-white transition duration-300"
          >
            <Search className="h-5 w-5" />
          </Button>
        </div>

        {/* Display filtered vehicles */}
        {searchTerm && filteredVehicles.length > 0 && (
          <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 px-4">
            {filteredVehicles.map((vehicle, idx) => (
              <div
                key={idx}
                className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition duration-300 flex flex-col justify-between"
              >
                <img
                  src={vehicle.image}
                  alt={vehicle.name}
                  className="w-full h-40 object-cover"
                />
                <div className="p-4 text-center">
                  <h4 className="text-lg font-semibold text-[#1e293b] mb-1">
                    {vehicle.name}
                  </h4>
                  {vehicle.fuel && (
                    <p className="text-sm text-[#475569] mb-1">
                      Fuel:{" "}
                      <span className="text-[#1e293b] font-medium">
                        {vehicle.fuel}
                      </span>
                    </p>
                  )}
                  <p className="text-sm text-[#ff4f00] font-semibold mb-4">
                    {vehicle.price || "Price not available"}
                  </p>
                  <button
                    onClick={() => handleBookNow(vehicle)}
                    className="w-full bg-[#ff4f00] hover:bg-[#e03e00] text-white py-2 rounded-lg text-sm font-medium transition duration-200"
                  >
                    Book Now
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
        {searchTerm && filteredVehicles.length === 0 && (
          <p className="mt-6 text-gray-600">
            No vehicles found for "{searchTerm}"
          </p>
        )}
      </div>
    </section>
  );
};
