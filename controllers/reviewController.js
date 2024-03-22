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

// Update - Add reply
export const addReply = async (req, res) => {
  const { id } = req.params;
  const { reply } = req.body;

  try {
    const updatedReview = await Review.findByIdAndUpdate(
      id,
      { reply },
      { new: true }
    );

    if (!updatedReview) {
      return res.status(404).json({
        success: false,
        message: "Review not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Reply updated successfully",
      data: updatedReview,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to update reply",
    });
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

// Get a single review by ID
export const getSingleReview = async (req, res) => {
  const { id } = req.params;

  try {
    const review = await Review.findById(id);
    if (!review) {
      return res.status(404).json({
        success: false,
        message: "Review not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Review found",
      data: review,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to retrieve review",
    });
  }
};

export const daleteReview = async (req, res) => {
  const id = req.params.id;

  try {
    await Review.findByIdAndDelete(id);

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
