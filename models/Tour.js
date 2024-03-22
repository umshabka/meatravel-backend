import mongoose from "mongoose";

// --------------------------- At A Glance --------------------------------
const tourGlanceSchema = new mongoose.Schema(
  {
    glanceDay: {
      type: Number,
      required: false,
      unique: false,
    },
    glanceTitle: {
      type: String,
      required: false,
      unique: false,
    },
    glanceItem: {
      type: String,
      required: false,
      unique: false,
    },
    glanceOrder: {
      type: Number,
      required: false,
      unique: false,
    },
  },
  { timestamps: true }
);

// --------------------------- Itinerary --------------------------------
const tourItinerarySchema = new mongoose.Schema(
  {
    itrday: {
      type: Number,
      required: false,
      unique: false,
    },
    itrtitle: {
      type: String,
      required: false,
      unique: false,
    },
    itrdesc: {
      type: String,
      required: false,
      unique: false,
    },
  },
  { timestamps: true }
);

// --------------------------- Accommodations --------------------------------
const tourAccommodationsSchema = new mongoose.Schema(
  {
    accommodationTitle: {
      type: String,
      required: false,
      unique: false,
    },
    accommodationDesc: {
      type: String,
      required: false,
      unique: false,
    }
  },
  { timestamps: true }
);

// --------------------------- Notes --------------------------------
const tourNotesSchema = new mongoose.Schema(
  {
    noteDesc: {
      type: String,
      required: false,
      unique: false,
    },
  },
  { timestamps: true }
);

// --------------------------- Inclusions --------------------------------
const tourInclusionsSchema = new mongoose.Schema(
  {
    inclusionDesc: {
      type: String,
      required: false,
      unique: false,
    },
    inclusionIncluded: {
      type: Boolean,
      required: false,
      unique: false,
    }
  },
  { timestamps: true }
);



// --------------------------- The Tour --------------------------------
// --------------------------- The Tour --------------------------------
const tourSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      unique: true,
    },
    country: {
      type: Number,
    },
    city: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    distance: {
      type: Number,
    },
    photos: {
      type: [String],
      // required: true,
    },
    desc: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    maxGroupSize: {
      type: Number,
      required: true,
    },

    reviews: [
      {
        type: mongoose.Types.ObjectId,
        ref: "Review",
      },
    ],

    featured: {
      type: Boolean,
      default: false,
    },

    // Description
    glances: [tourGlanceSchema],
    itinerary: [tourItinerarySchema],
    accommodations: [tourAccommodationsSchema],
    notes: [tourNotesSchema],
    inclusions: [tourInclusionsSchema]
  },
  { timestamps: true }
);

export default mongoose.model("Tour", tourSchema);
