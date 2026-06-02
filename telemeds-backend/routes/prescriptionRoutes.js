const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const {
  uploadPrescription,
  getMyPrescriptions,
  getAllPrescriptions,
  verifyPrescription
} = require('../controllers/prescriptionController');
const { protect, adminOnly } = require('../middleware/authMiddleware');

// Multer config
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    const uniqueName = `${Date.now()}-${Math.round(Math.random() * 1e9)}${path.extname(file.originalname)}`;
    cb(null, uniqueName);
  }
});

const upload = multer({
  storage,
  fileFilter: (req, file, cb) => {
    const allowed = /jpeg|jpg|png|pdf|image/;
    const mimeType = allowed.test(file.mimetype.toLowerCase());
    if (mimeType) {
      cb(null, true);
    } else {
      cb(new Error('Only images and PDFs are allowed'));
    }
  }
});

router.post('/upload', protect, upload.single('prescription'), uploadPrescription);
router.get('/mine', protect, getMyPrescriptions);
router.get('/', protect, adminOnly, getAllPrescriptions);
router.put('/:id/verify', protect, adminOnly, verifyPrescription);

module.exports = router;