/* eslint-disable prefer-const */
import Product from "../product/product.model";
import { ICart } from "./cart.interface";
import { Cart } from "./cart.model";

// calculate total product price
const calculateTotalPrice = async (
  products: { product: string; quantity: number }[]
) => {
  let total = 0;

  for (const item of products) {
    const product = await Product.findById(item.product);
    if (product) {
      total += product.price * item.quantity;
    }
  }

  return total;
};

const createOrUpdateCart = async (payload: ICart) => {
  const existingCart = await Cart.findOne({ user: payload.user });

  let updatedProducts = payload.products;

  if (existingCart) {
    updatedProducts = [...existingCart.products];

    for (const newProduct of payload.products) {
      const existingProductIndex = updatedProducts.findIndex(
        (p) => p.product.toString() === newProduct.product.toString()
      );

      if (existingProductIndex !== -1) {
        updatedProducts[existingProductIndex].quantity += newProduct.quantity;
      } else {
        updatedProducts.push(newProduct);
      }
    }
  }

  const totalPrice = await calculateTotalPrice(updatedProducts);

  return await Cart.findOneAndUpdate(
    { user: payload.user },
    { $set: { products: updatedProducts, totalPrice } }, // totalPrice ইনক্লুড করা হলো
    { new: true, upsert: true }
  );
};

const updateProductQuantity = async (
  userId: string,
  productId: string,
  quantity: number
) => {
  const cart = await Cart.findOne({ user: userId });

  if (!cart) {
    throw new Error("Cart not found");
  }

  let updatedProducts = [...cart.products];


  for (let i = 0; i < updatedProducts.length; i++) {

    if (updatedProducts[i].product.toString() === productId.toString()) {
      updatedProducts[i].quantity = quantity;
      break;
    }
  }

  const totalPrice = await calculateTotalPrice(updatedProducts);

  return await Cart.findOneAndUpdate(
    { user: userId },
    { $set: { products: updatedProducts, totalPrice } },
    { new: true }
  );
};

const getUserCartFromDB = async (userId: string) => {
  const cart = await Cart.findOne({ user: userId }).populate(
    "products.product"
  ); // Populate product details
  if (!cart) {
    throw new Error("Cart not found for this user");
  }
  return cart;
};


const deleteProductFromCartDB = async (userId: string, productId: string) => {
  const cart = await Cart.findOne({ user: userId });

  if (!cart) {
    throw new Error("Cart not found");
  }

  const updatedProducts = cart.products.filter(
    (p) => p.product.toString() !== productId.toString()
  );

  if (updatedProducts.length === cart.products.length) {
    throw new Error("Product not found in cart");
  }

  const totalPrice = await calculateTotalPrice(updatedProducts);

  return await Cart.findOneAndUpdate(
    { user: userId },
    { $set: { products: updatedProducts, totalPrice } },
    { new: true }
  );
};

export const CartService = {
  createOrUpdateCart,
  updateProductQuantity,
  getUserCartFromDB,
  deleteProductFromCartDB
};
