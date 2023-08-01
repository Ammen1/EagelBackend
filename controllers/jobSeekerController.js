const { JobSeeker } = require("../models");
import asyncHandler from "express-async-handler";

import generateToken from "../utils/generateToken.js";

// Controller to handle creating a new job seeker
exports.createJobSeeker = async (req, res) => {
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
};

// Controller to get all job seekers
exports.getAllJobSeekers = async (req, res) => {
  try {
    const jobSeekers = await JobSeeker.find();
    res.status(200).json({ success: true, data: jobSeekers });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

// Controller to get a single job seeker by ID
exports.getJobSeekerById = async (req, res) => {
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
};
