const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema({
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, unique: true },
  items: [
    {
      medicine_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Medicine' },
      name: { type: String, required: true },
      price: { type: Number, required: true },
      quantity: { type: Number, required: true, default: 1 },
      prescription_required: { type: Boolean, default: false }
    }
  ]
}, { timestamps: true });

module.exports = mongoose.model('Cart', cartSchema);