import express from "express";

import {
  createProduct,
  getProductById,
  getProducts,
} from "#controllers/product.controller.js";
import { admin, protect } from "#middlewares/auth.middleware.js";

const router = express.Router();

router.route("/").get(getProducts).post(protect, admin, createProduct);
router.route("/:id").get(getProductById);

export default router;
