import { Schema, model, Document } from 'mongoose';

export interface ITransaction extends Document {
  bill?: Schema.Types.ObjectId; // References Bill (optional)
  tenant: Schema.Types.ObjectId; // References User
  property: Schema.Types.ObjectId; // References Property
  transactionId: string; // TXN-2026-0098
  amount: number;
  paymentMethod: string;
  status: 'berhasil' | 'proses' | 'gagal';
  transactionType: string;
  createdAt: Date;
  updatedAt: Date;
}

const transactionSchema = new Schema<ITransaction>(
  {
    bill: {
      type: Schema.Types.ObjectId,
      ref: 'Bill',
      required: false,
    },
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
    transactionId: {
      type: String,
      required: [true, 'Transaction ID unik wajib ditentukan'],
      unique: true,
      trim: true,
    },
    amount: {
      type: Number,
      required: [true, 'Nominal transaksi wajib diisi'],
    },
    paymentMethod: {
      type: String,
      required: [true, 'Metode pembayaran wajib ditentukan'],
    },
    status: {
      type: String,
      enum: ['berhasil', 'proses', 'gagal'],
      default: 'proses',
    },
    transactionType: {
      type: String,
      required: [true, 'Jenis transaksi wajib diisi'],
      default: 'Sewa Kamar',
    },
  },
  {
    timestamps: true,
  }
);

export const Transaction = model<ITransaction>('Transaction', transactionSchema);
