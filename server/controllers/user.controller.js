import jwt from "jsonwebtoken";
import generateToken from "#utils/generate-token.utils.js";
import UserModel from "#models/user.model.js";

/**
 * @desc		Auth user
 * @route		POST /api/users/login
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
 * @route		POST /api/users
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
  res.send("Logout user");
};

/**
 * @desc		Get user profile
 * @route		GET /api/users/profile
 * @access	Private
 */
const getUserProfile = async (req, res) => {
  res.send("Get user profile");
};

/**
 * @desc		Update user profile
 * @route		PUT /api/users/profile
 * @access	Private
 */
const updateUserProfile = async (req, res) => {
  res.send("Update user profile");
};

/**
 * @desc		Get all users
 * @route		GET /api/users
 * @access	Private/Admin
 */
const getUsers = async (req, res) => {
  res.send("Get Users");
};

/**
 * @desc		Get user by ID
 * @route		GET /api/users/:id
 * @access	Private/Admin
 */
const getUserById = async (req, res) => {
  res.send("Get user by ID");
};

/**
 * @desc		Delete user
 * @route		DELETE /api/users/:id
 * @access	Private/Admin
 */
const deleteUser = async (req, res) => {
  res.send("Delete user");
};

/**
 * @desc		Update user
 * @route		PUT /api/users/:id
 * @access	Private/Admin
 */
const updateUser = async (req, res) => {
  res.send("Update user");
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
