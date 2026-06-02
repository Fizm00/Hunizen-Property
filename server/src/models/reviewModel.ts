import { Schema, model, Document } from 'mongoose';

export interface IReview extends Document {
  tenant: Schema.Types.ObjectId; // References User
  property: Schema.Types.ObjectId; // References Property
  rating: number;
  comment: string;
  landlordReply?: string;
  createdAt: Date;
  updatedAt: Date;
}

const reviewSchema = new Schema<IReview>(
  {
    tenant: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'Penyewa (tenant) yang memberikan ulasan wajib ditentukan'],
    },
    property: {
      type: Schema.Types.ObjectId,
      ref: 'Property',
      required: [true, 'Properti yang diulas wajib ditentukan'],
    },
    rating: {
      type: Number,
      required: [true, 'Nilai rating wajib diisi'],
      min: [1, 'Rating minimal 1 bintang'],
      max: [5, 'Rating maksimal 5 bintang'],
    },
    comment: {
      type: String,
      required: [true, 'Isi ulasan wajib diisi'],
      trim: true,
      maxlength: [500, 'Ulasan maksimal 500 karakter'],
    },
    landlordReply: {
      type: String,
      trim: true,
      default: '',
    },
  },
  {
    timestamps: true,
  }
);

export const Review = model<IReview>('Review', reviewSchema);
