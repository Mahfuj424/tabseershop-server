/* eslint-disable @typescript-eslint/no-explicit-any */
import { IProduct } from "./product.interface";
import Product from "./product.model";

// Create a new product
const createProductIntoDB = async (payload: IProduct) => {
  const product = new Product(payload);
  return await product.save();
};

// Get all products with filters, sorting, and pagination
const getAllProducts = async (filters: any) => {
  const query: any = {};

  // Filtering by category (if category is a direct property of Product model)
  if (filters.category) {
    query.category = { $regex: filters.category, $options: "i" }; // Case-insensitive search
  }

  // Filtering by menu (exact match for 'men' or 'women')
  if (filters.menu) {
    query.menu = { $regex: `^${filters.menu}$`, $options: "i" }; // Exact match for 'men' or 'women'
  }

  // Filtering by product name (case-insensitive search)
  if (filters.name) {
    query.name = { $regex: filters.name, $options: "i" };
  }

  // Filtering by price range
  if (filters.minPrice || filters.maxPrice) {
    query.price = {};
    if (filters.minPrice) query.price.$gte = Number(filters.minPrice);
    if (filters.maxPrice) query.price.$lte = Number(filters.maxPrice);
  }

  // Sorting based on price or other criteria
  const sortOption: any = {};
  if (filters.sortOrder === "desc") {
    sortOption.price = -1;
  } else {
    sortOption.price = 1;
  }

  // Pagination
  const page = Number(filters.page) || 1;
  const limit = Number(filters.limit) || 10;
  const skip = (page - 1) * limit;

  try {
    return await Product.find(query)
      .sort(sortOption)
      .skip(skip)
      .limit(limit);
  } catch (error) {
    console.error("Error fetching products:", error);
    throw error; // Or handle the error more gracefully
  }
};


// Get a single product by ID
const getProductById = async (id: string) => {
  return await Product.findById(id);
};

// Update a product by ID
const updateProductById = async (id: string, updateData: any) => {
  return await Product.findByIdAndUpdate(id, updateData, { new: true });
};

// Delete a product by ID
const deleteProductById = async (id: string) => {
  return await Product.findByIdAndDelete(id);
};

export const ProductServices = {
  createProductIntoDB,
  getAllProducts,
  getProductById,
  updateProductById,
  deleteProductById,
};
