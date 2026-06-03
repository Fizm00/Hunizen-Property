import { Response, NextFunction } from 'express';
import { Booking } from '../models/bookingModel.js';
import { Property } from '../models/propertyModel.js';
import { AuthRequest } from '../middlewares/authMiddleware.js';
import { createBookingSchema, updateBookingStatusSchema } from '../validations/bookingValidation.js';

export async function createBooking(req: AuthRequest, res: Response, next: NextFunction): Promise<void> {
  try {
    if (!req.user) {
      res.status(401).json({ success: false, message: 'Akses ditolak' });
      return;
    }

    // 1. Validate payload
    const validationResult = createBookingSchema.safeParse(req.body);
    if (!validationResult.success) {
      res.status(400).json({
        success: false,
        message: 'Validasi gagal',
        errors: validationResult.error.format(),
      });
      return;
    }

    const { property: propertyId, roomType, startDate, durationMonths, occupantsCount, additionalNotes, paymentMethod, totalPayment } = validationResult.data;

    // 2. Verify property exists
    const property = await Property.findById(propertyId);
    if (!property) {
      res.status(404).json({ success: false, message: 'Properti tidak ditemukan' });
      return;
    }

    // 3. Generate unique Booking ID
    const uniqueId = `BK-${Date.now().toString().slice(-6)}-${Math.floor(1000 + Math.random() * 9000)}`;

    // 4. Create booking
    const booking = await Booking.create({
      tenant: req.user.id,
      property: propertyId,
      roomType,
      startDate,
      durationMonths,
      occupantsCount,
      additionalNotes,
      paymentMethod,
      totalPayment,
      bookingId: uniqueId,
      status: 'pending',
    });

    res.status(201).json({
      success: true,
      message: 'Pengajuan sewa berhasil dikirim',
      booking,
    });
  } catch (error) {
    next(error);
  }
}

export async function getMyBookings(req: AuthRequest, res: Response, next: NextFunction): Promise<void> {
  try {
    if (!req.user) {
      res.status(401).json({ success: false, message: 'Akses ditolak' });
      return;
    }

    const bookings = await Booking.find({ tenant: req.user.id })
      .populate({
        path: 'property',
        select: 'title location priceVal price gallery type host rules',
        populate: {
          path: 'host',
          select: 'name phone email avatarUrl'
        }
      })
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: bookings.length,
      bookings,
    });
  } catch (error) {
    next(error);
  }
}

export async function getIncomingBookings(req: AuthRequest, res: Response, next: NextFunction): Promise<void> {
  try {
    if (!req.user) {
      res.status(401).json({ success: false, message: 'Akses ditolak' });
      return;
    }

    // Get properties owned by landlord
    const myProperties = await Property.find({ host: req.user.id });
    const propertyIds = myProperties.map((p) => p._id);

    // Find all bookings for these properties
    const bookings = await Booking.find({ property: { $in: propertyIds } })
      .populate('tenant', 'name phone email gender avatarUrl')
      .populate('property', 'title location type price')
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: bookings.length,
      bookings,
    });
  } catch (error) {
    next(error);
  }
}

export async function updateBookingStatus(req: AuthRequest, res: Response, next: NextFunction): Promise<void> {
  try {
    if (!req.user) {
      res.status(401).json({ success: false, message: 'Akses ditolak' });
      return;
    }

    // 1. Validate status input
    const validationResult = updateBookingStatusSchema.safeParse(req.body);
    if (!validationResult.success) {
      res.status(400).json({
        success: false,
        message: 'Validasi status gagal',
        errors: validationResult.error.format(),
      });
      return;
    }

    const { status } = validationResult.data;

    // 2. Find booking and verify landlord ownership or admin role
    const booking = await Booking.findById(req.params.id).populate('property');
    if (!booking) {
      res.status(404).json({ success: false, message: 'Pemesanan tidak ditemukan' });
      return;
    }

    const property: any = booking.property;

    if (property.host.toString() !== req.user.id && req.user.role !== 'admin') {
      res.status(403).json({
        success: false,
        message: 'Akses ditolak. Anda tidak berwenang memperbarui status pemesanan ini.',
      });
      return;
    }

    booking.status = status;
    await booking.save();

    res.status(200).json({
      success: true,
      message: `Status pemesanan berhasil diperbarui menjadi ${status}`,
      booking,
    });
  } catch (error) {
    next(error);
  }
}

export async function getBookingById(req: AuthRequest, res: Response, next: NextFunction): Promise<void> {
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

    const booking = await Booking.findOne({
      $or: [
        { _id: isValidId ? id : undefined },
        { bookingId: id },
      ].filter(Boolean),
    })
      .populate('tenant', 'name phone email gender avatarUrl')
      .populate('property', 'title location type price gallery host');

    if (!booking) {
      res.status(404).json({ success: false, message: 'Pemesanan tidak ditemukan' });
      return;
    }

    const property: any = booking.property;
    const isTenant = booking.tenant.toString() === req.user.id || (booking.tenant as any)._id?.toString() === req.user.id;
    const isHost = property && property.host.toString() === req.user.id;
    const isAdmin = req.user.role === 'admin';

    if (!isTenant && !isHost && !isAdmin) {
      res.status(403).json({
        success: false,
        message: 'Akses ditolak. Anda tidak memiliki izin untuk melihat pemesanan ini.',
      });
      return;
    }

    res.status(200).json({
      success: true,
      booking,
    });
  } catch (error) {
    next(error);
  }
}

