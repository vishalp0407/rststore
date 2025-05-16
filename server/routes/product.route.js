import express from "express";

import {
  createProduct,
  getProductById,
  getProducts,
  updateProduct,
} from "#controllers/product.controller.js";
import { admin, protect } from "#middlewares/auth.middleware.js";

const router = express.Router();

router.route("/").get(getProducts).post(protect, admin, createProduct);
router.route("/:id").get(getProductById).put(protect, admin, updateProduct);

export default router;
