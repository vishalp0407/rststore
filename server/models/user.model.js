import mongoose from "mongoose";

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "User's full name is required"],
    },
    email: {
      type: String,
      required: [true, "User's email address is required"],
      unique: [true, "User's email must be unique"],
    },
    password: {
      type: String,
      required: [true, "User's password is required"],
    },
    isAdmin: {
      type: Boolean,
      required: [true, "User's admin status is required"],
      default: false,
    },
  },
  {
    timestamps: true,
    collection: "users",
  }
);

const UserModel = mongoose.model("UserModel", userSchema);

export default UserModel;
