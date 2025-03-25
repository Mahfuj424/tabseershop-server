import { Request, Response } from "express";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import httpStatus from "http-status";
import { OrderService } from "./order.service";

export const createOrder = catchAsync(async (req: Request, res: Response) => {
  const userId = req.body.user;
  const result = await OrderService.createOrder(userId, req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Order placed successfully",
    data: result,
  });
});

export const getUserOrders = catchAsync(async (req: Request, res: Response) => {
  const userId = req.params.userId;
  const result = await OrderService.getUserOrders(userId);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "User orders retrieved successfully",
    data: result,
  });
});

export const getAllOrders = catchAsync(async (_req: Request, res: Response) => {
  const result = await OrderService.getAllOrders();
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "All orders retrieved successfully",
    data: result,
  });
});

export const OrderController = { createOrder, getUserOrders, getAllOrders };
