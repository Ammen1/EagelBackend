import asyncHandler from "express-async-handler";
import { JobSeeker } from "../models/JobSeekerModel.js";
// Rest of the code for the controller

/**
 *  {
"full_name":"b@b.com",
"email":"update", 
"bio":"Amen#197",
"skills": "skills",
"qualifications": "qualifications" 
}
 */

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

//Controller to delete the jobseeker

const deleteJobSeeker = asyncHandler(async (req, res) => {
  try {
    const jobseeker = await JobSeeker.findByIdAndDelete(req.params.id);

    if (!jobseeker) {
      return res
        .status(404)
        .json({ error: "there no jobseeker in database...!" });
    }
    res.status(200).json({ success: true, data: jobseeker });
  } catch (err) {
    res.status(500).json({ success: true, error: err.message });
  }
});

//controller to update the jobseeker
const updateJobSeeker = asyncHandler(async (req, res) => {
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
    const jobseekerid = req.params.id;
    const jobseekerupdate = await JobSeeker.findByIdAndUpdate(
      jobseekerid,
      { user, full_name, email, bio, skills, location, avatar, qualifications },
      {
        new: true,
      }
    );
    if (!jobseekerupdate) {
      return res
        .status(404)
        .json({ error: "there no jobseeker currently...! sorry for this" });
    }
    res.status(200).json({ success: true, data: jobseekerupdate });
  } catch (err) {
    res.status(500).json({ success: true, error: err.message });
  }
});

export {
  createJobSeeker,
  getAllJobSeekers,
  getJobSeekerById,
  deleteJobSeeker,
  updateJobSeeker,
};
