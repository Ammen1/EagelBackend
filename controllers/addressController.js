import asyncHandler from "express-async-handler";
import { Address } from "../models/JobSeekerModel.js"; // Assuming the Address model is exported correctly in "../models"

// Controller to create a new address

const createAddress = asyncHandler(async (req, res) => {
  try {
    const { phone, town_city } = req.body;
    const address = new Address({
      phone,
      town_city,
    });
    await address.save();
    res.status(201).json({ success: true, data: address });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

//controller to get app addresses
const getAllAddresses = asyncHandler(async (req, res) => {
  try {
    const all = await Address.find({});
    if (!all) {
      return res.status.json({ error: "address are not found...!" });
    }
    res.status(200).json({ success: true, data: all });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

//Controller to get al addresses for a specific customer
const getAddressesByCustomer = asyncHandler(async (req, res) => {
  try {
    const customerId = req.params.customerId;
    const addresses = await Address.findById({ customer: customerId });
    if (!addresses) {
      return res.status(404).json({ error: "address is not found...!" });
    }
    res.status(200).json({ success: true, data: addresses });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

export { createAddress, getAddressesByCustomer, getAllAddresses };
