/* eslint-disable @typescript-eslint/no-unused-vars */

import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import httpStatus from "http-status";
import { CategoryServices } from "./category.service";

// ✅ Create Category
export const createCategory = catchAsync(async (req, res, next) => {
  const categoryData = req.body;

  const result = await CategoryServices.createCategoryIntoDB(categoryData);

  if (!result) {
    sendResponse(res, {
      statusCode: httpStatus.BAD_REQUEST,
      success: false,
      message: "Category creation failed",
      data: [],
    });
  }

  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: "Category created successfully",
    data: result,
  });
});

// ✅ Get All Categories
export const getCategories = catchAsync(async (req, res, next) => {
  const result = await CategoryServices.getAllCategories();

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Categories retrieved successfully",
    data: result,
  });
});

// ✅ Get Single Category by ID
export const getCategoryById = catchAsync(async (req, res, next) => {
  const categoryId = req.params.id;

  const result = await CategoryServices.getCategoryById(categoryId);

  if (!result) {
    sendResponse(res, {
      statusCode: httpStatus.NOT_FOUND,
      success: false,
      message: "Category not found",
      data: [],
    });
  }

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Category retrieved successfully",
    data: result,
  });
});

// ✅ Update Category
export const updateCategory = catchAsync(async (req, res, next) => {
  const categoryId = req.params.id;
  const updateData = req.body;

  const result = await CategoryServices.updateCategoryById(
    categoryId,
    updateData
  );

  if (!result) {
    sendResponse(res, {
      statusCode: httpStatus.NOT_FOUND,
      success: false,
      message: "Category not found",
      data: [],
    });
  }

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Category updated successfully",
    data: result,
  });
});

// ✅ Delete Category
export const deleteCategory = catchAsync(async (req, res, next) => {
  const categoryId = req.params.id;

  const result = await CategoryServices.deleteCategoryById(categoryId);

  if (!result) {
    sendResponse(res, {
      statusCode: httpStatus.NOT_FOUND,
      success: false,
      message: "Category not found",
      data: [],
    });
  }

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Category deleted successfully",
    data: result,
  });
});

export const CategoryControllers = {
  createCategory,
  getCategories,
  getCategoryById,
  updateCategory,
  deleteCategory,
};
