import config from "../../config";
import { User } from "../user/user-model";
import jwt from "jsonwebtoken";

const logInUserIntoDB = async (email?: string, phone?: string) => {
  if (!email && !phone) {
    return null; // Email & phone দুটোই null হলে কিছু করা হবে না
  }

  const user = await User.findOne({
    $or: [{ email }, { phone }],
  });

  if (!user) {
    return null;
  }

  const jwtPayload = {
    _id: user._id,
    name: user.name,
    email: user.email,
    phone: user.phone,
    address: user.address,
    image: user.image,
  };

  // Create token and send to the user
  const accessToken = jwt.sign(jwtPayload, config.jwt_access_screet as string, {
    expiresIn: config.jwt_access_expires_in,
  });

  return {
    token: accessToken,
    data: jwtPayload,
  };
};

export const AuthServices = {
  logInUserIntoDB,
};
