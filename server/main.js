import express from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import path from "path";

import connectDB from "#config/db.config.js";
import productRoutes from "#routes/product.route.js";
import userRoutes from "#routes/user.route.js";
import { errorHandler } from "#middlewares/error.middleware.js";
import orderRoutes from "#routes/order.route.js";
import uploadRoutes from "#routes/upload.route.js";

dotenv.config();
const port = process.env.PORT;

connectDB();

const app = express();
app.use(morgan("dev"));
app.use(express.json());
app.use(cookieParser());

app.get("/", (req, res) => {
  res.send("Api is running");
});

app.use("/api/v1/products", productRoutes);
app.use("/api/v1/users", userRoutes);
app.use("/api/v1/orders", orderRoutes);
app.use("/api/v1/upload", uploadRoutes);
app.get("/api/v1/config/paypal", (req, res) => {
  res.json({ clientId: process.env.PAYPAL_CLIENT_ID });
});

const __dirname = path.resolve();
app.use("/uploads", express.static(path.join(__dirname, "/uploads")));

app.use(errorHandler);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
