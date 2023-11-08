import asyncHandler from "express-async-handler";
import { Company } from "../models/CompanyModel.js"; // Adjust the import path based on your project structure

// Controller function to create a new company
/*
{"company_name":"09876523",
"location": "Addis Ababa",
"is_active":true
}
**/
const createCompany = asyncHandler(async (req, res) => {
  try {
    const { company_name, location, is_active } = req.body;
    const company = new Company({
      company_name,
      location,
      is_active,
    });
    const savedCompany = await company.save();
    res.status(201).json({ success: true, data: savedCompany });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// Controller function to get all companies
const getAllCompanies = asyncHandler(async (req, res) => {
  try {
    const companies = await Company.find();
    res.status(200).json({ success: true, data: companies });
  } catch (error) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// Controller function to get a specific company by ID
const getCompanyById = asyncHandler(async (req, res) => {
  try {
    const companyId = req.params.id;
    const company = await Company.findById(companyId);
    if (!company) {
      return res
        .status(404)
        .json({ success: false, error: "Company not found" });
    }
    res.status(200).json({ success: true, data: company });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// Controller function to update a company by ID
const updateCompany = asyncHandler(async (req, res) => {
  try {
    const companyId = req.params.id;
    const { company_name, location, is_active } = req.body;
    const updatedCompany = await Company.findByIdAndUpdate(
      companyId,
      { company_name, location, is_active },
      { new: true }
    );

    if (!updatedCompany) {
      return res
        .status(404)
        .json({ success: false, error: "Company Not Found" });
    }
    res.status(200).json({ success: true, data: updatedCompany });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Controller function to delete a company by ID
const deleteCompany = asyncHandler(async (req, res) => {
  try {
    const companyId = req.params.id;
    const deleteCompany = await Company.findByIdAndDelete(companyId);
    if (!deleteCompany) {
      return res
        .status(404)
        .json({ success: false, error: "Company not found " });
    }
    res.status(200).json({ success: true, data: deleteCompany });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

export {
  createCompany,
  getAllCompanies,
  getCompanyById,
  updateCompany,
  deleteCompany,
};
