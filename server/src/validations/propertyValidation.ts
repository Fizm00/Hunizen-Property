import { z } from 'zod';

const roomTypeSchema = z.object({
  name: z.string({ message: 'Nama tipe kamar wajib diisi' }),
  price: z.string({ message: 'Teks harga tipe kamar wajib diisi' }),
  specs: z.object({
    bed: z.number().default(0),
    bath: z.number().default(0),
    ac: z.number().default(0),
    wifi: z.number().default(0),
  }).default({ bed: 0, bath: 0, ac: 0, wifi: 0 }),
  img: z.string().default(''),
  facilities: z.array(z.string()).default([]),
});

const nearbyPlaceSchema = z.object({
  name: z.string({ message: 'Nama lokasi terdekat wajib diisi' }),
  distance: z.string({ message: 'Jarak lokasi terdekat wajib diisi' }),
  rating: z.number().default(5),
});

export const createPropertySchema = z.object({
  title: z.string({ message: 'Judul properti wajib diisi' }).trim().min(5, 'Judul properti minimal 5 karakter'),
  location: z.string({ message: 'Lokasi properti wajib diisi' }).trim(),
  type: z.enum(['Campur', 'Putra', 'Putri'], {
    message: 'Tipe kost harus Campur, Putra, atau Putri',
  }),
  period: z.enum(['Harian', 'Mingguan', 'Bulanan', '3 Bulan', '6 Bulan', 'Tahunan']).default('Bulanan'),
  priceVal: z.number({ message: 'Harga numerik wajib diisi' }).positive('Harga sewa harus positif'),
  price: z.string({ message: 'Format teks harga wajib diisi' }),
  originalPrice: z.string().optional(),
  roomLeft: z.number().default(1),
  latLng: z.array(z.number()).length(2, 'Koordinat harus berisi persis [latitude, longitude]'),
  facilities: z.array(z.string()).default([]),
  rules: z.array(z.string()).default([]),
  gallery: z.array(z.string()).default([]),
  highlights: z.array(z.string()).default([]),
  roomSpecs: z.array(z.string()).default([]),
  bathroomFacilities: z.array(z.string()).default([]),
  rulesDetails: z.array(z.string()).default([]),
  roomTypes: z.array(roomTypeSchema).default([]),
  nearbyPlaces: z.array(nearbyPlaceSchema).default([]),
  rentalTerms: z.object({
    min: z.string().default('Bisa di hari H.'),
    max: z.string().default('1 bulan setelah pengajuan.'),
  }).default({ min: 'Bisa di hari H.', max: '1 bulan setelah pengajuan.' }),
});

export const updatePropertySchema = createPropertySchema.partial();
