import { Router } from 'express';
import { getMyTransactions, getTransactionById } from '../controllers/transactionController.js';
import { protect, restrictTo } from '../middlewares/authMiddleware.js';

const router = Router();

router.use(protect);

router.get('/:id', getTransactionById);
router.get('/my-transactions', restrictTo('tenant'), getMyTransactions);

export default router;
