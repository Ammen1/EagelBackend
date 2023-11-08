import asyncHandler from "express-async-handler";
import { JobImage } from "../models/CompanyModel.js";

// Controller function to create a new job image
export const createJobImage = asyncHandler(async (req, res) => {
  try {
    const { job, image, alt_text, is_feature } = req.body;
    const jobImage = new JobImage({ job, image, alt_text, is_feature });
    const savedimage = await jobImage.save();
    res.status(201).json({ success: true, data: savedimage });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Controller function to get all job images for a specific job
export const getAllJobImagesForJob = asyncHandler(async (req, res) => {
  try {
    const jobImages = await JobImage.find();
    res.status(200).json({ success: true, data: jobImages });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});
