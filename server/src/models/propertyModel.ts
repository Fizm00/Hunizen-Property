import { Schema, model, Document } from 'mongoose';

export interface IRoomType {
  name: string;
  price: string;
  specs: {
    bed: number;
    bath: number;
    ac: number;
    wifi: number;
  };
  img: string;
  facilities: string[];
}

export interface INearbyPlace {
  name: string;
  distance: string;
  rating: number;
}

export interface IProperty extends Document {
  title: string;
  location: string;
  type: 'Campur' | 'Putra' | 'Putri';
  period: 'Harian' | 'Mingguan' | 'Bulanan' | '3 Bulan' | '6 Bulan' | 'Tahunan';
  priceVal: number;
  price: string;
  originalPrice?: string;
  roomLeft: number;
  latLng: [number, number];
  facilities: string[];
  rules: string[];
  gallery: string[];
  host: Schema.Types.ObjectId; // References User model
  highlights: string[];
  roomSpecs: string[];
  bathroomFacilities: string[];
  rulesDetails: string[];
  roomTypes: IRoomType[];
  nearbyPlaces: INearbyPlace[];
  rentalTerms: {
    min: string;
    max: string;
  };
  createdAt: Date;
  updatedAt: Date;
}

const roomTypeSchema = new Schema<IRoomType>({
  name: { type: String, required: true },
  price: { type: String, required: true },
  specs: {
    bed: { type: Number, default: 0 },
    bath: { type: Number, default: 0 },
    ac: { type: Number, default: 0 },
    wifi: { type: Number, default: 0 },
  },
  img: { type: String, default: '' },
  facilities: [{ type: String }],
});

const nearbyPlaceSchema = new Schema<INearbyPlace>({
  name: { type: String, required: true },
  distance: { type: String, required: true },
  rating: { type: Number, default: 5 },
});

const propertySchema = new Schema<IProperty>(
  {
    title: {
      type: String,
      required: [true, 'Judul properti wajib diisi'],
      trim: true,
    },
    location: {
      type: String,
      required: [true, 'Lokasi properti wajib diisi'],
      trim: true,
    },
    type: {
      type: String,
      enum: ['Campur', 'Putra', 'Putri'],
      required: [true, 'Tipe properti wajib diisi (Campur/Putra/Putri)'],
    },
    period: {
      type: String,
      enum: ['Harian', 'Mingguan', 'Bulanan', '3 Bulan', '6 Bulan', 'Tahunan'],
      default: 'Bulanan',
    },
    priceVal: {
      type: Number,
      required: [true, 'Nominal harga sewa wajib diisi'],
    },
    price: {
      type: String,
      required: [true, 'Format teks harga wajib diisi'],
    },
    originalPrice: {
      type: String,
    },
    roomLeft: {
      type: Number,
      required: [true, 'Jumlah sisa kamar wajib diisi'],
      default: 1,
    },
    latLng: {
      type: [Number],
      required: [true, 'Koordinat latitude dan longitude wajib diisi'],
      validate: {
        validator: function (val: number[]) {
          return val.length === 2;
        },
        message: 'Koordinat harus berisi [latitude, longitude]',
      },
    },
    facilities: [{ type: String }],
    rules: [{ type: String }],
    gallery: [{ type: String }],
    host: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'Pemilik properti (host) wajib ditentukan'],
    },
    highlights: [{ type: String }],
    roomSpecs: [{ type: String }],
    bathroomFacilities: [{ type: String }],
    rulesDetails: [{ type: String }],
    roomTypes: [roomTypeSchema],
    nearbyPlaces: [nearbyPlaceSchema],
    rentalTerms: {
      min: { type: String, default: 'Bisa di hari H.' },
      max: { type: String, default: '1 bulan setelah pengajuan.' },
    },
  },
  {
    timestamps: true,
  }
);

export const Property = model<IProperty>('Property', propertySchema);
