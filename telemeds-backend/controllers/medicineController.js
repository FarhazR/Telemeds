const Medicine = require('../models/Medicine');

// GET /api/medicines
const getAllMedicines = async (req, res) => {
  try {
    const medicines = await Medicine.find();
    res.json(medicines);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

// GET /api/medicines/search?q=paracetamol
const searchMedicines = async (req, res) => {
  const { q } = req.query;
  try {
    const medicines = await Medicine.find({
      $or: [
        { name: { $regex: q, $options: 'i' } },
        { composition: { $regex: q, $options: 'i' } }
      ]
    });
    res.json(medicines);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

// GET /api/medicines/:id/alternatives
const getAlternatives = async (req, res) => {
  try {
    const medicine = await Medicine.findById(req.params.id);
    if (!medicine) {
      return res.status(404).json({ message: 'Medicine not found' });
    }
    const alternatives = await Medicine.find({
      composition: medicine.composition,
      _id: { $ne: medicine._id }
    });
    res.json(alternatives);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

// GET /api/medicines/:id
const getMedicineById = async (req, res) => {
  try {
    const medicine = await Medicine.findById(req.params.id);
    if (!medicine) {
      return res.status(404).json({ message: 'Medicine not found' });
    }
    res.json(medicine);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

// POST /api/medicines (admin only)
const addMedicine = async (req, res) => {
  try {
    const medicine = await Medicine.create(req.body);
    res.status(201).json(medicine);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

// PUT /api/medicines/:id (admin only)
const updateMedicine = async (req, res) => {
  try {
    const medicine = await Medicine.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(medicine);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

// DELETE /api/medicines/:id (admin only)
const deleteMedicine = async (req, res) => {
  try {
    await Medicine.findByIdAndDelete(req.params.id);
    res.json({ message: 'Medicine deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

module.exports = {
  getAllMedicines,
  searchMedicines,
  getAlternatives,
  getMedicineById,
  addMedicine,
  updateMedicine,
  deleteMedicine
};