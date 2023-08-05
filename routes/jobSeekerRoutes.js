import express from "express";
const router = express.Router();
import {
  createJobSeeker,
  getAllJobSeekers,
  getJobSeekerById,
} from "../controllers/jobSeekerController.js";
import { JobSeeker } from "../models/JobSeekerModel.js";

// Route to create a new job seeker
router.post("/jobseekers", async (req, res) => {
  try {
    // Extract data from the request body
    const { user, full_name, bio, skills, location, avatar, qualifications } =
      req.body;

    // Create a new instance of the JobSeeker model with the extracted data
    const jobSeeker = new JobSeeker({
      user,
      full_name,
      bio,
      skills,
      location,
      avatar,
      qualifications,
    });

    // Save the job seeker to the database
    await jobSeeker.save();

    // Respond with a success message and the newly created job seeker
    res.status(201).json({ success: true, data: jobSeeker });
  } catch (err) {
    // If an error occurs, respond with an error message
    res.status(500).json({ success: false, error: err.message });
  }
});

// // Route to create a new job seeker
// router.post("/jobseekers", createJobSeeker);

// Route to get all job seekers
router.get("/jobseekers", getAllJobSeekers);

// Route to get a single job seeker by ID
router.get("/jobseekers/:id", getJobSeekerById);

export default router;
