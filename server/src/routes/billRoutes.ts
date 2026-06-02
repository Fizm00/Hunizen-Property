import { Router } from 'express';
import {
  createBill,
  getMyBills,
  getLandlordBills,
  payBill,
  getBillById,
} from '../controllers/billController.js';
import { protect, restrictTo } from '../middlewares/authMiddleware.js';

const router = Router();

router.use(protect);

// Generic single bill detail (accessible by tenant/landlord/admin who owns/manages it)
router.get('/:id', getBillById);

// Tenant routes
router.get('/my-bills', restrictTo('tenant'), getMyBills);
router.post('/:id/pay', restrictTo('tenant'), payBill);

// Landlord routes
router.post('/', restrictTo('landlord', 'admin'), createBill);
router.get('/landlord-bills', restrictTo('landlord', 'admin'), getLandlordBills);

export default router;
