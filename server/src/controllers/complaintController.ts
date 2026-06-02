import { Response, NextFunction } from 'express';
import { Complaint } from '../models/complaintModel.js';
import { Property } from '../models/propertyModel.js';
import { AuthRequest } from '../middlewares/authMiddleware.js';
import { createComplaintSchema, updateComplaintSchema } from '../validations/otherValidation.js';

export async function createComplaint(req: AuthRequest, res: Response, next: NextFunction): Promise<void> {
  try {
    if (!req.user) {
      res.status(401).json({ success: false, message: 'Akses ditolak' });
      return;
    }

    // 1. Validate payload
    const validationResult = createComplaintSchema.safeParse(req.body);
    if (!validationResult.success) {
      res.status(400).json({
        success: false,
        message: 'Validasi pengaduan gagal',
        errors: validationResult.error.format(),
      });
      return;
    }

    const { property: propertyId, category, title, description } = validationResult.data;

    // 2. Check if property exists
    const property = await Property.findById(propertyId);
    if (!property) {
      res.status(404).json({ success: false, message: 'Properti tidak ditemukan' });
      return;
    }

    // 3. Generate unique ticket Complaint ID
    const ticketId = `REP-${Math.floor(1000 + Math.random() * 9000)}`;

    // 4. Create complaint
    const complaint = await Complaint.create({
      tenant: req.user.id,
      property: propertyId,
      complaintId: ticketId,
      category,
      title,
      description,
      status: 'baru',
    });

    res.status(201).json({
      success: true,
      message: 'Pengaduan berhasil diajukan',
      complaint,
    });
  } catch (error) {
    next(error);
  }
}

export async function getMyComplaints(req: AuthRequest, res: Response, next: NextFunction): Promise<void> {
  try {
    if (!req.user) {
      res.status(401).json({ success: false, message: 'Akses ditolak' });
      return;
    }

    const complaints = await Complaint.find({ tenant: req.user.id })
      .populate('property', 'title location price gallery type')
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: complaints.length,
      complaints,
    });
  } catch (error) {
    next(error);
  }
}

export async function getLandlordComplaints(req: AuthRequest, res: Response, next: NextFunction): Promise<void> {
  try {
    if (!req.user) {
      res.status(401).json({ success: false, message: 'Akses ditolak' });
      return;
    }

    // Get properties owned by landlord
    const properties = await Property.find({ host: req.user.id });
    const propertyIds = properties.map((p) => p._id);

    const complaints = await Complaint.find({ property: { $in: propertyIds } })
      .populate('tenant', 'name phone email gender')
      .populate('property', 'title location')
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: complaints.length,
      complaints,
    });
  } catch (error) {
    next(error);
  }
}

export async function updateComplaintStatus(req: AuthRequest, res: Response, next: NextFunction): Promise<void> {
  try {
    if (!req.user) {
      res.status(401).json({ success: false, message: 'Akses ditolak' });
      return;
    }

    // 1. Validate payload
    const validationResult = updateComplaintSchema.safeParse(req.body);
    if (!validationResult.success) {
      res.status(400).json({
        success: false,
        message: 'Validasi status pengaduan gagal',
        errors: validationResult.error.format(),
      });
      return;
    }

    const { status, landlordNotes } = validationResult.data;

    // 2. Find complaint and check property ownership or admin role
    const complaint = await Complaint.findById(req.params.id).populate('property');
    if (!complaint) {
      res.status(404).json({ success: false, message: 'Pengaduan tidak ditemukan' });
      return;
    }

    const property: any = complaint.property;
    if (property.host.toString() !== req.user.id && req.user.role !== 'admin') {
      res.status(403).json({
        success: false,
        message: 'Akses ditolak. Anda tidak berwenang menindaklanjuti pengaduan ini.',
      });
      return;
    }

    complaint.status = status;
    if (landlordNotes !== undefined) {
      complaint.landlordNotes = landlordNotes;
    }

    await complaint.save();

    res.status(200).json({
      success: true,
      message: 'Status pengaduan berhasil diperbarui',
      complaint,
    });
  } catch (error) {
    next(error);
  }
}
