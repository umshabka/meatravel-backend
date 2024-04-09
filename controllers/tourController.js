import Tour from "../models/Tour.js";

// export const createTour = async (req, res) => {
//   const { glances, itinerary, accommodations, notes, inclusions, ...tourData } = req.body;
//   try {
//     const newTour = new Tour({ ...tourData, glances: [], itinerary: [], accommodations: [], notes: [], inclusions: [] });

//     // Add glances to the new tour if provided
//     if (glances && glances.length > 0) {
//       newTour.glances = glances;
//     }

//     // Add itinerary to the new tour if provided
//     if (itinerary && itinerary.length > 0) {
//       newTour.itinerary = itinerary;
//     }
//     // Add accommodations to the new tour if provided
//     if (accommodations && accommodations.length > 0) {
//       newTour.accommodations = accommodations;
//     }

//     // Add notes to the new tour if provided
//     if (notes && notes.length > 0) {
//       newTour.notes = notes;
//     }

//     // Add inclusions to the new tour if provided
//     if (inclusions && inclusions.length > 0) {
//       newTour.inclusions = inclusions;
//     }

//     const savedTour = await newTour.save();
//     res.status(200).json({
//       success: true,
//       message: "Successfully created",
//       data: savedTour,
//     });
//   } catch (err) {
//     res.status(500).json({ success: false, message: err });
//   }
// };

// export const updateTour = async (req, res) => {
//   const id = req.params.id;
//   const { glances, itinerary, accommodations, notes, inclusions, ...updatedData } = req.body; // Destructure glances, itinerary, accommodations, notes, and inclusions from req.body

//   try {
//     let tour = await Tour.findById(id);

//     if (!tour) {
//       return res.status(404).json({ success: false, message: "Tour not found" });
//     }

//     // Update tour fields
//     for (let key in updatedData) {
//       tour[key] = updatedData[key];
//     }

//     // Update glances if provided
//     if (glances && glances.length > 0) {
//       tour.glances = glances;
//     }

//     // Update itinerary if provided
//     if (itinerary && itinerary.length > 0) {
//       tour.itinerary = itinerary;
//     }

//     // Update accommodations if provided
//     if (accommodations && accommodations.length > 0) {
//       tour.accommodations = accommodations;
//     }

//     // Update notes if provided
//     if (notes && notes.length > 0) {
//       tour.notes = notes;
//     }

//     // Update inclusions if provided
//     if (inclusions && inclusions.length > 0) {
//       tour.inclusions = inclusions;
//     }

//     const updatedTour = await tour.save();
//     res.status(200).json({
//       success: true,
//       message: "Successfully updated",
//       data: updatedTour,
//     });
//   } catch (error) {
//     res.status(500).json({ success: false, message: error });
//   }
// };

export const  createTour = async (req, res) => {
  try {
    const tour = await Tour.create(req.body);
    res.status(201).json({ success: true, data: tour });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

// Update an existing tour
export const  updateTour = async (req, res) => {
  try {
    const { id } = req.params;
    const tour = await Tour.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!tour) {
      return res.status(404).json({ success: false, error: 'Tour not found' });
    }

    res.status(200).json({ success: true, data: tour });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

//Delete Tour
export const daleteTour = async (req, res) => {
  const id = req.params.id;

  try {
    await Tour.findByIdAndDelete(id);

    res.status(200).json({
      success: true,
      message: "Successfully deleted",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to delete",
    });
  }
};

// Get Single Tour
export const getSingleTour = async (req, res) => {
  const id = req.params.id;

  try {
    const tour = await Tour.findById(id);

    if (!tour) {
      return res.status(404).json({ success: false, message: "Tour not found" });
    }

    res.status(200).json({
      success: true,
      message: "Found Successfully",
      data: tour,
    });
  } catch (error) {
    res.status(404).json({ success: false, message: "Not Found" });
  }
};

//Get All Tours
export const getAllTour = async (req, res) => {
  // for pagination
  const page = parseInt(req.query.page);

  try {
    const tours = await Tour.find({})
      .populate("reviews")
      .skip(page * 8)
      .limit(8);

    res.status(200).json({
      success: true,
      message: "Success",
      count: tours.length,
      data: tours,
    });
  } catch (error) {
    res.status(404).json({
      success: false,
      message: "Not Found",
    });
  }
};

export const getTourBySearch = async (req, res) => {
  // 'i' means case sensitive
  const city = new RegExp(req.query.city, "i");
  const maxGroupSize = parseInt(req.query.maxGroupSize);

  try {
    // gte means greater than or equal
    const tours = await Tour.find({
      city,
      maxGroupSize: { $gte: maxGroupSize },
    }).populate("reviews");

    res.status(200).json({
      success: true,
      message: "Success",
      data: tours,
    });
  } catch (error) {
    res.status(404).json({
      success: false,
      message: "Not Found",
    });
  }
};

//Get Featured Tours
export const getFeaturedTour = async (req, res) => {
  try {
    const tours = await Tour.find({ featured: true })
      .populate("reviews")
      .limit(8);

    res.status(200).json({
      success: true,
      message: "Success",
      data: tours,
    });
  } catch (error) {
    res.status(404).json({
      success: false,
      message: "Not Found",
    });
  }
};

//Get Tours Count
export const getTourCount = async (req, res) => {
  try {
    const tourCount = await Tour.estimatedDocumentCount();

    res.status(200).json({
      success: true,
      data: tourCount,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch",
    });
  }
};

// Get speciefic tours by country name
export const getToursByCountry = async (req, res) => {
  const country = req.params.country;

  try {
    const tours = await Tour.find({ country: country })
      .populate("reviews");

    res.status(200).json({
      success: true,
      message: "Success",
      count: tours.length,
      data: tours,
    });
  } catch (error) {
    res.status(404).json({
      success: false,
      message: "Not Found",
    });
  }
};
