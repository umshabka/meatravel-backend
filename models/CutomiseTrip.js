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

const CutomiseTrip = new mongoose.Schema(
  {
    destination: {
      type: String,
      required: true,
    },
    date: {
      type: Date,
      required: true,
    },
    flexible: {
      type: Boolean,
      required: true,
      default: false
    },
    tripLength: {
      type: Number,
      required: true,
      default: 1
    },
    rooms: {
      type: [RoomSchema],
      required: true,
    },
    budget: {
      type: Number,
      required: true,
      default: 1
    },
    includeInternationalFlights: {
      type: Boolean,
      required: true,
      default: false
    },
    clientPreferences: {
      type: String,
      enum: ['KeepBudget', 'increaseBudget', 'takingThePerfectTrip'],
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    phone: {
      type: Number,
      required: true,
    },
    additionalNotes: {
      type: String,
    },
    state: {
      type: String,
      required: true,
      default: 'Pending'
    }
  },
  { timestamps: true }
);

export default mongoose.model("CutomiseTrip", CutomiseTrip);
