import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";
import cookieParser from "cookie-parser";

import tourRouter from "./routes/tours.js";
import userRouter from "./routes/users.js";
import authRouter from "./routes/auth.js";
import reviewRouter from "./routes/reviews.js";
import bookingRouter from "./routes/booking.js";
import contactInfoRouter from "./routes/contactInfo.js"
import countriesRouter from "./routes/countries.js"

dotenv.config();
const app = express();
const port = process.env.PORT || 8000;
const corsOptions = {
  origin: true,
  credentials: true,
};

//for testing
app.get("/", (req, res) => {
  res.send("MEA-Travel API");
});

// Database Connection
const connect = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      // useNewUrlParser:true,
      // useUnifiedTopology:true
    });
    console.log("MongoDB database connected");
  } catch (err) {
    console.log("MongoDB database connection failed", err);
  }
};

//middleware
app.use(express.json());
app.use(cors(corsOptions));
app.use(cookieParser());
app.use("/api/v1/tours", tourRouter);
app.use("/api/v1/users", userRouter);
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/review", reviewRouter);
app.use("/api/v1/booking", bookingRouter);
app.use("/api/v1/contactInfo", contactInfoRouter);
app.use("/api/v1/countries", countriesRouter);

app.listen(port, () => {
  connect();
  console.log("server listining on port", port);
});
