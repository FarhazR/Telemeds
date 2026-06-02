const express = require('express');
const router = express.Router();
const {
  getAllMedicines,
  searchMedicines,
  getAlternatives,
  getMedicineById,
  addMedicine,
  updateMedicine,
  deleteMedicine
} = require('../controllers/medicineController');
const { protect, adminOnly } = require('../middleware/authMiddleware');

router.get('/', getAllMedicines);
router.get('/search', searchMedicines);
router.get('/:id/alternatives', getAlternatives);
router.get('/:id', getMedicineById);
router.post('/', protect, adminOnly, addMedicine);
router.put('/:id', protect, adminOnly, updateMedicine);
router.delete('/:id', protect, adminOnly, deleteMedicine);

module.exports = router;
