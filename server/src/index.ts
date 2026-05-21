import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Basic sanity check route
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'Hunizen API is running' });
});

// Database connection
const mongoUri = process.env.MONGODB_URI || 'mongodb://localhost:27017/hunizen_db';
mongoose
  .connect(mongoUri)
  .then(() => {
    console.log('Successfully connected to MongoDB.');
  })
  .catch((error) => {
    console.error('Warning: Could not connect to MongoDB. Make sure MongoDB is running.');
    console.error(error.message);
  });

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

