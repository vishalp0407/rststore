import express from "express";

import {
  createProduct,
  getProductById,
  getProducts,
  updateProduct,
  deleteProduct,
  createProductReview,
} from "#controllers/product.controller.js";
import { admin, protect } from "#middlewares/auth.middleware.js";

const router = express.Router();

router.route("/").get(getProducts).post(protect, admin, createProduct);
router
  .route("/:id")
  .get(getProductById)
  .put(protect, admin, updateProduct)
  .delete(protect, admin, deleteProduct);
router.route("/:id/reviews").post(protect, createProduct);
export default router;
