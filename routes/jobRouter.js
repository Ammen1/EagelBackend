import express from "express";
import {
  createJob,
  getAllJobs,
  getJobById,
} from "../controllers/jobController.js";

const router = express.Router();

// Route to create a new job
router.post("/job", createJob);

// Route to get all jobs
router.get("/job", getAllJobs);

// Route to get a specific job by ID
router.get("/job/:id", getJobById);

export default router;
