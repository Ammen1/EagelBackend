import asyncHandler from "express-async-handler";
import { Address } from "../models/JobSeekerModel.js"; // Assuming the Address model is exported correctly in "../models"

// Controller to create a new address
const createAddress = asyncHandler(async (req, res) => {
  try {
    const { customer, phone, town_city } = req.body;
    const address = new Address({
      customer,
      phone,
      town_city,
    });
    await address.save();
    res.status(201).json({ success: true, data: address });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// Controller to get all addresses for a specific customer
const getAddressesByCustomer = asyncHandler(async (req, res) => {
  try {
    const customerId = req.params.customerId;
    const addresses = await Address.find({ customer: customerId });
    res.status(200).json({ success: true, data: addresses });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

export { createAddress, getAddressesByCustomer };
