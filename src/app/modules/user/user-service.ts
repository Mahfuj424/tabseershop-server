import jwt from "jsonwebtoken";
import config from "../../config";
import { TUser } from "./user-interface";
import { User } from "./user-model";

const createUserIntoDB = async (payload: TUser) => {
  // Check if email or phone is missing or empty
  if (!payload.email && !payload.phone) {
    throw new Error("Either email or phone is required.");
  }
  console.log(payload.email, payload.phone);

  // Check if user with the exact same email or phone already exists
  const existingUser = await User.findOne({
    $or: [
      { email: { $eq: payload.email } }, // Exact match for email
      { phone: { $eq: payload.phone } }, // Exact match for phone
    ],
  });
  console.log(existingUser);

  if (existingUser) {
    const jwtPayload = {
      _id: existingUser._id,
      name: existingUser.name,
      email: existingUser.email,
      phone: existingUser.phone,
      address: existingUser.address,
      image: existingUser.image,
    };

    const accessToken = jwt.sign(
      jwtPayload,
      config.jwt_access_screet as string,
      {
        expiresIn: config.jwt_access_expires_in,
      }
    );

    return {
      token: accessToken,
      data: jwtPayload,
    };
  }

  // If user doesn't exist, create a new user
  const result = await User.create(payload);
  return result;
};



export const UserServices = {
  createUserIntoDB,
};
