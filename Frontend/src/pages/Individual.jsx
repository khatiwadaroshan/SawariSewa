import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { instance } from "@/lib/axios";

const Individual = () => {
  const [vehicles, setVehicles] = useState([]);
  const navigate = useNavigate();
  const location = useLocation();

  const renteeId = localStorage.getItem("renteeId");

  // Fetch vehicles for logged-in rentee
  const fetchVehicles = async () => {
    try {
      const res = await instance.get("/vehicles");
      const renteeVehicles = res.data.filter(
        (v) => v.renteeid._id.toString() === renteeId
      );
      setVehicles(renteeVehicles);
    } catch (error) {
      console.error(error);
      toast.error("Failed to fetch vehicles");
    }
  };

  useEffect(() => {
    fetchVehicles();
  }, []);

  // Add newly registered vehicle immediately
  useEffect(() => {
    if (location.state?.newVehicle) {
      setVehicles((prev) => [location.state.newVehicle, ...prev]);
      window.history.replaceState({}, document.title);
    }
  }, [location.state]);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this vehicle?"))
      return;

    try {
      await instance.delete(`/vehicles/${id}`);
      toast.success("Vehicle deleted successfully");
      setVehicles((prev) => prev.filter((v) => v._id !== id));
    } catch (error) {
      console.error(error);
      toast.error("Failed to delete vehicle");
    }
  };

  const handleEdit = (vehicle) => {
    navigate("/registervehicle", { state: { vehicle } });
  };

  return (
    <div className="bg-[#f1f5f9] py-16 px-4 sm:px-6 lg:px-12 min-h-screen">
      <h2 className="text-4xl md:text-5xl font-extrabold text-center text-[#1e293b] mb-14">
        My <span className="text-[#ff4f00]">Vehicles</span>
      </h2>

      {vehicles.length === 0 ? (
        <p className="text-center text-gray-500 text-lg">
          You have not registered any vehicles yet.
        </p>
      ) : (
        <div className="grid gap-10 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {vehicles.map((vehicle) => (
            <div
              key={vehicle._id}
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
                    Rs. {vehicle.price}/day
                  </span>
                </div>

                <h3 className="text-lg font-semibold text-[#1e293b] mb-2">
                  {vehicle.name}
                </h3>

                {/* Fuel type for Cars only */}
                {vehicle.type === "car" && vehicle.fueltype && (
                  <p className="text-sm text-gray-500 mb-3">
                    Fuel Type:{" "}
                    <span className="text-[#1e293b] font-medium">
                      {vehicle.fueltype}
                    </span>
                  </p>
                )}

                <div className="flex justify-between gap-2">
                  <Button
                    className="bg-green-600 hover:bg-green-500 text-white w-1/2"
                    onClick={() => handleEdit(vehicle)}
                  >
                    Edit
                  </Button>
                  <Button
                    className="bg-red-600 hover:bg-red-500 text-white w-1/2"
                    onClick={() => handleDelete(vehicle._id)}
                  >
                    Delete
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Individual;
