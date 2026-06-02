import { Router } from 'express';
import {
  createReview,
  getPropertyReviews,
  replyToReview,
} from '../controllers/reviewController.js';
import { protect, restrictTo } from '../middlewares/authMiddleware.js';

const router = Router();

// Public routes
router.get('/property/:propertyId', getPropertyReviews);

// Protected routes
router.post('/', protect, restrictTo('tenant'), createReview);
router.post('/:id/reply', protect, restrictTo('landlord', 'admin'), replyToReview);

export default router;
