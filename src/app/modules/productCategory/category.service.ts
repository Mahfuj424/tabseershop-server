/* eslint-disable @typescript-eslint/no-explicit-any */

import { ICategory } from "./category.interface";
import Category from "./category.model";

// ✅ Create a new category
const createCategoryIntoDB = async (payload: ICategory) => {
  const category = new Category(payload);
  return await category.save();
};

// ✅ Get all categories
const getAllCategories = async () => {
  return await Category.find().populate("parent").populate("children");
};

// ✅ Get a single category by ID
const getCategoryById = async (id: string) => {
  return await Category.findById(id).populate("parent").populate("children");
};

// ✅ Update a category by ID
const updateCategoryById = async (id: string, updateData: any) => {
  return await Category.findByIdAndUpdate(id, updateData, { new: true });
};

// ✅ Delete a category by ID
const deleteCategoryById = async (id: string) => {
  return await Category.findByIdAndDelete(id);
};

export const CategoryServices = {
  createCategoryIntoDB,
  getAllCategories,
  getCategoryById,
  updateCategoryById,
  deleteCategoryById,
};
