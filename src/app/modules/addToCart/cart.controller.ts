import { Request, Response } from "express";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import httpStatus from "http-status";
import { CartService } from "./cart.service";

const createOrUpdateCart = catchAsync(async (req: Request, res: Response) => {
  const result = await CartService.createOrUpdateCart(req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Cart updated successfully",
    data: result,
  });
});

const getUserCart = catchAsync(async (req: Request, res: Response) => {
  const userId = req.params.userId; // Get user ID from request params
  const result = await CartService.getUserCartFromDB(userId);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "User cart retrieved successfully",
    data: result,
  });
});

const updateProductQuantity = catchAsync(
  async (req: Request, res: Response) => {
    const { userId, productId, quantity } = req.body;
    const result = await CartService.updateProductQuantity(
      userId,
      productId,
      quantity
    );
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Product quantity updated",
      data: result,
    });
  }
);

const deleteProductFromCart = catchAsync(
  async (req: Request, res: Response) => {
    const { userId, productId } = req.body;
    const result = await CartService.deleteProductFromCartDB(
      userId,
      productId
    );
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Product Delete From Your Cart",
      data: result,
    });
  }
);

export const CartController = {
  createOrUpdateCart,
  updateProductQuantity,
  getUserCart,
  deleteProductFromCart,
};
