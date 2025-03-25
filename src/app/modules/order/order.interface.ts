import { Types } from "mongoose";

export interface IOrder {
  user: Types.ObjectId;
  email?: string;
  phone: string;
  address: string;
  products: {
    product: string;
    quantity: number;
  }[];
  status: "pending" | "shipped" | "delivered";
  paymentMethod: "cash_on_delivery";
}
