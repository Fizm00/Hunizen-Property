import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import helmet from 'helmet';
import morgan from 'morgan';
import { errorMiddleware } from './middlewares/errorMiddleware.js';
import authRoutes from './routes/authRoutes.js';
import propertyRoutes from './routes/propertyRoutes.js';
import bookingRoutes from './routes/bookingRoutes.js';
import billRoutes from './routes/billRoutes.js';
import transactionRoutes from './routes/transactionRoutes.js';
import reviewRoutes from './routes/reviewRoutes.js';
import complaintRoutes from './routes/complaintRoutes.js';
import { rateLimit } from 'express-rate-limit';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Rate limiting middleware to prevent abuse
const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  limit: 200, // Limit each IP to 200 requests per 15 mins
  message: {
    success: false,
    message: 'Terlalu banyak permintaan dari IP ini, silakan coba lagi setelah 15 menit.',
  },
  standardHeaders: 'draft-7',
  legacyHeaders: false,
});

// Global Middlewares
app.use(helmet());
app.use(morgan('dev'));
app.use(
  cors({
    origin: process.env.CLIENT_URL || 'http://localhost:5173',
    credentials: true,
  })
);
app.use(express.json());
app.use('/api', apiLimiter);

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/properties', propertyRoutes);
app.use('/api/bookings', bookingRoutes);
app.use('/api/bills', billRoutes);
app.use('/api/transactions', transactionRoutes);
app.use('/api/reviews', reviewRoutes);
app.use('/api/complaints', complaintRoutes);

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

// Global Error Handler Middleware
app.use(errorMiddleware);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

