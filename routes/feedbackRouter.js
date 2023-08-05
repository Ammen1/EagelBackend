import express from "express";
import {
  createFeedback,
  getAllFeedbacks,
  getFeedbackById,
  updateFeedback,
  deleteFeedback,
} from "../controllers/feedbackController.js"; // Adjust the import path based on your project structure

const router = express.Router();

router.post("/feedback", createFeedback);
router.get("/feedback", getAllFeedbacks);
router.get("/feedback/:id", getFeedbackById);
router.put("/feedback/:id", updateFeedback);
router.delete("/feedback/:id", deleteFeedback);

export default router;
