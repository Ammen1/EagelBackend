import asyncHandler from "express-async-handler";
import slugify from "slugify";
import { Category } from "../models/CompanyModel.js";

// Controller to create a new category
const createCategory = asyncHandler(async (req, res) => {
  try {
    const { name, is_active } = req.body;
    const baseSlug = slugify(name);
    const category = new Category({
      name,
      is_active,
      slug: baseSlug, // Set the initial slug to the baseSlug before generating a unique one
    });

    // Generate a unique slug before saving the category
    const generateUniqueSlug = async () => {
      const existingCategory = await Category.findOne({ slug: category.slug });
      if (!existingCategory) {
        await category.save();
        res.status(201).json({ success: true, data: category });
      } else {
        category.slug = `${baseSlug}-${Date.now()}`;
        generateUniqueSlug();
      }
    };

    generateUniqueSlug();
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// Controller to get all categories
const getAllCategories = asyncHandler(async (req, res) => {
  try {
    const categories = await Category.find();
    res.status(200).json({ success: true, data: categories });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

export { createCategory, getAllCategories };
