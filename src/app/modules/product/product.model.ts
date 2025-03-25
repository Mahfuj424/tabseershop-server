import mongoose, { Schema } from "mongoose";
import { IProduct } from "./product.interface";

const ProductSchema = new Schema<IProduct>(
  {
    name: { type: String, required: [true, "Product name is required"] },
    category: { type: String, required: [true, "Category is required"] },
    menu: { type: String, required: [true, "Menu is required"] },
    quantity: { type: Number, required: [true, "Quantity is required"] },
    images: {
      type: [String],
      required: [true, "At least one image is required"],
    },
    size: { type: [String], default: [] },
    colorVariants: { type: [String], default: [] },
    price: { type: Number, required: [true, "Price is required"] },
    bestSellingCount: { type: Number, default: 0 },
    averageRating: { type: Number, default: 0 },
    description: { type: String, required: [true, "Description is required"] },
  },
  { timestamps: true }
);

const Product = mongoose.model<IProduct>("Product", ProductSchema);
export default Product;
