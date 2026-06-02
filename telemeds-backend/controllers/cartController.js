const Cart = require('../models/Cart');

// GET /api/cart
const getCart = async (req, res) => {
  try {
    const cart = await Cart.findOne({ user_id: req.user.id });
    if (!cart) return res.json({ items: [] });
    res.json(cart);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

// POST /api/cart/add
const addToCart = async (req, res) => {
  const { medicine_id, name, price, quantity, prescription_required } = req.body;
  try {
    let cart = await Cart.findOne({ user_id: req.user.id });

    if (!cart) {
      cart = await Cart.create({
        user_id: req.user.id,
        items: [{ medicine_id, name, price, quantity: quantity || 1, prescription_required: prescription_required || false }]
      });
      return res.json(cart);
    }

    const existingItem = cart.items.find(
      i => i.medicine_id.toString() === medicine_id
    );

    if (existingItem) {
      existingItem.quantity += quantity || 1;
    } else {
      cart.items.push({ medicine_id, name, price, quantity: quantity || 1, prescription_required: prescription_required || false });
    }

    await cart.save();
    res.json(cart);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

// DELETE /api/cart/remove/:medicineId
const removeFromCart = async (req, res) => {
  try {
    const cart = await Cart.findOne({ user_id: req.user.id });
    if (!cart) return res.status(404).json({ message: 'Cart not found' });

    cart.items = cart.items.filter(
      i => i.medicine_id.toString() !== req.params.medicineId
    );

    await cart.save();
    res.json(cart);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

// DELETE /api/cart/clear
const clearCart = async (req, res) => {
  try {
    const cart = await Cart.findOne({ user_id: req.user.id });
    if (!cart) return res.json({ message: 'Cart already empty' });

    cart.items = [];
    await cart.save();
    res.json({ message: 'Cart cleared' });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

module.exports = { getCart, addToCart, removeFromCart, clearCart };