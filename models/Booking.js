import mongoose from "mongoose";

const RoomSchema = new mongoose.Schema({
  _id: {
    type: Number, 
    required: true,
  },
  bedTypes: {
    type: String,
    required: true,
  },
  children: {
    type: Number, 
    required: true,
  },
  adults: {
    type: Number, 
    required: true,
  }
});

const bookingSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
    },
    userEmail: {
      type: String,
    },
    tourName: {
      type: String,
      required: true,
    },
    fullName: {
      type: String,
      required: true,
    },
    guestSize: {
      type: Number,
      required: true,
    },
    phone: {
      type: Number,
      required: true,
    },
    nationality: {
      type: String,
      required: true,
    },
    bookAt: {
      type: Date,
      required: true,
    },
    rooms: {
      type: [RoomSchema],
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Booking", bookingSchema);
