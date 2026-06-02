import { Router } from 'express';
import {
  createBooking,
  getMyBookings,
  getIncomingBookings,
  updateBookingStatus,
  getBookingById,
} from '../controllers/bookingController.js';
import { protect, restrictTo } from '../middlewares/authMiddleware.js';

const router = Router();

// Apply auth middleware to all booking routes
router.use(protect);

// Generic single booking detail (accessible by tenant/landlord/admin who owns/manages it)
router.get('/:id', getBookingById);

// Tenants routes
router.post('/', restrictTo('tenant'), createBooking);
router.get('/my-bookings', restrictTo('tenant'), getMyBookings);

// Landlords routes
router.get('/incoming', restrictTo('landlord', 'admin'), getIncomingBookings);
router.patch('/:id/status', restrictTo('landlord', 'admin'), updateBookingStatus);

export default router;
