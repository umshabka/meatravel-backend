import mongoose from "mongoose";

// country name - image - title - desc - overview
const countriesSchema = new mongoose.Schema(
  {
    country: {
      type: String,
      required: true,
    },
    images: {
      type: [String],
      required: true,
    },
    imgTitle: {
      type: String,
      required: true,
    },
    imgDesc: {
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
