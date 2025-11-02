import Booking from "../models/booking.models.js";

export const createBooking = async (req, res) => {
  try {
    const {
      vehicleId,
      startDate,
      endDate,
      citizenshipNumber,
      citizenshipFrontPhoto,
      citizenshipBackPhoto,
      licensePhoto,
      selfieWithCitizenship,
      contactNumber,
    } = req.body;

    // Get userId from authenticated user
    const userId = req.user._id;

    // Validate contact number
    if (!/^\d{10}$/.test(contactNumber)) {
      return res
        .status(400)
        .json({ message: "Contact number must be exactly 10 digits." });
    }

    // Validate citizenship number
    if (!/^\d{11}$/.test(citizenshipNumber)) {
      return res
        .status(400)
        .json({ message: "Citizenship number must be exactly 11 digits." });
    }

    // Validate start date
    if (!startDate) {
      return res.status(400).json({ message: "Start date is required." });
    }

    const start = new Date(startDate);
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const maxStartDate = new Date();
    maxStartDate.setDate(today.getDate() + 10);

    if (start < today) {
      return res
        .status(400)
        .json({ message: "Start date cannot be in the past." });
    }
    if (start > maxStartDate) {
      return res
        .status(400)
        .json({ message: "Start date must be within the next 10 days." });
    }

    // Validate end date
    if (!endDate) {
      return res.status(400).json({ message: "End date is required." });
    }

    const end = new Date(endDate);

    if (end < start) {
      return res
        .status(400)
        .json({ message: "End date cannot be before start date." });
    }

    const maxEndDate = new Date(start);
    maxEndDate.setDate(start.getDate() + 10);
    if (end > maxEndDate) {
      return res.status(400).json({
        message: "End date cannot be more than 10 days after start date.",
      });
    }

    const booking = await Booking.create({
      userId,
      vehicleId,
      startDate,
      endDate,
      citizenshipNumber,
      citizenshipFrontPhoto,
      citizenshipBackPhoto,
      licensePhoto,
      selfieWithCitizenship,
      contactNumber,
      status: "pending",
    });

    return res.status(201).json({
      message: "Booking created successfully",
      booking,
    });
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
      .populate("vehicleId", "name type price image")
      .sort({ createdAt: -1 });

    if (!bookings || bookings.length === 0) {
      return res.status(200).json({ bookings: [] });
    }

    return res.status(200).json({ bookings });
  } catch (error) {
    console.error("getMyBookings error:", error);
    return res.status(500).json({ message: "Failed to fetch bookings" });
  }
};
