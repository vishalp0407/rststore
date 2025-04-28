import mongoose from "mongoose";
import bcrypt from "bcryptjs";

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
// when user login than compar the password
userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

// when user the register the hasing their
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

const UserModel = mongoose.model("UserModel", userSchema);

export default UserModel;
