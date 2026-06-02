import { Response, NextFunction } from 'express';
import { Transaction } from '../models/transactionModel.js';
import { AuthRequest } from '../middlewares/authMiddleware.js';

export async function getMyTransactions(req: AuthRequest, res: Response, next: NextFunction): Promise<void> {
  try {
    if (!req.user) {
      res.status(401).json({ success: false, message: 'Akses ditolak' });
      return;
    }

    const transactions = await Transaction.find({ tenant: req.user.id })
      .populate('property', 'title location price gallery type')
      .populate('bill', 'billId month type')
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: transactions.length,
      transactions,
    });
  } catch (error) {
    next(error);
  }
}

export async function getTransactionById(req: AuthRequest, res: Response, next: NextFunction): Promise<void> {
  try {
    if (!req.user) {
      res.status(401).json({ success: false, message: 'Akses ditolak' });
      return;
    }

    const { id } = req.params;
    if (typeof id !== 'string') {
      res.status(400).json({ success: false, message: 'ID tidak valid' });
      return;
    }
    const isValidId = id.match(/^[0-9a-fA-F]{24}$/);

    const transaction = await Transaction.findOne({
      $or: [
        { _id: isValidId ? id : undefined },
        { transactionId: id },
      ].filter(Boolean),
    })
      .populate('tenant', 'name phone email gender avatarUrl')
      .populate('property', 'title location type price gallery host')
      .populate('bill', 'billId month type');

    if (!transaction) {
      res.status(404).json({ success: false, message: 'Transaksi tidak ditemukan' });
      return;
    }

    const property: any = transaction.property;
    const isTenant = transaction.tenant.toString() === req.user.id || (transaction.tenant as any)._id?.toString() === req.user.id;
    const isHost = property && property.host.toString() === req.user.id;
    const isAdmin = req.user.role === 'admin';

    if (!isTenant && !isHost && !isAdmin) {
      res.status(403).json({
        success: false,
        message: 'Akses ditolak. Anda tidak memiliki izin untuk melihat transaksi ini.',
      });
      return;
    }

    res.status(200).json({
      success: true,
      transaction,
    });
  } catch (error) {
    next(error);
  }
}

