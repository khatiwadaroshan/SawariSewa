import Booking from "../models/booking.models.js";


export const createBooking = async (req, res) => {
  try {
    const {
      // customerId,
      // vehicleId,
      startDate,
      endDate,
      // totalAmount,
      citizenshipPhoto,
      citizenshipFrontPhoto,
      citizenshipBackPhoto,
      licensePhoto,
      selfieWithCitizenship,
      contactNumber,
    } = req.body;

    // You might want to validate required fields here before creating

    const booking = await Booking.create({
      // customerId,
      // vehicleId,
      startDate,
      endDate,
      // status: "Pending",
      // totalAmount,
      citizenshipPhoto,
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

    // const payment = await Payment.create({
    //   bookingId: booking._id,
    //   amount: totalAmount,
    //   method: "eSewa",
    //   status: "Pending",
    // });

  //   return res.status(201).json({
  //     message: "Booking initiated",
  //     bookingId: booking._id,
  //     paymentId: payment._id,
  //     amount: totalAmount,
  //   });
  } catch (error) {
    console.error("Initiate booking error:", error);

    
    return res
      .status(500)
      .json({ message: "Booking initiation failed", error: error.message });
  }
};
