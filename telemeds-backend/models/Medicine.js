const mongoose = require('mongoose');

const medicineSchema = new mongoose.Schema({
  name: { type: String, required: true },
  composition: { type: String, required: true },
  manufacturer: { type: String },
  price: { type: Number, required: true },
  stock_quantity: { type: Number, default: 0 },
  image_url: { type: String },
  expiry_date: { type: Date },
  prescription_required: { type: Boolean, default: false },
  average_rating: { type: Number, default: 0 }
}, { timestamps: true });

module.exports = mongoose.model('Medicine', medicineSchema);
