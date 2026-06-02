import { z } from 'zod';

export const createBillSchema = z.object({
  tenant: z.string({ message: 'ID penyewa (tenant) wajib ditentukan' }).regex(/^[0-9a-fA-F]{24}$/, 'Format ID penyewa tidak valid'),
  property: z.string({ message: 'ID properti wajib ditentukan' }).regex(/^[0-9a-fA-F]{24}$/, 'Format ID properti tidak valid'),
  amount: z.number({ message: 'Nominal tagihan wajib ditentukan' }).positive('Nominal tagihan harus positif'),
  dueDate: z.string({ message: 'Tanggal jatuh tempo wajib ditentukan' }),
  type: z.string().default('Sewa Bulanan'),
  month: z.string({ message: 'Bulan periode tagihan wajib ditentukan' }),
});

export const createReviewSchema = z.object({
  property: z.string({ message: 'ID properti wajib diisi' }).regex(/^[0-9a-fA-F]{24}$/, 'Format ID properti tidak valid'),
  rating: z.number({ message: 'Rating wajib diisi' }).min(1, 'Rating minimal 1 bintang').max(5, 'Rating maksimal 5 bintang'),
  comment: z.string({ message: 'Isi ulasan wajib diisi' }).trim().min(5, 'Ulasan minimal terdiri dari 5 karakter').max(500, 'Ulasan maksimal 500 karakter'),
});

export const replyReviewSchema = z.object({
  landlordReply: z.string({ message: 'Tanggapan ulasan wajib diisi' }).trim().min(2, 'Tanggapan minimal terdiri dari 2 karakter'),
});

export const createComplaintSchema = z.object({
  property: z.string({ message: 'ID properti kamar wajib ditentukan' }).regex(/^[0-9a-fA-F]{24}$/, 'Format ID properti tidak valid'),
  category: z.enum(['Fasilitas Kamar', 'Air & Listrik', 'Kebersihan', 'Keamanan', 'Lainnya'], {
    message: 'Kategori pengaduan tidak valid',
  }),
  title: z.string({ message: 'Judul pengaduan wajib diisi' }).trim().min(3, 'Judul minimal 3 karakter'),
  description: z.string({ message: 'Deskripsi pengaduan wajib diisi' }).trim().min(10, 'Deskripsi minimal 10 karakter'),
});

export const updateComplaintSchema = z.object({
  status: z.enum(['baru', 'proses', 'selesai'], {
    message: 'Status pengaduan tidak valid',
  }),
  landlordNotes: z.string().optional(),
});
