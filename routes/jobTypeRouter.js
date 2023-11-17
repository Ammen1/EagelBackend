import express from "express";
import {
  createJobType,
  getAllJobTypes,
  getJobTypeById,
  updateJobType,
  deleteJobType,
} from "../controllers/jobTypeController.js";

const router = express.Router();

// Route to create a new job type
router.post("/jobtypes", createJobType);

// Route to get all job types
router.get("/jobtypes", getAllJobTypes);

// Route to get a specific job type by ID
router.get("/jobtypes/:id", getJobTypeById);

// Router to update jobtype
router.put("/updatejobtype/:id", updateJobType);

//Router to delete jobtype
router.delete("/deletejobtype/:id", deleteJobType);

export default router;
