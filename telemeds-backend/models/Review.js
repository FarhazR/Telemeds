const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  medicine_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Medicine', required: true },
  rating: { type: Number, required: true, min: 1, max: 5 },
  comment: { type: String }
}, { timestamps: true });

// Enforce one review per user per medicine
reviewSchema.index({ user_id: 1, medicine_id: 1 }, { unique: true });

module.exports = mongoose.model('Review', reviewSchema);
