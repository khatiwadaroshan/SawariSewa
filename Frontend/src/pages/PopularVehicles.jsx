import { useAuthStore } from "@/Store/useAuthStore";
import React from "react";
import { useNavigate } from "react-router-dom";

const popularVehicles = [
  {
    id: 1,
    name: "Hyundai i20",
    image:
      "https://images.prismic.io/carwow/f70a0317-00e0-4f67-92f5-7181534a1051_hyundai-i20-2024-rhd-front34dynamic.jpg",
    price: 2500,
    fuel: "Petrol",
    type: "Car",
  },
  {
    id: 2,
    name: "Yamaha FZ",
    image:
      "https://i0.wp.com/motoworldnepal.com/wp-content/uploads/2022/06/panther-black.jpg",
    price: 1500,
    type: "Bike",
  },
  {
    id: 3,
    name: "Suzuki Baleno",
    image:
      "https://carpricesnepal.com/assets/img/product/product-66827c05a29e2baleno.webp",
    price: 2200,
    fuel: "Diesel",
    type: "Car",
  },
  {
    id: 4,
    name: "Royal Enfield Classic",
    image:
      "https://www.royalenfield.com/content/dam/royal-enfield/motorcycles/new-classic-350/studio-shots/360/emerald/01.png",
    price: 2000,
    type: "Bike",
  },
];

const PopularVehicles = () => {
  const navigate = useNavigate();
  const { authUser } = useAuthStore();

  const handleBookNow = (vehicle) => {
    if (!authUser) return navigate("/login");

    // Save selected vehicle to localStorage exactly as in Stores.jsx
    localStorage.setItem("selectedVehicle", JSON.stringify(vehicle));

    navigate("/booking");
  };

  return (
    <div className="bg-[#f1f5f9] py-16 px-4 sm:px-6 lg:px-12">
      <h2 className="text-4xl md:text-5xl font-extrabold text-center text-[#1e293b] mb-14">
        Popular <span className="text-[#ff4f00]">Vehicles</span>
      </h2>

      <div className="grid gap-10 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {popularVehicles.map((vehicle) => (
          <div
            key={vehicle.id}
            className="rounded-2xl bg-white shadow-md hover:shadow-lg border hover:border-[#ff4f00]"
          >
            <img
              src={vehicle.image}
              alt={vehicle.name}
              className="h-48 w-full object-cover rounded-t-2xl"
            />

            <div className="p-5">
              <div className="flex items-center justify-between text-sm text-gray-600 font-medium mb-1">
                <span className="text-[#1e293b]">{vehicle.type}</span>
                <span className="text-[#ff4f00] font-semibold">
                  {vehicle.price}
                </span>
              </div>

              <h3 className="text-lg font-semibold text-[#1e293b] mb-2">
                {vehicle.name}
              </h3>

              {/* Fuel type for Cars only */}
              {vehicle.type === "Car" && (
                <p className="text-sm text-gray-500 mb-3">
                  Fuel Type:{" "}
                  <span className="text-[#1e293b] font-medium">
                    {vehicle.fuel}
                  </span>
                </p>
              )}

              <button
                onClick={() => handleBookNow(vehicle)}
                className="w-full bg-[#ff4f00] hover:bg-[#e03e00] text-white py-2 rounded-lg text-sm font-medium"
              >
                Book Now
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PopularVehicles;

export { popularVehicles };
