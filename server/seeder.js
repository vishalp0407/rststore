import colors from "colors";
import dotenv from "dotenv";

import connectDB from "#config/db.config.js";
import products from "#data/products.data.js";
import users from "#data/users.data.js";
import OrderModel from "#models/order.model.js";
import ProductModel from "#models/product.model.js";
import UserModel from "#models/user.model.js";

dotenv.config();

connectDB();

const importData = async () => {
  try {
    await OrderModel.deleteMany();
    await ProductModel.deleteMany();
    await UserModel.deleteMany();

    const createdUsers = await UserModel.insertMany(users);
    const adminUser = createdUsers[0]._id;

    const sampleProducts = products.map((prod) => {
      return { ...prod, user: adminUser };
    });
    await ProductModel.insertMany(sampleProducts);

    console.log(`Data imported`.bgBrightGreen.black);
    process.exit();
  } catch (error) {
    console.error(`${error.message}.red.underline`);
    process.exit(1);
  }
};

const destroyData = async () => {
  try {
    await OrderModel.deleteMany();
    await ProductModel.deleteMany();
    await UserModel.deleteMany();

    console.log(`Data destroyed`.bgBrightRed.black);
    process.exit();
  } catch (error) {
    console.error(`${error.message}`.red.underline);
    process.exit(1);
  }
};

if (process.argv[2] === "-d") {
  destroyData();
} else {
  importData();
}
