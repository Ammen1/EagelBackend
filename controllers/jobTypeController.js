import { JobType } from "../models/CompanyModel.js"; // Import the JobType model

// Controller function to create a new job type
const createJobType = async (req, res) => {
  try {
    const { name, is_active } = req.body;
    const jobType = new JobType({ name, is_active });
    const savedJobType = await jobType.save();
    res.status(201).json({ success: true, data: savedJobType });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// Controller function to get all job types
const getAllJobTypes = async (req, res) => {
  try {
    const jobTypes = await JobType.find();
    res.status(200).json({ success: true, data: jobTypes });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// Controller function to get a specific job type by ID
const getJobTypeById = async (req, res) => {
  try {
    const jobType = await JobType.findById(req.params.id);
    if (!jobType) {
      return res
        .status(404)
        .json({ success: false, error: "Job type not found" });
    }
    res.status(200).json({ success: true, data: jobType });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// Contriller function to update
const updateJobType = async (req, res) => {
  try {
    const { name, is_active } = req.body;
    const jobId = req.params.id;
    const jobtype = await JobType.findByIdAndUpdate(
      jobId,
      { name, is_active },
      { new: true }
    );

    if (!jobtype) {
      return res.status(404).json({
        error: "there no jobtype to update sorry for this my boy...!",
      });
    }
    res.status(200).json({ success: true, data: jobtype });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// to delete jobtype
const deleteJobType = async (req, res) => {
  try {
    const delelejobtype = await JobType.findByIdAndDelete(req.params.id);
    if (!delelejobtype) {
      return res
        .status(404)
        .json({ error: "there no jobtype to delete from database...!" });
    }
    res.status(200).json({ success: true, data: delelejobtype });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

export {
  createJobType,
  getAllJobTypes,
  getJobTypeById,
  updateJobType,
  deleteJobType,
};
