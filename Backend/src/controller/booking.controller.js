import Booking from "../models/booking.models.js";

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
    } = req.body;

    //  Validate contact number
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

    //  Validate start date
    if (!startDate) {
      return res.status(400).json({ message: "Start date is required." });
    }

    const start = new Date(startDate);
    const today = new Date();
    today.setHours(0, 0, 0, 0); // reset time

    const maxStartDate = new Date();
    maxStartDate.setDate(today.getDate() + 10); // today + 10 days

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
    maxEndDate.setDate(start.getDate() + 10); // end date max 10 days after start
    if (end > maxEndDate) {
      return res.status(400).json({
        message: "End date cannot be more than 10 days after start date.",
      });
    }

    const booking = await Booking.create({
      startDate,
      endDate,
      citizenshipNumber,
      citizenshipFrontPhoto,
      citizenshipBackPhoto,
      licensePhoto,
      selfieWithCitizenship,
      contactNumber,
    });

    return res.status(201).json({
      message: "Booking created successfully",
      booking,
    });
  } catch (error) {
    console.error("Initiate booking error:", error);
    return res
      .status(500)
      .json({ message: "Booking initiation failed", error: error.message });
  }
};
