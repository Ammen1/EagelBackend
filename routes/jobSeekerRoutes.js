const express = require("express");
const router = express.Router();
const jobSeekerController = require("../controllers/jobSeekerController");

// Route to create a new job seeker
router.post("/jobseekers", jobSeekerController.createJobSeeker);

// Route to get all job seekers
router.get("/jobseekers", jobSeekerController.getAllJobSeekers);

// Route to get a single job seeker by ID
router.get("/jobseekers/:id", jobSeekerController.getJobSeekerById);

module.exports = router;
