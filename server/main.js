import express from "express";
import dotenv from "dotenv";

import products from "./data/products.data.js";
import connectDB from "./config/db.config.js";

dotenv.config();
const port = process.env.PORT;

connectDB();

const app = express();

app.get("/", (req, res) => {
  res.send("Api is running");
});

app.get("/api/v1/products", (req, res) => {
  res.json(products);
});

app.get("/api/v1/products/:id", (req, res) => {
  const product = products.find((prod) => prod._id === req.params.id);
  if (product) {
    res.json(product);
  } else {
    res.status(404);
    res.json({ message: "Product not found" });
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
