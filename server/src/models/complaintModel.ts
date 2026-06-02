import { Schema, model, Document } from 'mongoose';

export interface IComplaint extends Document {
  tenant: Schema.Types.ObjectId; // References User
  property: Schema.Types.ObjectId; // References Property
  complaintId: string; // REP-9921
  category: 'Fasilitas Kamar' | 'Air & Listrik' | 'Kebersihan' | 'Keamanan' | 'Lainnya';
  title: string;
  description: string;
  status: 'baru' | 'proses' | 'selesai';
  landlordNotes?: string;
  createdAt: Date;
  updatedAt: Date;
}

const complaintSchema = new Schema<IComplaint>(
  {
    tenant: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'Penyewa (tenant) pelapor wajib ditentukan'],
    },
    property: {
      type: Schema.Types.ObjectId,
      ref: 'Property',
      required: [true, 'Properti kamar wajib ditentukan'],
    },
    complaintId: {
      type: String,
      required: [true, 'Complaint ID / Tiket Pelaporan wajib ditentukan'],
      unique: true,
      trim: true,
    },
    category: {
      type: String,
      enum: ['Fasilitas Kamar', 'Air & Listrik', 'Kebersihan', 'Keamanan', 'Lainnya'],
      required: [true, 'Kategori pengaduan wajib dipilih'],
    },
    title: {
      type: String,
      required: [true, 'Judul pengaduan wajib diisi'],
      trim: true,
    },
    description: {
      type: String,
      required: [true, 'Rincian deskripsi pengaduan wajib diisi'],
      trim: true,
    },
    status: {
      type: String,
      enum: ['baru', 'proses', 'selesai'],
      default: 'baru',
    },
    landlordNotes: {
      type: String,
      trim: true,
      default: '',
    },
  },
  {
    timestamps: true,
  }
);

export const Complaint = model<IComplaint>('Complaint', complaintSchema);
