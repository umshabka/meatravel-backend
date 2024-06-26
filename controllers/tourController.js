import Tour from "../models/Tour.js";

export const createTour = async (req, res) => {
  try {
    const { price, ...otherTourData } = req.body;
    const priceForTravelAgents = price * 0.8;
    const tourDataWithDiscount = { ...otherTourData,price, priceForTravelAgents };
    const tour = await Tour.create(tourDataWithDiscount);
    res.status(201).json({ success: true, data: tour });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};


// Update an existing tour
export const updateTour = async (req, res) => {
  try {
    const { id } = req.params;
    const { price, ...otherTourData } = req.body;
    const priceForTravelAgents = price * 0.8;
    const tourDataWithDiscount = { ...otherTourData,price, priceForTravelAgents };

    const tour = await Tour.findByIdAndUpdate(id, tourDataWithDiscount, {
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
