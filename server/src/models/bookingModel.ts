import { Schema, model, Document } from 'mongoose';

export interface IBooking extends Document {
  tenant: Schema.Types.ObjectId; // References User
  property: Schema.Types.ObjectId; // References Property
  roomType: string;
  startDate: string;
  durationMonths: number;
  status: 'pending' | 'disetujui' | 'ditolak';
  occupantsCount: number;
  additionalNotes?: string;
  paymentMethod: string;
  totalPayment: number;
  bookingId: string;
  createdAt: Date;
  updatedAt: Date;
}

const bookingSchema = new Schema<IBooking>(
  {
    tenant: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'Penyewa (tenant) wajib ditentukan'],
    },
    property: {
      type: Schema.Types.ObjectId,
      ref: 'Property',
      required: [true, 'Properti wajib ditentukan'],
    },
    roomType: {
      type: String,
      required: [true, 'Tipe kamar wajib dipilih'],
      default: 'Standard Room',
    },
    startDate: {
      type: String,
      required: [true, 'Tanggal mulai sewa wajib ditentukan'],
    },
    durationMonths: {
      type: Number,
      required: [true, 'Durasi sewa wajib ditentukan'],
      min: [1, 'Durasi sewa minimal 1 bulan'],
    },
    status: {
      type: String,
      enum: ['pending', 'disetujui', 'ditolak'],
      default: 'pending',
    },
    occupantsCount: {
      type: Number,
      required: [true, 'Jumlah penghuni wajib ditentukan'],
      min: [1, 'Minimal 1 penghuni'],
      default: 1,
    },
    additionalNotes: {
      type: String,
      trim: true,
      default: '',
    },
    paymentMethod: {
      type: String,
      required: [true, 'Metode pembayaran wajib dipilih'],
    },
    totalPayment: {
      type: Number,
      required: [true, 'Total pembayaran wajib ditentukan'],
    },
    bookingId: {
      type: String,
      required: [true, 'Booking ID unik wajib ditentukan'],
      unique: true,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

export const Booking = model<IBooking>('Booking', bookingSchema);
