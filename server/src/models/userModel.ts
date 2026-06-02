import { Schema, model, Document } from 'mongoose';

export interface IUser extends Document {
  name: string;
  phone: string;
  email: string;
  password?: string;
  gender: 'Laki-laki' | 'Perempuan';
  birthDate?: string;
  job?: string;
  city?: string;
  maritalStatus?: string;
  education?: string;
  emergencyPhone?: string;
  avatarUrl?: string;
  role: 'tenant' | 'landlord' | 'admin';
  isVerified: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const userSchema = new Schema<IUser>(
  {
    name: {
      type: String,
      required: [true, 'Nama wajib diisi'],
      trim: true,
    },
    phone: {
      type: String,
      required: [true, 'Nomor handphone wajib diisi'],
      unique: true,
      trim: true,
    },
    email: {
      type: String,
      required: [true, 'Alamat email wajib diisi'],
      unique: true,
      trim: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: false, // Optional for Google OAuth users
    },
    gender: {
      type: String,
      enum: ['Laki-laki', 'Perempuan'],
      default: 'Laki-laki',
    },
    birthDate: {
      type: String,
    },
    job: {
      type: String,
      default: '',
    },
    city: {
      type: String,
      default: '',
    },
    maritalStatus: {
      type: String,
      default: 'Belum Menikah',
    },
    education: {
      type: String,
      default: '',
    },
    emergencyPhone: {
      type: String,
      default: '',
    },
    avatarUrl: {
      type: String,
      default: '',
    },
    role: {
      type: String,
      enum: ['tenant', 'landlord', 'admin'],
      default: 'tenant',
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

export const User = model<IUser>('User', userSchema);
