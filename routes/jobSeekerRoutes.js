import express from "express";
const router = express.Router();
import {
  createJobSeeker,
  getAllJobSeekers,
  getJobSeekerById,
  deleteJobSeeker,
  updateJobSeeker,
} from "../controllers/jobSeekerController.js";

// Route to create a new job seeker
router.post("/jobseekers", createJobSeeker);

// // Route to create a new job seeker
// router.post("/jobseekers", createJobSeeker);

// Route to get all job seekers
router.get("/jobseekers", getAllJobSeekers);

// Route to get a single job seeker by ID
router.get("/jobseekers/:id", getJobSeekerById);

// Router to delete the jobseeker
router.delete("/deletejobseeker/:id", deleteJobSeeker);

// Route to update jobseeker
router.put("/updatejobseeker/:id", updateJobSeeker);

export default router;
