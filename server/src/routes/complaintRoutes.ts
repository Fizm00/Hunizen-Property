import { Router } from 'express';
import {
  createComplaint,
  getMyComplaints,
  getLandlordComplaints,
  updateComplaintStatus,
} from '../controllers/complaintController.js';
import { protect, restrictTo } from '../middlewares/authMiddleware.js';

const router = Router();

router.use(protect);

// Tenant routes
router.post('/', restrictTo('tenant'), createComplaint);
router.get('/my-complaints', restrictTo('tenant'), getMyComplaints);

// Landlord routes
router.get('/landlord-complaints', restrictTo('landlord', 'admin'), getLandlordComplaints);
router.patch('/:id/status', restrictTo('landlord', 'admin'), updateComplaintStatus);

export default router;
