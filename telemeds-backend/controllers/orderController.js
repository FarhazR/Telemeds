const Order = require('../models/Order');

const placeOrder = async (req, res) => {
  const { items, total_amount, prescription_id } = req.body;
  try {
    const order = await Order.create({
      user_id: req.user.id,
      items,
      total_amount,
      prescription_id: prescription_id || null,
      status: 'pending_verification',
      payment_status: 'unpaid'
    });
    res.status(201).json(order);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

const getMyOrders = async (req, res) => {
  try {
    const orders = await Order.find({ user_id: req.user.id })
      .populate('prescription_id', 'image_url status')
      .sort({ createdAt: -1 });
    res.json(orders);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

const getOrderById = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order) return res.status(404).json({ message: 'Order not found' });
    res.json(order);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

const payOrder = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order) return res.status(404).json({ message: 'Order not found' });
    order.payment_status = 'paid';
    await order.save();
    res.json({ message: 'Payment successful', order });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

const updateOrderStatus = async (req, res) => {
  const { status } = req.body;
  try {
    const order = await Order.findByIdAndUpdate(
      req.params.id,
      { status },
      { returnDocument: 'after' }
    );
    if (!order) return res.status(404).json({ message: 'Order not found' });
    res.json(order);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find()
      .populate('user_id', 'name email')
      .populate('prescription_id', 'image_url status')
      .sort({ createdAt: -1 });
    res.json(orders);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

module.exports = {
  placeOrder,
  getMyOrders,
  getOrderById,
  payOrder,
  updateOrderStatus,
  getAllOrders
};