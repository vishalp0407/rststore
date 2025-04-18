import express from "express";
import dotenv from "dotenv";
import morgan from "morgan";

// import products from "./data/products.data.js";
// import products from "#data/products.data.js";

import connectDB from "#config/db.config.js";
import productRoutes from "#routes/product.route.js";
import { errorHandler } from "#middlewares/error.middleware.js";

dotenv.config();
const port = process.env.PORT;

connectDB();

const app = express();
app.use(morgan("dev"));

app.get("/", (req, res) => {
  res.send("Api is running");
});

app.use("/api/v1/products", productRoutes);

app.use(errorHandler);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
