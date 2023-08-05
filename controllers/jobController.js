import asyncHandler from "express-async-handler";
import slugify from "slugify";
import { Job } from "../models/CompanyModel.js";

// Controller function to create a new job

const createJob = asyncHandler(async (req, res) => {
  try {
    const {
      category,
      jobtype,
      title,
      description,
      requirements,
      location,
      is_active,
    } = req.body;

    // Check if required fields (category and jobtype) are provided
    if (!category || !jobtype) {
      return res.status(400).json({
        success: false,
        error: "Category and JobType are required fields",
      });
    }

    // Validate that the title field is provided and not empty
    if (!title || typeof title !== "string" || title.trim().length === 0) {
      return res.status(400).json({
        success: false,
        error: "Title is required and should be a non-empty string",
      });
    }

    const baseSlug = slugify(title);
    console.log("Base Slug:", baseSlug);

    const job = new Job({
      category,
      jobtype,
      title,
      description,
      requirements,
      slug: baseSlug, // Set the initial slug to the baseSlug before generating a unique one
      location,
      is_active,
    });

    // Generate a unique slug before saving the job
    const generateUniqueSlug = async () => {
      const existingJob = await Job.findOne({ slug: job.slug });
      if (!existingJob) {
        await job.save();
        res.status(201).json({ success: true, data: job });
      } else {
        job.slug = `${baseSlug}-${Date.now()}`; // Add a timestamp to make the slug unique
        generateUniqueSlug();
      }
    };

    generateUniqueSlug();
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Controller function to get all jobs
const getAllJobs = asyncHandler(async (req, res) => {
  try {
    const jobs = await Job.find();
    res.status(200).json({ success: true, data: jobs });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Controller function to get a specific job by ID
const getJobById = asyncHandler(async (req, res) => {
  try {
    const jobId = req.params.id;
    const job = await Job.findById(jobId);
    if (!job) {
      return res.status(404).json({ success: false, error: "Job not found" });
    }
    res.status(200).json({ success: true, data: job });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

export { createJob, getAllJobs, getJobById };
