import asyncHandler from "express-async-handler";
import { CompanyUserProfile } from "../models/CompanyModel.js"; // Adjust the import path based on your project structure

// Controller function to create a new company user profile
const createCompanyUserProfile = asyncHandler(async (req, res) => {
  try {
    const { company_name, full_name, email, phone_number, avatar, location } =
      req.body;
    const companyUserProfile = new CompanyUserProfile({
      company_name,
      full_name,
      email,
      phone_number,
      avatar,
      location,
    });
    const savedCompanyUserProfile = await companyUserProfile.save();
    res.status(201).json({ success: true, data: savedCompanyUserProfile });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Controller function to get all company user profiles
const getAllCompanyUserProfiles = asyncHandler(async (req, res) => {
  try {
    const companyUserProfiles = await CompanyUserProfile.find();
    res.status(200).json({ success: true, data: companyUserProfiles });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Controller function to get a specific company user profile by ID
const getCompanyUserProfileById = asyncHandler(async (req, res) => {
  try {
    const companyUserProfileId = req.params.id;
    const companyUserProfile = await CompanyUserProfile.findById(
      companyUserProfileId
    );
    if (!companyUserProfile) {
      return res
        .status(404)
        .json({ success: false, error: "Company user profile not found" });
    }
    res.status(200).json({ success: true, data: companyUserProfile });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Controller function to update a company user profile by ID
const updateCompanyUserProfile = asyncHandler(async (req, res) => {
  try {
    const companyUserProfileId = req.params.id;
    const { company_name, full_name, email, phone_number, avatar, location } =
      req.body;
    const updatedCompanyUserProfile =
      await CompanyUserProfile.findByIdAndUpdate(
        companyUserProfileId,
        { company_name, full_name, email, phone_number, avatar, location },
        { new: true }
      );
    if (!updatedCompanyUserProfile) {
      return res
        .status(404)
        .json({ success: false, error: "Company user profile not found" });
    }
    res.status(200).json({ success: true, data: updatedCompanyUserProfile });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Controller function to delete a company user profile by ID
const deleteCompanyUserProfile = asyncHandler(async (req, res) => {
  try {
    const companyUserProfileId = req.params.id;
    const deletedCompanyUserProfile =
      await CompanyUserProfile.findByIdAndDelete(companyUserProfileId);
    if (!deletedCompanyUserProfile) {
      return res
        .status(404)
        .json({ success: false, error: "Company user profile not found" });
    }
    res.status(200).json({ success: true, data: deletedCompanyUserProfile });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

export {
  createCompanyUserProfile,
  getAllCompanyUserProfiles,
  getCompanyUserProfileById,
  updateCompanyUserProfile,
  deleteCompanyUserProfile,
};