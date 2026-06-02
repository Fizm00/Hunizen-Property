import { Router } from 'express';
import multer from 'multer';
import {
  getAllProperties,
  getPropertyById,
  createProperty,
  updateProperty,
  deleteProperty,
  uploadPropertyImages
} from '../controllers/propertyController.js';
import { protect, restrictTo } from '../middlewares/authMiddleware.js';

const router = Router();
const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB limit
  },
});

// Public routes
router.get('/', getAllProperties);
router.get('/:id', getPropertyById);

// Protected routes (Host or Admin only)
router.post('/', protect, restrictTo('landlord', 'admin'), createProperty);
router.put('/:id', protect, restrictTo('landlord', 'admin'), updateProperty);
router.delete('/:id', protect, restrictTo('landlord', 'admin'), deleteProperty);
router.post('/:id/images', protect, restrictTo('landlord', 'admin'), upload.array('gallery', 10), uploadPropertyImages);

export default router;
