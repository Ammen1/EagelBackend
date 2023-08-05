import asyncHandler from "express-async-handler";
import { Review } from "../models/PlatformModel.js";

// Controller function to create a new review
const createReview = asyncHandler(async (req, res) => {
  try {
    const { job_seeker, review_text } = req.body;
    const newReview = new Review({ job_seeker, review_text });
    const savedReview = await newReview.save();
    res.status(201).json({ success: true, data: savedReview });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Controller function to get all reviews
const getAllReviews = asyncHandler(async (req, res) => {
  try {
    const reviews = await Review.find();
    res.status(200).json({ success: true, data: reviews });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Controller function to get a specific review by ID
const getReviewById = asyncHandler(async (req, res) => {
  try {
    const reviewId = req.params.id;
    const review = await Review.findById(reviewId);
    if (!review) {
      return res
        .status(404)
        .json({ success: false, error: "Review not found" });
    }
    res.status(200).json({ success: true, data: review });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Controller function to update a review by ID
const updateReview = asyncHandler(async (req, res) => {
  try {
    const reviewId = req.params.id;
    const { job_seeker, review_text } = req.body;
    const updatedReview = await Review.findByIdAndUpdate(
      reviewId,
      { job_seeker, review_text, date: Date.now() },
      { new: true }
    );
    if (!updatedReview) {
      return res
        .status(404)
        .json({ success: false, error: "Review not found" });
    }
    res.status(200).json({ success: true, data: updatedReview });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Controller function to delete a review by ID
const deleteReview = asyncHandler(async (req, res) => {
  try {
    const reviewId = req.params.id;
    const deletedReview = await Review.findByIdAndDelete(reviewId);
    if (!deletedReview) {
      return res
        .status(404)
        .json({ success: false, error: "Review not found" });
    }
    res.status(200).json({ success: true, data: deletedReview });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

export {
  createReview,
  getAllReviews,
  updateReview,
  deleteReview,
  getReviewById,
};
