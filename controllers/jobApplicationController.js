import asyncHandler from "express-async-handler";
import { JobApplication } from "../models/CompanyModel.js"; // Adjust the import path based on your project structure

// Controller function to create a new job application
export const createJobApplication = asyncHandler(async (req, res) => {
  try {
    const { jobSeeker, jobListing, resume, coverLetter } = req.body;
    const jobApplication = new JobApplication({
      jobSeeker,
      jobListing,
      resume,
      coverLetter,
    });
    const savedJobApplication = await jobApplication.save();
    res.status(201).json({ success: true, data: savedJobApplication });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Controller function to get all job applications
export const getAllJobApplications = asyncHandler(async (req, res) => {
  try {
    const jobApplications = await JobApplication.find();
    res.status(200).json({ success: true, data: jobApplications });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Controller function to get a specific job application by ID
export const getJobApplicationById = asyncHandler(async (req, res) => {
  try {
    const jobApplicationId = req.params.id;
    const jobApplication = await JobApplication.findById(jobApplicationId);
    if (!jobApplication) {
      return res
        .status(404)
        .json({ success: false, error: "Job application not found" });
    }
    res.status(200).json({ success: true, data: jobApplication });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Controller function to update a job application by ID
export const updateJobApplication = asyncHandler(async (req, res) => {
  try {
    const jobApplicationId = req.params.id;
    const {
      jobSeeker,
      jobListing,
      resume,
      coverLetter,
      isAccepted,
      isInterviewInvited,
    } = req.body;
    const updatedJobApplication = await JobApplication.findByIdAndUpdate(
      jobApplicationId,
      {
        jobSeeker,
        jobListing,
        resume,
        coverLetter,
        isAccepted,
        isInterviewInvited,
      },
      { new: true }
    );
    if (!updatedJobApplication) {
      return res
        .status(404)
        .json({ success: false, error: "Job application not found" });
    }
    res.status(200).json({ success: true, data: updatedJobApplication });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Controller function to delete a job application by ID
export const deleteJobApplication = asyncHandler(async (req, res) => {
  try {
    const jobApplicationId = req.params.id;
    const deletedJobApplication = await JobApplication.findByIdAndDelete(
      jobApplicationId
    );
    if (!deletedJobApplication) {
      return res
        .status(404)
        .json({ success: false, error: "Job application not found" });
    }
    res.status(200).json({ success: true, data: deletedJobApplication });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});
