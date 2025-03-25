import { model, Schema } from "mongoose";
import { TUser } from "./user-interface";

const userSchema = new Schema<TUser>(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      default: "",
    },
    address: {
      type: String,
      default: "",
    },
    image: {
      type: String,
      trim: true,
      default: "",
    },
  },
  { timestamps: true }
);

export const User = model<TUser>("User", userSchema);
