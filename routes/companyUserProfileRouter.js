import express from "express";
import {
  createCompanyUserProfile,
  getAllCompanyUserProfiles,
  getCompanyUserProfileById,
  updateCompanyUserProfile,
  deleteCompanyUserProfile,
} from "../controllers/companyUserProfileController.js"; // Adjust the import path based on your project structure

const router = express.Router();

// Define the routes for company user profiles
router.post("/companyuserprofile", createCompanyUserProfile);
router.get("/companyuserprofile", getAllCompanyUserProfiles);
router.get("/companyuserprofile/:id", getCompanyUserProfileById);
router.put("/companyuserprofile:id", updateCompanyUserProfile);
router.delete("/companyuserprofile:id", deleteCompanyUserProfile);

export default router;
