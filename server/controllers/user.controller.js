import jwt from "jsonwebtoken";
import generateToken from "#utils/generate-token.utils.js";
import UserModel from "#models/user.model.js";

/**
 * @desc		Auth user
 * @route		POST /api/v1/users/login
 * @access	Public
 */
const authUser = async (req, res) => {
  const { email, password } = req.body;

  const user = await UserModel.findOne({ email });

  if (user && (await user.matchPassword(password))) {
    generateToken(res, user._id);
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    });
  } else {
    res.status(401);
    throw new Error("Invalid email or password");
  }
};

/**
 * @desc		Register user
 * @route		POST /api/v1/users
 * @access	Public
 */
const registerUser = async (req, res) => {
  const { name, email, password } = req.body;

  const userExists = await UserModel.findOne({ email });

  if (userExists) {
    res.status(400);
    throw new Error("user already exists");
  }
  const user = await UserModel.create({ name, email, password });
  if (user) {
    generateToken(res, user._id);

    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    });
  } else {
    res.status(400);
    throw new Error("Invalid  user data");
  }
};

/**
 * @desc		Logout user
 * @route		POST /api/users
 * @access	Private
 */
const logoutUser = async (req, res) => {
  res.cookie("jwt", "", {
    httpOnly: true,
    expires: new Date(0),
  });
  res.status(200).json({ message: "User logged out" });
};

/**
 * @desc		Get user profile
 * @route		GET /api/v1/users/profile
 * @access	Private
 */
const getUserProfile = async (req, res) => {
  const user = await UserModel.findById(req.user._id);
  if (user) {
    res.status(200).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
};

/**
 * @desc		Update user profile
 * @route		PUT /api/v1/users/profile
 * @access	Private
 */
const updateUserProfile = async (req, res) => {
  const user = await UserModel.findById(req.user._id);
  if (user) {
    (user.name = req.body.name || user.name),
      (user.email = req.body.email || user.email);

    if (req.body.password) {
      user.password = req.body.password;
    }

    const updatedUser = await user.save();

    generateToken(res, updateUser._id);

    res.status(200).json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      isAdmin: updatedUser.isAdmin,
    });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
};

/**
 * @desc		Get all users
 * @route		GET /api/users
 * @access	Private/Admin
 */
const getUsers = async (req, res) => {
  const users = await UserModel.find({});
  res.status(200).json(users);
};

/**
 * @desc		Get user by ID
 * @route		GET /api/users/:id
 * @access	Private/Admin
 */
const getUserById = async (req, res) => {
  const user = await UserModel.findById(req.params.id).select("-password");
  if (user) {
    res.status(200).json(user);
  } else {
    res.status(404);
    throw new Error("User not found");
  }
};

/**
 * @desc		Delete user
 * @route		DELETE /api/users/:id
 * @access	Private/Admin
 */
const deleteUser = async (req, res) => {
  const user = await UserModel.findById(req.params.id);
  if (user) {
    if (user.isAdmin) {
      res.status(400);
      throw new Error("You cannot delete an admin user");
    }
    await UserModel.deleteOne({ _id: req.params.id });
    res.status(200).json({ message: "User deleted successfully" });
  } else {
    res.status(404);
    throw new error("User not found");
  }
};

/**
 * @desc		Update user
 * @route		PUT /api/users/:id
 * @access	Private/Admin
 */
const updateUser = async (req, res) => {
  const user = await UserModel.findById(req.params.id);
  if (user) {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    user.isAdmin = req.body.isAdmin;
    const updatedUser = await user.save();
    res.status(200).json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      isAdmin: updatedUser.isAdmin,
    });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
};

export {
  authUser,
  deleteUser,
  getUserById,
  getUserProfile,
  getUsers,
  logoutUser,
  registerUser,
  updateUser,
  updateUserProfile,
};
