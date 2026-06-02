import { Request, Response, NextFunction } from 'express';
import { Review } from '../models/reviewModel.js';
import { Property } from '../models/propertyModel.js';
import { AuthRequest } from '../middlewares/authMiddleware.js';
import { createReviewSchema, replyReviewSchema } from '../validations/otherValidation.js';

export async function createReview(req: AuthRequest, res: Response, next: NextFunction): Promise<void> {
  try {
    if (!req.user) {
      res.status(401).json({ success: false, message: 'Akses ditolak' });
      return;
    }

    // 1. Validate payload
    const validationResult = createReviewSchema.safeParse(req.body);
    if (!validationResult.success) {
      res.status(400).json({
        success: false,
        message: 'Validasi ulasan gagal',
        errors: validationResult.error.format(),
      });
      return;
    }

    const { property: propertyId, rating, comment } = validationResult.data;

    // 2. Check if property exists
    const property = await Property.findById(propertyId);
    if (!property) {
      res.status(404).json({ success: false, message: 'Properti tidak ditemukan' });
      return;
    }

    // 3. Create review
    const review = await Review.create({
      tenant: req.user.id,
      property: propertyId,
      rating,
      comment,
    });

    res.status(201).json({
      success: true,
      message: 'Ulasan berhasil dikirim',
      review,
    });
  } catch (error) {
    next(error);
  }
}

export async function getPropertyReviews(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const { propertyId } = req.params;

    const reviews = await Review.find({ property: propertyId })
      .populate('tenant', 'name avatarUrl gender')
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: reviews.length,
      reviews,
    });
  } catch (error) {
    next(error);
  }
}

export async function replyToReview(req: AuthRequest, res: Response, next: NextFunction): Promise<void> {
  try {
    if (!req.user) {
      res.status(401).json({ success: false, message: 'Akses ditolak' });
      return;
    }

    // 1. Validate reply text
    const validationResult = replyReviewSchema.safeParse(req.body);
    if (!validationResult.success) {
      res.status(400).json({
        success: false,
        message: 'Validasi tanggapan gagal',
        errors: validationResult.error.format(),
      });
      return;
    }

    const { landlordReply } = validationResult.data;

    // 2. Find review and verify property ownership or admin role
    const review = await Review.findById(req.params.id).populate('property');
    if (!review) {
      res.status(404).json({ success: false, message: 'Ulasan tidak ditemukan' });
      return;
    }

    const property: any = review.property;
    if (property.host.toString() !== req.user.id && req.user.role !== 'admin') {
      res.status(403).json({
        success: false,
        message: 'Akses ditolak. Anda tidak berwenang menanggapi ulasan pada properti ini.',
      });
      return;
    }

    review.landlordReply = landlordReply;
    await review.save();

    res.status(200).json({
      success: true,
      message: 'Tanggapan ulasan berhasil disimpan',
      review,
    });
  } catch (error) {
    next(error);
  }
}
