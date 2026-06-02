process.env.MONGO_URI = 'mongodb://127.0.0.1:27017/telemedssdb';

const mongoose = require('mongoose');
const Medicine = require('./models/Medicine');

const medicines = [
  {
    name: 'Dolo 650',
    composition: 'Paracetamol 650mg',
    manufacturer: 'Micro Labs',
    price: 30,
    stock_quantity: 100,
    prescription_required: false,
    average_rating: 4.5
  },
  {
    name: 'Crocin 650',
    composition: 'Paracetamol 650mg',
    manufacturer: 'GSK',
    price: 35,
    stock_quantity: 80,
    prescription_required: false,
    average_rating: 4.2
  },
  {
    name: 'Calpol 650',
    composition: 'Paracetamol 650mg',
    manufacturer: 'GSK',
    price: 28,
    stock_quantity: 60,
    prescription_required: false,
    average_rating: 4.0
  },
  {
    name: 'Augmentin 625',
    composition: 'Amoxicillin 500mg + Clavulanate 125mg',
    manufacturer: 'GSK',
    price: 180,
    stock_quantity: 50,
    prescription_required: true,
    average_rating: 4.3
  },
  {
    name: 'Mox 500',
    composition: 'Amoxicillin 500mg + Clavulanate 125mg',
    manufacturer: 'Ranbaxy',
    price: 120,
    stock_quantity: 40,
    prescription_required: true,
    average_rating: 4.1
  },
  {
    name: 'Pan 40',
    composition: 'Pantoprazole 40mg',
    manufacturer: 'Alkem',
    price: 65,
    stock_quantity: 90,
    prescription_required: false,
    average_rating: 4.4
  },
  {
    name: 'Pantocid 40',
    composition: 'Pantoprazole 40mg',
    manufacturer: 'Sun Pharma',
    price: 70,
    stock_quantity: 75,
    prescription_required: false,
    average_rating: 4.2
  },
  {
    name: 'Azithral 500',
    composition: 'Azithromycin 500mg',
    manufacturer: 'Alembic',
    price: 145,
    stock_quantity: 30,
    prescription_required: true,
    average_rating: 4.6
  },
  {
    name: 'Zithromax 500',
    composition: 'Azithromycin 500mg',
    manufacturer: 'Pfizer',
    price: 200,
    stock_quantity: 25,
    prescription_required: true,
    average_rating: 4.7
  },
  {
    name: 'Metformin 500',
    composition: 'Metformin Hydrochloride 500mg',
    manufacturer: 'Sun Pharma',
    price: 45,
    stock_quantity: 120,
    prescription_required: true,
    average_rating: 4.3
  }
];

mongoose.connect(process.env.MONGO_URI).then(async () => {
  console.log('Connected to MongoDB');
  await Medicine.deleteMany();
  await Medicine.insertMany(medicines);
  console.log('medicines seeded successfully');
  mongoose.disconnect();
}).catch(err => console.log('Error:', err.message));