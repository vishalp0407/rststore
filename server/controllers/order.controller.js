import OrderModel from "#models/order.model.js";

/**
 * @desc		Create new order
 * @route		POST /api/orders
 * @access	Private
 */
const createOrder = async (req, res) => {
  const {
    orderItems,
    shippingAddress,
    paymentMethod,
    itemsPrice,
    shippingPrice,
    taxPrice,
    totalPrice,
  } = req.body;
  if (orderItems && orderItems.legth === 0) {
    res.status(4000);
    throw new Error("No order items");
  } else {
    const order = new OrderModel({
      orderItems: orderItems.map((item) => ({
        ...item,
        product: { ...item },
      })),
      user: req.user._id,
      shippingAddress,
      paymentMethod,
      itemsPrice,
      shippingPrice,
      taxPrice,
      totalPrice,
    });
    const createdOrder = await order.save();
    res.status(201).json(createdOrder);
  }
};

/**
 * @desc		Get logged in user's order
 * @route		GET /api/orders/mine
 * @access	Private
 */
const getMyOrders = async (req, res) => {
  const orders = await OrderModel.find({ user: req.user._id });
  res.status(200).json(orders);
};

/**
 * @desc		Get order by ID
 * @route		GET /api/orders/:id
 * @access	Private
 */
const getOrderById = async (req, res) => {
  const order = await OrderModel.findById(req.params.id).populate(
    "user",
    "name email"
  );
  if (order) {
    res.status(200).json(order);
  } else {
    res.status(404);
    throw new Error("Order not found");
  }
};

/**
 * @desc		Update order to paid
 * @route		PUT /api/orders/:id/pay
 * @access	Private
 */
const updateOrderToPaid = async (req, res) => {
  const order = await OrderModel.findById(req.params.id);

  if (order) {
    order.ispaid = true;
    order.paidAt = Date.now();
    order.paymentResult = {
      id: req.body.status,
      update_time: req.body.update_time,
      email_address: req.body.payer.email_address,
    };
    const updaatedOrder = await order.save();
    res.status(200).json(updaatedOrder);
  } else {
    res.status(404);
    throw new Error("Order not found");
  }
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
