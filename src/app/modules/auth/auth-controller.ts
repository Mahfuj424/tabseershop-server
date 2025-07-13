/* eslint-disable @typescript-eslint/no-unused-vars */
import { AuthServices } from "./auth-service";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import httpStatus from "http-status";

const logInUser = catchAsync(async (req, res, next) => {
  const { email, phone } = req.body;
  // Check if both email and phone are missing
  if (!email && !phone) {
    return sendResponse(res, {
      statusCode: httpStatus.BAD_REQUEST,
      success: false,
      message: "Email or phone number is required.",
      data: [],
    });
  }

  // Call the service to log in user
  const result = await AuthServices.logInUserIntoDB(email, phone);

  if (!result) {
    return sendResponse(res, {
      statusCode: httpStatus.NOT_FOUND,
      success: false,
      message: "No Data Found",
      data: [],
    });
  }

  return sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "User logged in successfully",
    token: result.token,
    data: result.data,
  });
});

export const AuthControllers = {
  logInUser,
};
