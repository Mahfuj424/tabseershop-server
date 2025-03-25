/* eslint-disable @typescript-eslint/no-unused-vars */
import { UserServices } from "./user-service";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import httpStatus from "http-status";

export const createUser = catchAsync(async (req, res, next) => {
  const userData = req.body;

  const result = await UserServices.createUserIntoDB(userData);

  if (!result) {
    sendResponse(res, {
      statusCode: httpStatus.NOT_FOUND,
      success: false,
      message: "No Data Found",
      data: [],
    });
  }

  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: "User registered successfully",
    data: result,
  });
});

export const UserControllers = {
  createUser,
};
