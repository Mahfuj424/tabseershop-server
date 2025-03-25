import { Types } from "mongoose";

export interface ICart {
  user: Types.ObjectId;
  products: {
    product: string;
    quantity: number;
  }[];
  totalPrice:number
}
