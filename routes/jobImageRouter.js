import express from "express";
import {
  createJobImage,
  getAllJobImagesForJob,
} from "../controllers/jobImageController.js"; // Adjust the import path based on your project structure

const router = express.Router();

// Define the routes for job images
router.post("/image", createJobImage);
router.get("/image:jobId", getAllJobImagesForJob);

export default router;
