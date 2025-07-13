/* eslint-disable @typescript-eslint/no-explicit-any */
import { Cart } from "../addToCart/cart.model";
import Product from "../product/product.model";
import { IOrder } from "./order.interface";
import { Order } from "./order.model";


const createOrder = async (userId: string, orderData: IOrder) => {
  const cart = await Cart.findOne({ user: userId }).populate("products.product"); // Populate products
  if (!cart || cart.products.length === 0) {
    throw new Error("Cart is empty");
  }

  // Stock Update in Product Model
  for (const item of cart.products) {
    const product = await Product.findById(item.product); // Find product from Product Model

    if (!product) {
      throw new Error(`Product not found: ${item.product}`);
    }

    if (product.quantity < item.quantity) {
      throw new Error(`Not enough stock for product: ${product.name}`);
    }

    product.quantity -= item.quantity; // Reduce stock
    product.bestSellingCount += item.quantity; // Increase best selling count
    await product.save(); // Save updated product data
  }

  // Create Order
  const newOrder = await Order.create({
    user: userId,
    email: orderData.email,
    phone: orderData.phone,
    address: orderData.address,
    products: cart.products,
    paymentMethod: "cash_on_delivery",
  });

  await Cart.findOneAndDelete({ user: userId }); // Clear cart after order
  return newOrder;
};


const getUserOrders = async (userId: string) => {
  return await Order.find({ user: userId }).populate("products.product");
};

const getAllOrders = async () => {
  return await Order.find().populate("products.product").populate('user');
};

export const OrderService = { createOrder, getUserOrders, getAllOrders };
