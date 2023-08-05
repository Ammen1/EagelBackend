import asyncHandler from "express-async-handler";
import { FeedBack } from "../models/PlatformModel.js";

// Controller function to create a new feedback
const createFeedback = asyncHandler(async (req, res) => {
  try {
    const { user_id, feedback } = req.body;
    const feedbackEntry = new FeedBack({ user_id, feedback });
    const savedFeedback = await feedbackEntry.save();
    res.status(201).json({ success: true, data: savedFeedback });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Controller function to get all feedbacks
const getAllFeedbacks = asyncHandler(async (req, res) => {
  try {
    const feedbacks = await FeedBack.find();
    res.status(200).json({ success: true, data: feedbacks });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Controller function to get a specific feedback by ID
const getFeedbackById = asyncHandler(async (req, res) => {
  try {
    const feedbackId = req.params.id;
    const feedback = await FeedBack.findById(feedbackId);
    if (!feedback) {
      return res
        .status(404)
        .json({ success: false, error: "Feedback not found" });
    }
    res.status(200).json({ success: true, data: feedback });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Controller function to update a feedback by ID
const updateFeedback = asyncHandler(async (req, res) => {
  try {
    const feedbackId = req.params.id;
    const { user_id, feedback, feedback_reply } = req.body;
    const updatedFeedback = await FeedBack.findByIdAndUpdate(
      feedbackId,
      { user_id, feedback, feedback_reply },
      { new: true }
    );
    if (!updatedFeedback) {
      return res
        .status(404)
        .json({ success: false, error: "Feedback not found" });
    }
    res.status(200).json({ success: true, data: updatedFeedback });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Controller function to delete a feedback by ID
const deleteFeedback = asyncHandler(async (req, res) => {
  try {
    const feedbackId = req.params.id;
    const deletedFeedback = await FeedBack.findByIdAndDelete(feedbackId);
    if (!deletedFeedback) {
      return res
        .status(404)
        .json({ success: false, error: "Feedback not found" });
    }
    res.status(200).json({ success: true, data: deletedFeedback });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

export {
  createFeedback,
  getAllFeedbacks,
  getFeedbackById,
  updateFeedback,
  deleteFeedback,
};
