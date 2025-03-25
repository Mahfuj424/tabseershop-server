import express from "express";
import { CategoryControllers } from "./category.controller";

const router = express.Router();

router.post("/", CategoryControllers.createCategory);
router.get("/", CategoryControllers.getCategories);
router.get("/:id", CategoryControllers.getCategoryById);
router.put("/:id", CategoryControllers.updateCategory);
router.delete("/:id", CategoryControllers.deleteCategory);

export const CategoryRoutes = router;
