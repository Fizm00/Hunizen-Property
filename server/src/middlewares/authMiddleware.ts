import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

export interface AuthRequest extends Request {
  user?: {
    id: string;
    role: 'tenant' | 'landlord' | 'admin';
  };
}

export function protect(req: AuthRequest, res: Response, next: NextFunction) {
  let token: string | undefined;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    token = req.headers.authorization.split(' ')[1];
  }

  if (!token) {
    res.status(401).json({
      success: false,
      message: 'Akses ditolak. Token otentikasi tidak ditemukan.',
    });
    return;
  }

  try {
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET || 'super_secret_key_hunizen_app_2026'
    ) as { id: string; role: 'tenant' | 'landlord' | 'admin' };

    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({
      success: false,
      message: 'Token otentikasi tidak valid atau telah kadaluarsa.',
    });
  }
}

export function restrictTo(...roles: ('tenant' | 'landlord' | 'admin')[]) {
  return (req: AuthRequest, res: Response, next: NextFunction) => {
    if (!req.user || !roles.includes(req.user.role)) {
      res.status(403).json({
        success: false,
        message: 'Akses ditolak. Anda tidak memiliki izin untuk melakukan aksi ini.',
      });
      return;
    }
    next();
  };
}
