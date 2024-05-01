import mongoose from "mongoose";

// --------------------------- At A Glance --------------------------------
const tourGlanceSchema = new mongoose.Schema(
  {
    glanceDay: {
      type: Number,
      required: false,
      unique: false,
    },
    glanceOrder: {
      type: Number,
      required: false,
      unique: false,
    },
    glanceTitle_En: {
      type: String,
      required: false,
      unique: false,
    },
    glanceTitle_Ar: {
      type: String,
      required: false,
      unique: false,
    },
    glanceTitle_Es: {
      type: String,
      required: false,
      unique: false,
    },
    glanceItem_En: {
      type: String,
      required: false,
      unique: false,
    },
    glanceItem_Ar: {
      type: String,
      required: false,
      unique: false,
    },
    glanceItem_Es: {
      type: String,
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
    itrtitle_En: {
      type: String,
      required: false,
      unique: false,
    },
    itrtitle_Ar: {
      type: String,
      required: false,
      unique: false,
    },
    itrtitle_Es: {
      type: String,
      required: false,
      unique: false,
    },
    itrdesc_En: {
      type: String,
      required: false,
      unique: false,
    },
    itrdesc_Ar: {
      type: String,
      required: false,
      unique: false,
    },
    itrdesc_Es: {
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
    accommodationTitle_En: {
      type: String,
      required: false,
      unique: false,
    },
    accommodationTitle_Ar: {
      type: String,
      required: false,
      unique: false,
    },
    accommodationTitle_Es: {
      type: String,
      required: false,
      unique: false,
    },
    accommodationDesc_En: {
      type: String,
      required: false,
      unique: false,
    },
    accommodationDesc_Ar: {
      type: String,
      required: false,
      unique: false,
    },
    accommodationDesc_Es: {
      type: String,
      required: false,
      unique: false,
    },
  },
  { timestamps: true }
);

// --------------------------- Notes --------------------------------
const tourNotesSchema = new mongoose.Schema(
  {
    noteDesc_En: {
      type: String,
      required: false,
      unique: false,
    },
    noteDesc_Ar: {
      type: String,
      required: false,
      unique: false,
    },
    noteDesc_Es: {
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
    inclusionIncluded: {
      type: Boolean,
      required: false,
      unique: false,
    },
    inclusionDesc_En: {
      type: String,
      required: false,
      unique: false,
    },
    inclusionDesc_Ar: {
      type: String,
      required: false,
      unique: false,
    },
    inclusionDesc_Es: {
      type: String,
      required: false,
      unique: false,
    },
  },
  { timestamps: true }
);



// --------------------------- The Tour --------------------------------
// --------------------------- The Tour --------------------------------
const tourSchema = new mongoose.Schema(
  {
    // Duplicated data
    title: {
      type: String,
      required: true,
      unique: true
    },
    title_Ar: {
      type: String,
      required: true,
    },
    title_Es: {
      type: String,
      required: true,
    },
    city_En: {
      type: String,
      required: true,
    },
    city_Ar: {
      type: String,
      required: true,
    },
    city_Es: {
      type: String,
      required: true,
    },
    address_En: {
      type: String,
      required: true,
    },
    address_Ar: {
      type: String,
      required: true,
    },
    address_Es: {
      type: String,
      required: true,
    },
    desc_En: {
      type: String,
      required: true,
    },
    desc_Ar: {
      type: String,
      required: true,
    },
    desc_Es: {
      type: String,
      required: true,
    },
    highlights: [{
      highlights_En: {
        type: String,
        required: true,
      },
      highlights_Ar: {
        type: String,
        required: true,
      },
      highlights_Es: {
        type: String,
        required: true,
      },
    }],

    // Data Enterd One Time
    photos: {
      type: [String],
    },
    maplink: {
      type: String
    },
    country: {
      type: String,
    },
    price: {
      type: Number,
      required: true,
    },
    priceForTravelAgents:{
      type: Number,
      required: false,
      default: 0
    },
    maxGroupSize: {
      type: Number,
      required: true,
    },
    featured: {
      type: Boolean,
      default: false,
    },
    reviews: [
      {
        type: mongoose.Types.ObjectId,
        ref: "Review",
      },
    ],

    // ------ Description -------
    glances: [tourGlanceSchema],
    itinerary: [tourItinerarySchema],
    accommodations: [tourAccommodationsSchema],
    notes: [tourNotesSchema],
    inclusions: [tourInclusionsSchema]
  },
  { timestamps: true }
);

export default mongoose.model("Tour", tourSchema);
