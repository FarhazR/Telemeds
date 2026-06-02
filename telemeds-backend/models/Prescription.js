const mongoose = require('mongoose');

const prescriptionSchema = new mongoose.Schema({
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  order_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Order', default: null },
  image_url: { type: String, required: true },
  status: { type: String, enum: ['pending', 'approved', 'rejected'], default: 'pending' }
}, { timestamps: true });

module.exports = mongoose.model('Prescription', prescriptionSchema);