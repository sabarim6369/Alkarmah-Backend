const Order = require("../models/Order");

exports.placeOrder = async (req, res) => {
  try {
    const order = new Order(req.body);
    await order.save();
    return res.status(201).json({ message: "Order placed", order });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Failed to place order", error });
  }
};

exports.getUserOrders = async (req, res) => {
  try {
    const userId = req.query.userId;
    if (!userId) {
      return res.status(400).json({ message: "Missing userId query parameter" });
    }
    const orders = await Order.find({ user: userId }).populate("items.product");
    return res.status(200).json(orders);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error fetching user orders", error });
  }
};

exports.getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find().populate("user items.product");
    return res.status(200).json(orders);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error fetching all orders", error });
  }
};

exports.updateOrderStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (!status) {
      return res.status(400).json({ message: "Missing status in request body" });
    }

    const order = await Order.findByIdAndUpdate(id, { status }, { new: true });

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    return res.status(200).json({ message: "Order status updated", order });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Failed to update order status", error });
  }
};
