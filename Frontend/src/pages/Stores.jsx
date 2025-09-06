import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

// Sample vehicle data with image URLs, fuel, and price
const storeVehicles = {
  "RAKESH Car Hub": [
    {
      name: "Hyundai i20",
      fuel: "Petrol",
      price: "Rs. 2,500/day",
      image:
        "https://laxmihyundai.com/assets/frontend/images/cars/i20/highlight/carousel/5.jpg",
    },
    {
      name: "Kia Seltos",
      fuel: "Petrol",
      price: "Rs. 3,000/day",
      image:
        "https://www.toyota.com.np/content/dam/nepal/price-list/toyota-rush.jpg",
    },
    {
      name: "Toyota Corolla",
      fuel: "Diesel",
      price: "Rs. 2,800/day",
      image:
        "https://suzuki.com.np/uploads/product/thumb/bd5ea4fb816428a1025729cda3fec51f.png",
    },
    {
      name: "Tata Nexon",
      fuel: "Petrol",
      price: "Rs. 2,400/day",
      image: "/vehicles/nexon.jpg",
    },

    {
      name: "Maruti Swift",
      image: "/vehicles/swift.jpg",
    },
    {
      name: "Honda Amaze",
      image: "/vehicles/amaze.jpg",
    },
    {
      name: "Nissan Magnite",
      image: "/vehicles/magnite.jpg",
    },
    {
      name: "Volkswagen Polo",
      image: "/vehicles/polo.jpg",
    },
  ],
  "SITA NARAYAN Car Rentals": [
    {
      name: "Honda City",
      fuel: "Petrol",
      price: "Rs. 2,700/day",
      image: "/vehicles/city.jpg",
    },
    {
      name: "Ford EcoSport",
      fuel: "Diesel",
      price: "Rs. 2,600/day",
      image: "/vehicles/ecosport.jpg",
    },
    {
      name: "MG Hector",
      fuel: "Petrol",
      price: "Rs. 3,200/day",
      image: "/vehicles/hector.jpg",
    },
    {
      name: "Renault Kwid",
      fuel: "Petrol",
      price: "Rs. 1,800/day",
      image: "/vehicles/kwid.jpg",
    },
  ],
  "DANZER Bike Zone": [
    {
      name: "Yamaha FZ",
      fuel: "Petrol",
      price: "Rs. 1,500/day",
      image: "/vehicles/fz.jpg",
    },
    {
      name: "Bajaj Pulsar",
      fuel: "Petrol",
      price: "Rs. 1,400/day",
      image: "/vehicles/pulsar.jpg",
    },
    {
      name: "TVS Apache",
      fuel: "Petrol",
      price: "Rs. 1,600/day",
      image: "/vehicles/apache.jpg",
    },
    {
      name: "Honda Shine",
      fuel: "Petrol",
      price: "Rs. 1,300/day",
      image: "/vehicles/shine.jpg",
    },
  ],
  " BIKASH Bike Pro": [
    {
      name: "Royal Enfield Classic",
      fuel: "Petrol",
      price: "Rs. 2,000/day",
      image: "/vehicles/classic.jpg",
    },
    {
      name: "KTM Duke",
      fuel: "Petrol",
      price: "Rs. 2,500/day",
      image: "/vehicles/duke.jpg",
    },
    {
      name: "Hero Splendor",
      fuel: "Petrol",
      price: "Rs. 1,200/day",
      image: "/vehicles/splendor.jpg",
    },
    {
      name: "Yamaha MT-15",
      fuel: "Petrol",
      price: "Rs. 2,200/day",
      image: "/vehicles/mt15.jpg",
    },
  ],
};

const stores = Object.keys(storeVehicles);

const Stores = () => {
  const [selectedStore, setSelectedStore] = useState(null);
  const navigate = useNavigate();

  

  const user = {
    _id: "",
    name: "",
  };

  const handleBookNow = (store, vehicleIndex) => {
    const vehicle = storeVehicles[store][vehicleIndex];

    if (!user || !user._id) {
      navigate("/booking");
      return;
    }

    // Navigate to booking page passing store name and vehicle index
    navigate("/booking", { state: { vehicle, user } });
  };

  return (
    <section className="bg-gradient-to-b from-[#949391] to-[#ffece5] py-20 px-6 sm:px-10">
      <div className="max-w-5xl mx-auto text-center mb-14">
        <h2 className="text-4xl sm:text-5xl font-extrabold text-[#1e293b] mb-4">
          Explore Our Top Rental Stores
        </h2>
        <p className="text-lg sm:text-xl text-[#475569] max-w-2xl mx-auto">
          Trusted providers offering premium cars and bikes at your convenience.
        </p>
      </div>

      {/* Store Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 max-w-4xl mx-auto mb-16">
        {stores.map((store, index) => (
          <div
            key={index}
            onClick={() => setSelectedStore(store)}
            className="cursor-pointer group relative bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20 shadow-md transition-all duration-300 hover:shadow-2xl hover:scale-105 overflow-hidden"
          >
            <div className="absolute inset-0 rounded-2xl border-2 border-transparent group-hover:border-[#ff4f00] group-hover:shadow-[0_0_30px_#ff4f00] transition-all duration-300 z-0"></div>
            <div className="relative z-10 text-center">
              <h3 className="text-2xl font-bold text-[#ff4f00] tracking-wide">
                {store.trim()}
              </h3>
            </div>
          </div>
        ))}
      </div>

      {/* Vehicles Grid */}
      {selectedStore && (
        <div className="max-w-6xl mx-auto text-center">
          <h3 className="text-3xl font-bold text-[#1e293b] mb-6">
            Vehicles from {selectedStore.trim()}
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 px-4">
            {storeVehicles[selectedStore].map((vehicle, idx) => (
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
                  <p className="text-sm text-[#475569] mb-1">
                    Fuel:{" "}
                    <span className="text-[#1e293b] font-medium">
                      {vehicle.fuel || "N/A"}
                    </span>
                  </p>
                  <p className="text-sm text-[#ff4f00] font-semibold mb-4">
                    {vehicle.price || "Price not available"}
                  </p>
                  <button
                    onClick={() => handleBookNow(selectedStore, idx)}
                    className="w-full bg-[#ff4f00] hover:bg-[#e03e00] text-white py-2 rounded-lg text-sm font-medium transition duration-200"
                  >
                    Book Now
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </section>
  );
};

export default Stores;
