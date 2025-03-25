import { Router } from "express";
import { OrderController } from "./order.controller";

const router = Router();

router.post("/place-order", OrderController.createOrder);
router.get("/user/:userId", OrderController.getUserOrders);
router.get("/all", OrderController.getAllOrders);

export const OrderRoutes = router;