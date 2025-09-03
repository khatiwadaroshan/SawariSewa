import express from "express";
import dotenv from "dotenv";
import { connectDb } from "./db/dbConnect.js";
import authRoutes from "./routes/auth.routes.js";
import vehicleRoutes from "./routes/vehicles.route.js";
import renteeRoutes from "./routes/rentee.routes.js";
import bookingRoutes from "./routes/booking.routes.js"; 




import cookieparser from "cookie-parser";
import cors from "cors";

dotenv.config();

const port = process.env.PORT || 5001;
const app = express();

app.use(express.json());
app.use(cookieparser());

app.use(
  cors({
     origin: [/^http:\/\/localhost:\d+$/],
    credentials: true,
  })
);

// Routes
app.use("/api/vehicles", vehicleRoutes);
app.use("/api/rentee", renteeRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/bookings", bookingRoutes);




connectDb()
  .then(() => {
    app.listen(port, () => {
      console.log(` Server listening on port ${port}`);
    });
  })
  .catch((error) => {
    console.error("❌ Failed to connect to database:", error);
  });
