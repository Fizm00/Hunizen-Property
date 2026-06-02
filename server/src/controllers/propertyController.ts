import { Request, Response, NextFunction } from 'express';
import { Property } from '../models/propertyModel.js';
import { AuthRequest } from '../middlewares/authMiddleware.js';
import { createPropertySchema, updatePropertySchema } from '../validations/propertyValidation.js';
import { uploadToCloudinary } from '../utils/cloudinaryUpload.js';

export async function getAllProperties(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const { query, type, minPrice, maxPrice, city } = req.query;
    
    // Construct MongoDB query object
    const filterQuery: any = {};

    if (query) {
      filterQuery.$or = [
        { title: { $regex: query, $options: 'i' } },
        { location: { $regex: query, $options: 'i' } },
      ];
    }

    if (city) {
      filterQuery.location = { $regex: city, $options: 'i' };
    }

    if (type) {
      filterQuery.type = type;
    }

    if (minPrice || maxPrice) {
      filterQuery.priceVal = {};
      if (minPrice) {
        filterQuery.priceVal.$gte = Number(minPrice);
      }
      if (maxPrice) {
        filterQuery.priceVal.$lte = Number(maxPrice);
      }
    }

    const properties = await Property.find(filterQuery).populate('host', 'name phone email avatarUrl isVerified');
    
    res.status(200).json({
      success: true,
      count: properties.length,
      properties,
    });
  } catch (error) {
    next(error);
  }
}

export async function getPropertyById(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const property = await Property.findById(req.params.id).populate('host', 'name phone email avatarUrl isVerified');
    
    if (!property) {
      res.status(404).json({
        success: false,
        message: 'Properti tidak ditemukan',
      });
      return;
    }

    res.status(200).json({
      success: true,
      property,
    });
  } catch (error) {
    next(error);
  }
}

export async function createProperty(req: AuthRequest, res: Response, next: NextFunction): Promise<void> {
  try {
    if (!req.user) {
      res.status(401).json({ success: false, message: 'Akses ditolak' });
      return;
    }

    // 1. Validate payload
    const validationResult = createPropertySchema.safeParse(req.body);
    if (!validationResult.success) {
      const errorMap: Record<string, string> = {};
      validationResult.error.issues.forEach((err) => {
        if (err.path[0]) {
          errorMap[err.path[0].toString()] = err.message;
        }
      });
      res.status(400).json({
        success: false,
        message: 'Validasi gagal',
        errors: errorMap,
      });
      return;
    }

    // 2. Create property listing, set host to logged-in user
    const propertyData = {
      ...validationResult.data,
      host: req.user.id,
    };

    const property = await Property.create(propertyData);

    res.status(201).json({
      success: true,
      message: 'Properti berhasil dibuat',
      property,
    });
  } catch (error) {
    next(error);
  }
}

export async function updateProperty(req: AuthRequest, res: Response, next: NextFunction): Promise<void> {
  try {
    if (!req.user) {
      res.status(401).json({ success: false, message: 'Akses ditolak' });
      return;
    }

    // Find property
    const property = await Property.findById(req.params.id);
    if (!property) {
      res.status(404).json({ success: false, message: 'Properti tidak ditemukan' });
      return;
    }

    // Check ownership (only owner host or admin can update)
    if (property.host.toString() !== req.user.id && req.user.role !== 'admin') {
      res.status(403).json({
        success: false,
        message: 'Akses ditolak. Anda tidak memiliki izin untuk mengupdate properti ini.',
      });
      return;
    }

    // Validate update payload
    const validationResult = updatePropertySchema.safeParse(req.body);
    if (!validationResult.success) {
      res.status(400).json({
        success: false,
        message: 'Validasi gagal',
        errors: validationResult.error.format(),
      });
      return;
    }

    // Apply updates
    Object.assign(property, validationResult.data);
    await property.save();

    res.status(200).json({
      success: true,
      message: 'Properti berhasil diperbarui',
      property,
    });
  } catch (error) {
    next(error);
  }
}

export async function deleteProperty(req: AuthRequest, res: Response, next: NextFunction): Promise<void> {
  try {
    if (!req.user) {
      res.status(401).json({ success: false, message: 'Akses ditolak' });
      return;
    }

    const property = await Property.findById(req.params.id);
    if (!property) {
      res.status(404).json({ success: false, message: 'Properti tidak ditemukan' });
      return;
    }

    // Check ownership
    if (property.host.toString() !== req.user.id && req.user.role !== 'admin') {
      res.status(403).json({
        success: false,
        message: 'Akses ditolak. Anda tidak memiliki izin untuk menghapus properti ini.',
      });
      return;
    }

    await Property.findByIdAndDelete(req.params.id);

    res.status(200).json({
      success: true,
      message: 'Properti berhasil dihapus',
    });
  } catch (error) {
    next(error);
  }
}

export async function uploadPropertyImages(req: AuthRequest, res: Response, next: NextFunction): Promise<void> {
  try {
    if (!req.user) {
      res.status(401).json({ success: false, message: 'Akses ditolak' });
      return;
    }

    const property = await Property.findById(req.params.id);
    if (!property) {
      res.status(404).json({ success: false, message: 'Properti tidak ditemukan' });
      return;
    }

    // Check ownership
    if (property.host.toString() !== req.user.id && req.user.role !== 'admin') {
      res.status(403).json({
        success: false,
        message: 'Akses ditolak. Anda tidak memiliki izin untuk mengubah properti ini.',
      });
      return;
    }

    const files = req.files as Express.Multer.File[] | undefined;
    if (!files || files.length === 0) {
      res.status(400).json({ success: false, message: 'Berkas gambar tidak ditemukan.' });
      return;
    }

    // Upload files to Cloudinary in parallel
    const uploadPromises = files.map((file) => uploadToCloudinary(file.buffer));
    const urls = await Promise.all(uploadPromises);

    // Append to property gallery
    property.gallery.push(...urls);
    await property.save();

    res.status(200).json({
      success: true,
      message: 'Gambar berhasil diunggah',
      gallery: property.gallery,
    });
  } catch (error) {
    next(error);
  }
}
