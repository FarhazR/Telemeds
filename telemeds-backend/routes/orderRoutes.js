const express = require('express');
const router = express.Router();
const {
  placeOrder,
  getMyOrders,
  getOrderById,
  payOrder,
  updateOrderStatus,
  getAllOrders
} = require('../controllers/orderController');
const { protect, adminOnly } = require('../middleware/authMiddleware');

router.post('/', protect, placeOrder);
router.get('/myorders', protect, getMyOrders);
router.get('/:id', protect, getOrderById);
router.put('/:id/pay', protect, payOrder);
router.put('/:id/status', protect, adminOnly, updateOrderStatus);
router.get('/', protect, adminOnly, getAllOrders);

module.exports = router;