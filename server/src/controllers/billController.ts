import { Response, NextFunction } from 'express';
import { Bill } from '../models/billModel.js';
import { Property } from '../models/propertyModel.js';
import { Transaction } from '../models/transactionModel.js';
import { AuthRequest } from '../middlewares/authMiddleware.js';
import { createBillSchema } from '../validations/otherValidation.js';

export async function createBill(req: AuthRequest, res: Response, next: NextFunction): Promise<void> {
  try {
    if (!req.user) {
      res.status(401).json({ success: false, message: 'Akses ditolak' });
      return;
    }

    // 1. Validate payload
    const validationResult = createBillSchema.safeParse(req.body);
    if (!validationResult.success) {
      res.status(400).json({
        success: false,
        message: 'Validasi gagal',
        errors: validationResult.error.format(),
      });
      return;
    }

    const { tenant, property: propertyId, amount, dueDate, type, month } = validationResult.data;

    // 2. Check property ownership
    const property = await Property.findById(propertyId);
    if (!property) {
      res.status(404).json({ success: false, message: 'Properti tidak ditemukan' });
      return;
    }

    if (property.host.toString() !== req.user.id && req.user.role !== 'admin') {
      res.status(403).json({
        success: false,
        message: 'Akses ditolak. Anda tidak memiliki wewenang menerbitkan tagihan untuk properti ini.',
      });
      return;
    }

    // 3. Generate unique Invoice ID
    const year = new Date().getFullYear();
    const uniqueNum = Math.floor(1000 + Math.random() * 9000);
    const invoiceId = `INV-${year}-${uniqueNum}`;

    // 4. Create Bill
    const bill = await Bill.create({
      tenant,
      property: propertyId,
      billId: invoiceId,
      amount,
      dueDate,
      type,
      status: 'belum_bayar',
      month,
    });

    res.status(201).json({
      success: true,
      message: 'Tagihan berhasil dibuat',
      bill,
    });
  } catch (error) {
    next(error);
  }
}

export async function getMyBills(req: AuthRequest, res: Response, next: NextFunction): Promise<void> {
  try {
    if (!req.user) {
      res.status(401).json({ success: false, message: 'Akses ditolak' });
      return;
    }

    const bills = await Bill.find({ tenant: req.user.id })
      .populate('property', 'title location price gallery type')
      .sort({ dueDate: 1 });

    res.status(200).json({
      success: true,
      count: bills.length,
      bills,
    });
  } catch (error) {
    next(error);
  }
}

export async function getLandlordBills(req: AuthRequest, res: Response, next: NextFunction): Promise<void> {
  try {
    if (!req.user) {
      res.status(401).json({ success: false, message: 'Akses ditolak' });
      return;
    }

    // Get landlord properties
    const properties = await Property.find({ host: req.user.id });
    const propertyIds = properties.map((p) => p._id);

    const bills = await Bill.find({ property: { $in: propertyIds } })
      .populate('tenant', 'name phone email')
      .populate('property', 'title location')
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: bills.length,
      bills,
    });
  } catch (error) {
    next(error);
  }
}

export async function payBill(req: AuthRequest, res: Response, next: NextFunction): Promise<void> {
  try {
    if (!req.user) {
      res.status(401).json({ success: false, message: 'Akses ditolak' });
      return;
    }

    const { paymentMethod } = req.body;
    if (!paymentMethod) {
      res.status(400).json({ success: false, message: 'Metode pembayaran wajib ditentukan.' });
      return;
    }

    const bill = await Bill.findById(req.params.id);
    if (!bill) {
      res.status(404).json({ success: false, message: 'Tagihan tidak ditemukan.' });
      return;
    }

    // Check if the bill belongs to the logged-in tenant
    if (bill.tenant.toString() !== req.user.id) {
      res.status(403).json({
        success: false,
        message: 'Akses ditolak. Anda tidak berwenang membayar tagihan ini.',
      });
      return;
    }

    if (bill.status === 'lunas') {
      res.status(400).json({ success: false, message: 'Tagihan ini sudah lunas.' });
      return;
    }

    // Update bill status to lunas
    bill.status = 'lunas';
    await bill.save();

    // Create a transaction log
    const year = new Date().getFullYear();
    const uniqueNum = Math.floor(10000 + Math.random() * 90000);
    const txnId = `TXN-${year}-${uniqueNum}`;

    const transaction = await Transaction.create({
      bill: bill._id,
      tenant: req.user.id,
      property: bill.property,
      transactionId: txnId,
      amount: bill.amount,
      paymentMethod,
      status: 'berhasil',
      transactionType: bill.type || 'Sewa Kamar',
    });

    res.status(200).json({
      success: true,
      message: 'Pembayaran berhasil diproses',
      bill,
      transaction,
    });
  } catch (error) {
    next(error);
  }
}

export async function getBillById(req: AuthRequest, res: Response, next: NextFunction): Promise<void> {
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

    const bill = await Bill.findOne({
      $or: [
        { _id: isValidId ? id : undefined },
        { billId: id },
      ].filter(Boolean),
    })
      .populate('tenant', 'name phone email gender avatarUrl')
      .populate('property', 'title location type price gallery host');

    if (!bill) {
      res.status(404).json({ success: false, message: 'Tagihan tidak ditemukan' });
      return;
    }

    const property: any = bill.property;
    const isTenant = bill.tenant.toString() === req.user.id || (bill.tenant as any)._id?.toString() === req.user.id;
    const isHost = property && property.host.toString() === req.user.id;
    const isAdmin = req.user.role === 'admin';

    if (!isTenant && !isHost && !isAdmin) {
      res.status(403).json({
        success: false,
        message: 'Akses ditolak. Anda tidak memiliki izin untuk melihat tagihan ini.',
      });
      return;
    }

    res.status(200).json({
      success: true,
      bill,
    });
  } catch (error) {
    next(error);
  }
}

