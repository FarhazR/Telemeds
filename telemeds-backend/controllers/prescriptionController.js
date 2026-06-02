const Prescription = require('../models/Prescription');
const Order = require('../models/Order');

const uploadPrescription = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded' });
    }
    const { order_id } = req.body;
    const prescription = await Prescription.create({
      user_id: req.user.id,
      image_url: `uploads/${req.file.filename}`,
      status: 'pending',
      order_id: order_id || null
    });
    if (order_id) {
      await Order.findByIdAndUpdate(order_id, {
        prescription_id: prescription._id,
        payment_status: 'paid'
      });
    }
    res.status(201).json(prescription);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

const getMyPrescriptions = async (req, res) => {
  try {
    const prescriptions = await Prescription.find({ user_id: req.user.id })
      .sort({ createdAt: -1 });
    res.json(prescriptions);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

const getAllPrescriptions = async (req, res) => {
  try {
    const prescriptions = await Prescription.find()
      .populate('user_id', 'name email')
      .populate({
        path: 'order_id',
        select: '_id total_amount status items'
      })
      .sort({ createdAt: -1 });
    res.json(prescriptions);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

const verifyPrescription = async (req, res) => {
  const { status } = req.body;
  try {
    const prescription = await Prescription.findByIdAndUpdate(
      req.params.id,
      { status },
      { returnDocument: 'after' }
    );
    if (!prescription) {
      return res.status(404).json({ message: 'Prescription not found' });
    }
    if (prescription.order_id) {
      const orderStatus = status === 'approved' ? 'approved' : 'rejected';
      await Order.findByIdAndUpdate(prescription.order_id, {
        status: orderStatus
      });
    }
    res.json(prescription);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

module.exports = {
  uploadPrescription,
  getMyPrescriptions,
  getAllPrescriptions,
  verifyPrescription
};