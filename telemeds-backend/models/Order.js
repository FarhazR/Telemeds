const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  prescription_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Prescription' },
  items: [
    {
      medicine_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Medicine' },
      name: String,
      quantity: Number,
      price: Number
    }
  ],
  total_amount: { type: Number, required: true },
  status: {
    type: String,
    enum: ['pending_verification', 'approved', 'rejected', 'shipped', 'delivered'],
    default: 'pending_verification'
  },
  payment_status: { type: String, enum: ['unpaid', 'paid'], default: 'unpaid' }
}, { timestamps: true });

module.exports = mongoose.model('Order', orderSchema);
