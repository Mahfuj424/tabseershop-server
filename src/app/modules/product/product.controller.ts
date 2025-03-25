/* eslint-disable @typescript-eslint/no-unused-vars */
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import httpStatus from "http-status";
import { ProductServices } from "./product.service";

// Create Product
export const createProduct = catchAsync(async (req, res, next) => {
  const productData = req.body;

  const result = await ProductServices.createProductIntoDB(productData);

  if (!result) {
    sendResponse(res, {
      statusCode: httpStatus.BAD_REQUEST,
      success: false,
      message: "Product creation failed",
      data: [],
    });
  }

  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: "Product created successfully",
    data: result,
  });
});

// Get All Products with Filtering, Sorting, & Pagination
export const getProducts = catchAsync(async (req, res, next) => {
  const filters = req.query; // Query params for filtering
  console.log("filters names", filters)

  const result = await ProductServices.getAllProducts(filters);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Products retrieved successfully",
    data: result,
  });
});

// Get Single Product by ID
export const getProductById = catchAsync(async (req, res, next) => {
  const productId = req.params.id;

  const result = await ProductServices.getProductById(productId);

  if (!result) {
    sendResponse(res, {
      statusCode: httpStatus.NOT_FOUND,
      success: false,
      message: "Product not found",
      data: [],
    });
  }

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Product retrieved successfully",
    data: result,
  });
});

// Update Product
export const updateProduct = catchAsync(async (req, res, next) => {
  const productId = req.params.id;
  const updateData = req.body;

  const result = await ProductServices.updateProductById(productId, updateData);

  if (!result) {
    sendResponse(res, {
      statusCode: httpStatus.NOT_FOUND,
      success: false,
      message: "Product not found",
      data: [],
    });
  }

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Product updated successfully",
    data: result,
  });
});

// Delete Product
export const deleteProduct = catchAsync(async (req, res, next) => {
  const productId = req.params.id;

  const result = await ProductServices.deleteProductById(productId);

  if (!result) {
    sendResponse(res, {
      statusCode: httpStatus.NOT_FOUND,
      success: false,
      message: "Product not found",
      data: [],
    });
  }

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Product deleted successfully",
    data: result,
  });
});

export const ProductControllers = {
  createProduct,
  getProducts,
  getProductById,
  updateProduct,
  deleteProduct,
};
