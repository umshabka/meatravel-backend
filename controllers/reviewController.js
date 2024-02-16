import Tour from "../models/Tour.js";
import Review from "../models/Review.js";

export const createReview = async (req, res) => {
  const tourId = req.params.tourId;
  const newReview = new Review({ ...req.body });

  try {
    const savedReview = await newReview.save();

    // after creating a new review now update the reviews array of the tour
    await Tour.findByIdAndUpdate(tourId, {
      $push: { reviews: savedReview._id },
    });

    res
      .status(200)
      .json({ success: true, message: "Review submitted", data: savedReview });
  } catch (error) {
    res.status(500).json({ success: false, message: "failed to submit" });
  }
};

//get all Reviews
export const getAllReviews = async (req, res) => {
  const id = req.params.id;

  try {
    const reviews = await Review.find();

    res.status(200).json({
      success: true,
      message: "Success",
      data: reviews,
    });
  } catch (error) {
    res.status(500).json({
      success: true,
      message: "internal server error",
    });
  }
};
