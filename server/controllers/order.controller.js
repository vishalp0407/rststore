import OrderModel from "#models/order.model.js";

/**
 * @desc		Create new order
 * @route		POST /api/orders
 * @access	Private
 */
const createOrder = async (req, res) => {
  res.send("Create order");
};

/**
 * @desc		Get logged in user's order
 * @route		GET /api/orders/my-orders
 * @access	Private
 */
const getMyOrders = async (req, res) => {
  res.send("Get my orders");
};

/**
 * @desc		Get order by ID
 * @route		GET /api/orders/:id
 * @access	Private
 */
const getOrderById = async (req, res) => {
  res.send("Get order by ID");
};

/**
 * @desc		Update order to paid
 * @route		PUT /api/orders/:id/pay
 * @access	Private
 */
const updateOrderToPaid = async (req, res) => {
  res.send("Update order to paid");
};

/**
 * @desc		Update order to delivered
 * @route		PUT /api/orders/:id/deliver
 * @access	Private/Admin
 */
const updateOrderToDelivered = async (req, res) => {
  res.send("Update order to delivered");
};

/**
 * @desc		Get all orders
 * @route		GET /api/orders
 * @access	Private/Admin
 */
const getOrders = async (req, res) => {
  res.send("Get all orders");
};

export {
  createOrder,
  getMyOrders,
  getOrderById,
  getOrders,
  updateOrderToDelivered,
  updateOrderToPaid,
};
