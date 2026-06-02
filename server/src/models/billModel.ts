import { Schema, model, Document } from 'mongoose';

export interface IBill extends Document {
  tenant: Schema.Types.ObjectId; // References User
  property: Schema.Types.ObjectId; // References Property
  billId: string; // INV-2026-0501
  amount: number;
  dueDate: string;
  type: string;
  status: 'belum_bayar' | 'lunas' | 'tunggakan';
  month: string; // Juni 2026
  createdAt: Date;
  updatedAt: Date;
}

const billSchema = new Schema<IBill>(
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
    billId: {
      type: String,
      required: [true, 'Bill ID / Nomor Invoice wajib ditentukan'],
      unique: true,
      trim: true,
    },
    amount: {
      type: Number,
      required: [true, 'Nominal tagihan wajib diisi'],
    },
    dueDate: {
      type: String,
      required: [true, 'Tanggal jatuh tempo wajib ditentukan'],
    },
    type: {
      type: String,
      required: [true, 'Jenis tagihan wajib ditentukan'],
      default: 'Sewa Bulanan',
    },
    status: {
      type: String,
      enum: ['belum_bayar', 'lunas', 'tunggakan'],
      default: 'belum_bayar',
    },
    month: {
      type: String,
      required: [true, 'Bulan periode tagihan wajib ditentukan'],
    },
  },
  {
    timestamps: true,
  }
);

export const Bill = model<IBill>('Bill', billSchema);
