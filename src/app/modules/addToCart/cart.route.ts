import { Router } from "express";
import { CartController } from "./cart.controller";

const router = Router();

router.post("/add-to-cart", CartController.createOrUpdateCart);
router.patch("/update-quantity", CartController.updateProductQuantity);
router.get("/:userId", CartController.getUserCart);
router.delete("/delete-cart-item", CartController.deleteProductFromCart);

export const CartRoutes = router;