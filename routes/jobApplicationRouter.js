import express from "express";
import {
  createJobApplication,
  getAllJobApplications,
  getJobApplicationById,
  updateJobApplication,
  deleteJobApplication,
} from "../controllers/jobApplicationController.js"; // Adjust the import path based on your project structure

const router = express.Router();

// Define the routes for job applications
router.post("/jobapplication", createJobApplication);
router.get("/jobapplication", getAllJobApplications);
router.get("/jobapplication/:id", getJobApplicationById);
router.put("/jobapplication/:id", updateJobApplication);
router.delete("/jobapplication/:id", deleteJobApplication);

export default router;
