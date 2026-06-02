import { z } from 'zod';

export const registerSchema = z.object({
  name: z.string({
    message: 'Nama wajib diisi',
  }).trim().min(2, 'Nama minimal terdiri dari 2 karakter'),
  phone: z.string({
    message: 'Nomor handphone wajib diisi',
  }).trim().regex(/^(\+62|0)[0-9]{8,15}$/, 'Format nomor handphone tidak valid (gunakan format Indonesia)'),
  email: z.string({
    message: 'Alamat email wajib diisi',
  }).trim().email('Format alamat email tidak valid'),
  password: z.string({
    message: 'Password wajib diisi',
  }).min(6, 'Password minimal terdiri dari 6 karakter'),
  gender: z.enum(['Laki-laki', 'Perempuan'], {
    message: 'Gender harus Laki-laki atau Perempuan',
  }).default('Laki-laki'),
  birthDate: z.string().optional(),
  job: z.string().optional(),
  city: z.string().optional(),
  maritalStatus: z.string().optional(),
  education: z.string().optional(),
  emergencyPhone: z.string().optional(),
  avatarUrl: z.string().optional(),
  role: z.enum(['tenant', 'landlord', 'admin']).default('tenant'),
});

export const loginSchema = z.object({
  phone: z.string({
    message: 'Nomor handphone wajib diisi',
  }).trim(),
  password: z.string({
    message: 'Password wajib diisi',
  }),
});
