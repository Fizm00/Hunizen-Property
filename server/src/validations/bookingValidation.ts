import { z } from 'zod';

export const createBookingSchema = z.object({
  property: z.string({ message: 'ID properti wajib ditentukan' }).regex(/^[0-9a-fA-F]{24}$/, 'Format ID properti tidak valid'),
  roomType: z.string({ message: 'Tipe kamar wajib dipilih' }),
  startDate: z.string({ message: 'Tanggal mulai sewa wajib ditentukan' }),
  durationMonths: z.number({ message: 'Durasi sewa wajib ditentukan' }).min(1, 'Durasi sewa minimal 1 bulan'),
  occupantsCount: z.number({ message: 'Jumlah penghuni wajib ditentukan' }).min(1, 'Minimal 1 penghuni'),
  additionalNotes: z.string().optional(),
  paymentMethod: z.string({ message: 'Metode pembayaran wajib dipilih' }),
  totalPayment: z.number({ message: 'Total pembayaran wajib ditentukan' }).positive('Total pembayaran harus positif'),
});

export const updateBookingStatusSchema = z.object({
  status: z.enum(['pending', 'disetujui', 'ditolak'], {
    message: 'Status pemesanan harus pending, disetujui, atau ditolak',
  }),
});
