import mongoose from 'mongoose';
import dotenv from 'dotenv';
import bcrypt from 'bcryptjs';
import { User } from './models/userModel.js';
import { Property } from './models/propertyModel.js';
import { Booking } from './models/bookingModel.js';
import { Bill } from './models/billModel.js';
import { Transaction } from './models/transactionModel.js';
import { Review } from './models/reviewModel.js';
import { Complaint } from './models/complaintModel.js';

dotenv.config();

const mongoUri = process.env.MONGODB_URI || 'mongodb://localhost:27017/hunizen_db';

async function seedDatabase() {
  try {
    console.log('Connecting to MongoDB for seeding...');
    await mongoose.connect(mongoUri);
    console.log('Connected. Cleaning database collections...');

    // 1. Clear existing data
    await User.deleteMany({});
    await Property.deleteMany({});
    await Booking.deleteMany({});
    await Bill.deleteMany({});
    await Transaction.deleteMany({});
    await Review.deleteMany({});
    await Complaint.deleteMany({});
    console.log('Database cleaned.');

    // 2. Hash seed password
    const hashedPassword = await bcrypt.hash('password123', 10);

    // 3. Create Seed Users
    console.log('Creating users...');
    const tenantUser = await User.create({
      name: 'Budi Santoso',
      phone: '081234567890',
      email: 'budi.santoso@email.com',
      password: hashedPassword,
      gender: 'Laki-laki',
      role: 'tenant',
      isVerified: true,
      birthDate: '1998-05-15',
      job: 'Software Engineer',
      city: 'Jakarta Selatan',
      maritalStatus: 'Belum Menikah',
      education: 'S1 Teknik Informatika',
      emergencyPhone: '081299990000',
      avatarUrl: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=200',
    });

    const landlordUser = await User.create({
      name: 'Pak Joko Widodo',
      phone: '087766554433',
      email: 'joko.landlord@email.com',
      password: hashedPassword,
      gender: 'Laki-laki',
      role: 'landlord',
      isVerified: true,
      avatarUrl: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=200',
    });

    const adminUser = await User.create({
      name: 'Admin Hunizen',
      phone: '08111222333',
      email: 'admin@hunizen.com',
      password: hashedPassword,
      gender: 'Laki-laki',
      role: 'admin',
      isVerified: true,
    });

    console.log(`Users created: Tenant (ID: ${tenantUser._id}), Landlord (ID: ${landlordUser._id})`);

    // 4. Create Seed Properties
    console.log('Creating properties...');
    const property1 = await Property.create({
      title: 'Kost Hunizen Emerald Kemang',
      location: 'Jl. Kemang Raya No. 45, Jakarta Selatan',
      type: 'Campur',
      period: 'Bulanan',
      priceVal: 2500000,
      price: 'Rp 2.500.000 / bulan',
      originalPrice: 'Rp 3.000.000',
      roomLeft: 5,
      latLng: [-6.2738, 106.8208],
      facilities: ['WiFi', 'AC', 'Kamar Mandi Dalam', 'Kasur Springbed', 'Lemari Pakaian', 'Meja Belajar'],
      rules: ['Dilarang membawa hewan peliharaan', 'Maksimal 2 penghuni per kamar', 'Tamu menginap wajib lapor'],
      gallery: [
        'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?auto=format&fit=crop&q=80&w=600',
        'https://images.unsplash.com/photo-1598928506311-c55ded91a20c?auto=format&fit=crop&q=80&w=600',
      ],
      host: landlordUser._id,
      highlights: ['Dekat Halte Busway', 'Akses Kunci 24 Jam', 'Lingkungan Tenang'],
      roomSpecs: ['Luas Kamar 3x4 m', 'Daya Listrik 1300 Watt (Token)', 'Jendela Menghadap Taman'],
      bathroomFacilities: ['Shower', 'Kloset Duduk', 'Water Heater', 'Cermin'],
      rulesDetails: ['Batas bertamu jam 22:00 WIB', 'Uang jaminan (deposit) Rp 500.000'],
      roomTypes: [
        {
          name: 'Standard Room',
          price: 'Rp 2.500.000',
          specs: { bed: 1, bath: 1, ac: 1, wifi: 1 },
          img: 'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?auto=format&fit=crop&q=80&w=200',
          facilities: ['WiFi', 'AC', 'Kamar Mandi Dalam'],
        },
        {
          name: 'Deluxe Room',
          price: 'Rp 3.000.000',
          specs: { bed: 1, bath: 1, ac: 1, wifi: 1 },
          img: 'https://images.unsplash.com/photo-1598928506311-c55ded91a20c?auto=format&fit=crop&q=80&w=200',
          facilities: ['WiFi', 'AC', 'Kamar Mandi Dalam', 'TV', 'Kulkas Mini'],
        },
      ],
      nearbyPlaces: [
        { name: 'Lippo Mall Kemang', distance: '5 menit jalan kaki', rating: 4.7 },
        { name: 'Stasiun MRT Blok M', distance: '10 menit berkendara', rating: 4.8 },
      ],
      rentalTerms: {
        min: 'Bisa mulai di hari H sewa.',
        max: 'Pengajuan sewa maksimal 1 bulan sebelum masuk.',
      },
    });

    const property2 = await Property.create({
      title: 'Kost Waterfront Luxury Dago',
      location: 'Jl. Ir. H. Juanda No. 120, Bandung',
      type: 'Putri',
      period: 'Bulanan',
      priceVal: 1800000,
      price: 'Rp 1.800.000 / bulan',
      roomLeft: 3,
      latLng: [-6.8872, 107.6154],
      facilities: ['WiFi', 'AC', 'Dapur Bersama', 'Kulkas Bersama', 'Penjagaan 24 Jam'],
      rules: ['Kost Khusus Putri', 'Jam malam pukul 23:00 WIB', 'Dilarang membawa tamu pria ke area kamar'],
      gallery: [
        'https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&q=80&w=600',
        'https://images.unsplash.com/photo-1540518614846-7eded433c457?auto=format&fit=crop&q=80&w=600',
      ],
      host: landlordUser._id,
      highlights: ['Dekat Universitas Padjadjaran (UNPAD)', 'Udara Sejuk Dago', 'Pemandangan Kota'],
      roomSpecs: ['Luas Kamar 3x3 m', 'Kasur Single Bed', 'Meja & Kursi Belajar'],
      bathroomFacilities: ['Shower', 'Kloset Duduk'],
      rulesDetails: ['Tamu putri menginap dikenakan biaya Rp 50.000 / malam'],
      roomTypes: [
        {
          name: 'Single Cozy Room',
          price: 'Rp 1.800.000',
          specs: { bed: 1, bath: 1, ac: 1, wifi: 1 },
          img: 'https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&q=80&w=200',
          facilities: ['WiFi', 'AC', 'Kasur Single'],
        },
      ],
      nearbyPlaces: [
        { name: 'Simpang Dago', distance: '3 menit berkendara', rating: 4.6 },
        { name: 'ITB Campus', distance: '7 menit berkendara', rating: 4.9 },
      ],
      rentalTerms: {
        min: 'Bisa mulai di hari H sewa.',
        max: 'Maksimal booking 2 minggu sebelum masuk.',
      },
    });

    console.log(`Properties created: Property 1 (ID: ${property1._id}), Property 2 (ID: ${property2._id})`);

    // 5. Create Seed Booking
    console.log('Creating sample booking...');
    const booking = await Booking.create({
      tenant: tenantUser._id,
      property: property1._id,
      roomType: 'Standard Room',
      startDate: '2026-06-15',
      durationMonths: 3,
      status: 'pending',
      occupantsCount: 1,
      additionalNotes: 'Tolong siapkan kamar yang jendelanya menghadap luar',
      paymentMethod: 'gopay',
      totalPayment: 7500000,
      bookingId: 'BK-178822-9011',
    });

    // 6. Create Seed Bills
    console.log('Creating sample bills...');
    const bill = await Bill.create({
      tenant: tenantUser._id,
      property: property1._id,
      billId: 'INV-2026-0091',
      amount: 2500000,
      dueDate: '2026-07-01',
      type: 'Sewa Bulanan',
      status: 'belum_bayar',
      month: 'Juli 2026',
    });

    // 7. Create Seed Reviews
    console.log('Creating sample reviews...');
    await Review.create({
      tenant: tenantUser._id,
      property: property1._id,
      rating: 5,
      comment: 'Kost yang sangat bersih, fasilitas lengkap, dan lokasinya strategis banget dekat Kemang Village!',
      landlordReply: 'Terima kasih banyak Budi, semoga betah tinggal di kost kami.',
    });

    // 8. Create Seed Complaint
    console.log('Creating sample complaint...');
    await Complaint.create({
      tenant: tenantUser._id,
      property: property1._id,
      complaintId: 'REP-9928',
      category: 'Air & Listrik',
      title: 'Aliran air kamar mandi lemah',
      description: 'Sudah 2 hari terakhir ini aliran air di kran wastafel dan shower sangat kecil saat sore hari.',
      status: 'baru',
    });

    console.log('Database seeded successfully!');
    process.exit(0);
  } catch (error: any) {
    console.error('Error seeding database:', error.message);
    process.exit(1);
  }
}

seedDatabase();
