import mongoose from "mongoose";

const countriesSchema = new mongoose.Schema(
  {
    country: {
      type: String,
      required: true,
    },
    overview_pragraph1: {
      type: String,
      required: false,
    },
    overview_pragraph2: {
        type: String,
        required: false,
      },
  },
  { timestamps: true }
);

export default mongoose.model("Countries", countriesSchema);
