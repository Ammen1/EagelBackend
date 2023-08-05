import express from "express";
import {
  createCompany,
  getAllCompanies,
  getCompanyById,
  updateCompany,
  deleteCompany,
} from "../controllers/companyController.js";

const router = express.Router();

// Define the routes for companies
router.post("/company", createCompany);
router.get("/company", getAllCompanies);
router.get("/company/:id", getCompanyById);
router.put("/company/:id", updateCompany);
router.delete("/company/:id", deleteCompany);

export default router;
