import express from "express";
import {
  createReview,
  getAllReviews,
  getReviewById,
  updateReview,
  deleteReview,
} from "../controllers/reviewController.js"; // Adjust the import path based on your project structure

const router = express.Router();

// Routes for reviews
router.post("/review", createReview);
router.get("/review", getAllReviews);
router.get("/review/:id", getReviewById);
router.put("/review/:id", updateReview);
router.delete("/review/:id", deleteReview);

export default router;
