import { Response, NextFunction } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { User } from '../models/userModel.js';
import { AuthRequest } from '../middlewares/authMiddleware.js';
import { registerSchema, loginSchema } from '../validations/authValidation.js';
import { AppError } from '../utils/appError.js';

// Helper to sign JWT Token
function generateToken(id: string, role: string): string {
  return jwt.sign(
    { id, role },
    process.env.JWT_SECRET || 'super_secret_key_hunizen_app_2026',
    { expiresIn: (process.env.JWT_EXPIRES_IN || '30d') as jwt.SignOptions['expiresIn'] }
  );
}

export async function register(req: AuthRequest, res: Response, next: NextFunction): Promise<void> {
  try {
    // 1. Validate payload
    const validationResult = registerSchema.safeParse(req.body);
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

    const { name, phone, email, password, gender, role, birthDate, job, city, maritalStatus, education, emergencyPhone, avatarUrl } = validationResult.data;

    // 2. Check if user already exists (by email or phone)
    const existingUser = await User.findOne({ $or: [{ email }, { phone }] });
    if (existingUser) {
      res.status(400).json({
        success: false,
        message: 'Nomor handphone atau alamat email sudah terdaftar.',
      });
      return;
    }

    // 3. Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // 4. Create user
    const user = await User.create({
      name,
      phone,
      email,
      password: hashedPassword,
      gender,
      role,
      birthDate,
      job,
      city,
      maritalStatus,
      education,
      emergencyPhone,
      avatarUrl,
      isVerified: false,
    });

    // 5. Generate token
    const token = generateToken(user._id.toString(), user.role);

    res.status(201).json({
      success: true,
      message: 'Registrasi berhasil',
      token,
      user: {
        id: user._id,
        name: user.name,
        phone: user.phone,
        email: user.email,
        gender: user.gender,
        role: user.role,
        isVerified: user.isVerified,
        avatarUrl: user.avatarUrl,
      },
    });
  } catch (error) {
    next(error);
  }
}

export async function login(req: AuthRequest, res: Response, next: NextFunction): Promise<void> {
  try {
    // 1. Validate credentials payload
    const validationResult = loginSchema.safeParse(req.body);
    if (!validationResult.success) {
      res.status(400).json({
        success: false,
        message: 'Nomor handphone dan password wajib diisi.',
      });
      return;
    }

    const { phone, password } = validationResult.data;

    // 2. Find user by phone
    const user = await User.findOne({ phone });
    if (!user || !user.password) {
      res.status(401).json({
        success: false,
        message: 'Kredensial login salah. Silakan periksa nomor handphone atau password Anda.',
      });
      return;
    }

    // 3. Check password matching
    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
      res.status(401).json({
        success: false,
        message: 'Kredensial login salah. Silakan periksa nomor handphone atau password Anda.',
      });
      return;
    }

    // 4. Generate token
    const token = generateToken(user._id.toString(), user.role);

    res.status(200).json({
      success: true,
      message: 'Login berhasil',
      token,
      user: {
        id: user._id,
        name: user.name,
        phone: user.phone,
        email: user.email,
        gender: user.gender,
        role: user.role,
        isVerified: user.isVerified,
        avatarUrl: user.avatarUrl,
      },
    });
  } catch (error) {
    next(error);
  }
}

export async function getMe(req: AuthRequest, res: Response, next: NextFunction): Promise<void> {
  try {
    if (!req.user) {
      res.status(401).json({ success: false, message: 'Akses ditolak' });
      return;
    }

    const user = await User.findById(req.user.id).select('-password');
    if (!user) {
      res.status(404).json({ success: false, message: 'Pengguna tidak ditemukan' });
      return;
    }

    res.status(200).json({
      success: true,
      user: {
        id: user._id,
        name: user.name,
        phone: user.phone,
        email: user.email,
        gender: user.gender,
        role: user.role,
        birthDate: user.birthDate,
        job: user.job,
        city: user.city,
        maritalStatus: user.maritalStatus,
        education: user.education,
        emergencyPhone: user.emergencyPhone,
        avatarUrl: user.avatarUrl,
        isVerified: user.isVerified,
      },
    });
  } catch (error) {
    next(error);
  }
}

export async function updateProfile(req: AuthRequest, res: Response, next: NextFunction): Promise<void> {
  try {
    if (!req.user) {
      res.status(401).json({ success: false, message: 'Akses ditolak' });
      return;
    }

    // Allow partial profile updates
    const { name, phone, email, gender, birthDate, job, city, maritalStatus, education, emergencyPhone, avatarUrl } = req.body;

    const user = await User.findById(req.user.id);
    if (!user) {
      res.status(404).json({ success: false, message: 'Pengguna tidak ditemukan' });
      return;
    }

    // Update defined fields
    if (name !== undefined) user.name = name;
    if (phone !== undefined) user.phone = phone;
    if (email !== undefined) user.email = email;
    if (gender !== undefined) user.gender = gender;
    if (birthDate !== undefined) user.birthDate = birthDate;
    if (job !== undefined) user.job = job;
    if (city !== undefined) user.city = city;
    if (maritalStatus !== undefined) user.maritalStatus = maritalStatus;
    if (education !== undefined) user.education = education;
    if (emergencyPhone !== undefined) user.emergencyPhone = emergencyPhone;
    if (avatarUrl !== undefined) user.avatarUrl = avatarUrl;

    await user.save();

    res.status(200).json({
      success: true,
      message: 'Profil berhasil diperbarui',
      user: {
        id: user._id,
        name: user.name,
        phone: user.phone,
        email: user.email,
        gender: user.gender,
        role: user.role,
        birthDate: user.birthDate,
        job: user.job,
        city: user.city,
        maritalStatus: user.maritalStatus,
        education: user.education,
        emergencyPhone: user.emergencyPhone,
        avatarUrl: user.avatarUrl,
        isVerified: user.isVerified,
      },
    });
  } catch (error) {
    next(error);
  }
}

export async function forgotPassword(req: AuthRequest, res: Response, next: NextFunction): Promise<void> {
  try {
    const { phone } = req.body;
    if (!phone) {
      res.status(400).json({ success: false, message: 'Nomor handphone wajib ditentukan.' });
      return;
    }

    const user = await User.findOne({ phone });
    if (!user) {
      res.status(404).json({ success: false, message: 'Nomor handphone tidak terdaftar.' });
      return;
    }

    // Mock reset token delivery via WhatsApp
    res.status(200).json({
      success: true,
      message: 'Link setel ulang password telah dikirim ke nomor WhatsApp Anda.',
    });
  } catch (error) {
    next(error);
  }
}
