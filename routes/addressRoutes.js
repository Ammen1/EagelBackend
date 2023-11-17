import express from "express";
import {
  createAddress,
  getAddressesByCustomer,
  getAllAddresses,
} from "../controllers/addressController.js";
const router = express.Router();

// Route to create a new address
router.post("/address", createAddress);
router.get("/address", getAllAddresses);

// Route to get all addresses for a specific customer
router.get("/addresses/:customerId", getAddressesByCustomer);

export default router;
