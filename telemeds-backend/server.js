process.env.MONGO_URI = 'mongodb://127.0.0.1:27017/telemedssdb';
process.env.JWT_SECRET = 'telemeds_super_secret_key';
process.env.PORT = '5000';

const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');

connectDB();

const app = express();
app.use(cors());
app.use(express.json());
app.use('/uploads', express.static('uploads'));

app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/medicines', require('./routes/medicineRoutes'));
app.use('/api/orders', require('./routes/orderRoutes'));
app.use('/api/prescriptions', require('./routes/prescriptionRoutes'));
app.use('/api/cart', require('./routes/cartRoutes'));

app.get('/', (req, res) => res.send('Telemeds API running'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
