import express from "express";

import ProductModel from "#models/product.model.js";
import {
  getProductById,
  getProducts,
} from "#controllers/product.controller.js";
const router = express.Router();

router.get("/", getProducts);

router.get("/:id", getProductById);

export default router;
