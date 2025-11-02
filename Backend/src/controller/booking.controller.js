import Booking from "../models/booking.models.js";

// Create a new booking
export const createBooking = async (req, res) => {
  try {
    const {
      
      startDate,
      endDate,
      citizenshipNumber,
      citizenshipFrontPhoto,
      citizenshipBackPhoto,
      licensePhoto,
      selfieWithCitizenship,
      contactNumber,
      totalPrice,
    } = req.body;

    // Get userId from authenticated user
    const userId = req.user._id;

    //  Early validation
    // if (!vehicleId) {
    //   return res
    //     .status(400)
    //     .json({ message: "Booking failed: vehicleId is required" });
    // }
    if (!startDate || !endDate) {
      return res
        .status(400)
        .json({ message: "Start and end dates are required" });
    }
    if (!contactNumber || !/^\d{10}$/.test(contactNumber)) {
      return res
        .status(400)
        .json({ message: "Contact number must be exactly 10 digits." });
    }
    if (!citizenshipNumber || !/^\d{11}$/.test(citizenshipNumber)) {
      return res
        .status(400)
        .json({ message: "Citizenship number must be exactly 11 digits." });
    }
    if (
      !citizenshipFrontPhoto ||
      !citizenshipBackPhoto ||
      !licensePhoto ||
      !selfieWithCitizenship
    ) {
      return res
        .status(400)
        .json({ message: "All required photos must be uploaded." });
    }

    // Create booking
    const booking = await Booking.create({
      userId,
      
      startDate,
      endDate,
      citizenshipNumber,
      citizenshipFrontPhoto,
      citizenshipBackPhoto,
      licensePhoto,
      selfieWithCitizenship,
      contactNumber,
      status: "pending",
      totalPrice,
    });

    return res
      .status(201)
      .json({ message: "Booking created successfully", booking });
  } catch (error) {
    console.error("Create booking error:", error);
    return res
      .status(500)
      .json({ message: "Booking creation failed", error: error.message });
  }
};

// Fetch logged-in user's bookings
export const getMyBookings = async (req, res) => {
  try {
    const userId = req.user._id;

    const bookings = await Booking.find({ userId })
      
      .sort({ createdAt: -1 });

    return res.status(200).json({ bookings: bookings || [] });
  } catch (error) {
    console.error("getMyBookings error:", error);
    return res.status(500).json({ message: "Failed to fetch bookings" });
  }
};
