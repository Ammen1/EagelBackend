import asyncHandler from "express-async-handler";
// import JobSeeker  from "../models/JobSeekerModel.js";
import { JobSeeker } from "../models/JobSeekerModel.js";
// Rest of the code for the controller

const createJobSeeker = asyncHandler(async (req, res) => {
  try {
    const {
      user,
      full_name,
      email,
      bio,
      skills,
      location,
      avatar,
      qualifications,
    } = req.body;
    const jobSeeker = new JobSeeker({
      user,
      full_name,
      email,
      bio,
      skills,
      location,
      avatar,
      qualifications,
    });
    await jobSeeker.save();
    res.status(201).json({ success: true, data: jobSeeker });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// Controller to get all job seekers
const getAllJobSeekers = asyncHandler(async (req, res) => {
  try {
    const jobSeekers = await JobSeeker.find();
    res.status(200).json({ success: true, data: jobSeekers });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// Controller to get a single job seeker by ID
const getJobSeekerById = asyncHandler(async (req, res) => {
  try {
    const jobSeeker = await JobSeeker.findById(req.params.id);
    if (!jobSeeker) {
      return res
        .status(404)
        .json({ success: false, error: "Job seeker not found" });
    }
    res.status(200).json({ success: true, data: jobSeeker });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

export { createJobSeeker, getAllJobSeekers, getJobSeekerById };
