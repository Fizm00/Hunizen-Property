import type { FeatureCard, KostCard, VideoCard, SearchFilter, FooterColumn, SearchKostCard, PropertyDetail } from "../types";
import { DollarSign, MapPin, Sparkles, Percent } from "lucide-react";
import type { WhyChooseUsItem } from "../types";
import feat1 from "../assets/kost_feature_1.png";
import feat2 from "../assets/kost_feature_2.png";
import feat3 from "../assets/kost_feature_3.png";
import promo1 from "../assets/promo_kost_1.png";
import promo2 from "../assets/promo_kost_2.png";
import promo3 from "../assets/promo_kost_3.png";
import recom1 from "../assets/recom_kost_1.png";
import recom2 from "../assets/recom_kost_2.png";
import recom3 from "../assets/recom_kost_3.png";
import iconImg1 from "../assets/kost_feature_1.png";
import iconImg2 from "../assets/kost_feature_2.png";
import iconImg3 from "../assets/kost_feature_3.png";
import iconImg4 from "../assets/kost_feature_4.png";
import cardImg1 from "../assets/promo_kost_1.png";
import cardImg2 from "../assets/promo_kost_3.png";
import cardImg3 from "../assets/recom_kost_1.png";
import heroWaterfront from "../assets/hero_bg_waterfront.png";
import kostBanner from "../assets/kost_banner.png";
import propStaggered1 from "../assets/prop_staggered_1.png";
import propStaggered2 from "../assets/prop_staggered_2.png";
import propStaggered3 from "../assets/prop_staggered_3.png";
import heroBg from "../assets/hero_bg_indoor_kost.png";

export const NAV_ITEMS = ["Kost & Kontrakan", "Tentang Kami", "FAQ", "Kontak"] as const;

export const SEARCH_FILTERS: SearchFilter[] = [
  { label: "Location", placeholder: "Dimana?", minWidth: "min-w-[140px]" },
  { label: "Tipe", placeholder: "Tipe Kost", minWidth: "min-w-[120px]" },
  { label: "Harga", placeholder: "Range Harga", minWidth: "min-w-[130px]" },
  { label: "Fasilitas", placeholder: "Fasilitas Kost", minWidth: "min-w-[130px]" },
  { label: "Aturan", placeholder: "Aturan Kost", minWidth: "min-w-[130px]" },
];

export const FEATURE_CARDS: FeatureCard[] = [
  {
    img: feat1,
    badge: "Paling Dicari",
    title: "Terdekat",
    desc: "Kami cariin kost terdekat untuk kamu",
    specs: ["Pusat Kota", "Dekat Kampus", "Akses Mudah"],
  },
  {
    img: feat2,
    badge: "Akses 24 Jam",
    title: "Aman",
    desc: "Kami cariin kost teraman untuk kamu",
    specs: ["CCTV 24/7", "Security", "Gerbang Smart"],
  },
  {
    img: feat3,
    badge: "Full Furnished",
    title: "Nyaman",
    desc: "Kami cariin kost ternyaman untuk kamu",
    specs: ["AC & WiFi", "KM Dalam", "Pembersihan"],
  },
];

export const PROMO_KOST: KostCard[] = [
  {
    id: "sp-1",
    img: promo1,
    price: "Rp 650.000 / bln",
    title: "Kost Putra Karangmalang",
    location: "Karangmalang, Yogyakarta",
    specs: { bed: 2, bath: 1, ac: 2, wifi: 1 },
  },
  {
    id: "sp-2",
    img: promo2,
    price: "Rp 850.000 / bln",
    title: "Kost Exclusive Gejayan",
    location: "Gejayan, Yogyakarta",
    specs: { bed: 1, bath: 1, ac: 1, wifi: 1 },
  },
  {
    id: "sp-3",
    img: promo3,
    price: "Rp 1.200.000 / bln",
    title: "Kost Zen Kemang",
    location: "Kemang, Jakarta Selatan",
    specs: { bed: 2, bath: 2, ac: 2, wifi: 1 },
  },
];

export const RECOM_KOST: KostCard[] = [
  {
    id: "sp-4",
    img: recom1,
    price: "Rp 950.000 / bln",
    title: "Kost Industrial Condongcatur",
    location: "Condongcatur, Yogyakarta",
    specs: { bed: 1, bath: 1, ac: 1, wifi: 1 },
  },
  {
    id: "sp-5",
    img: recom2,
    price: "Rp 700.000 / bln",
    title: "Kost Cozy Seturan",
    location: "Seturan, Yogyakarta",
    specs: { bed: 2, bath: 1, ac: 1, wifi: 0 },
  },
  {
    id: "sp-6",
    img: recom3,
    price: "Rp 1.500.000 / bln",
    title: "Kost Executive BSD Premium",
    location: "BSD, Tangerang",
    specs: { bed: 2, bath: 2, ac: 2, wifi: 1 },
  },
];

export const WHY_CHOOSE_US_ITEMS: Omit<WhyChooseUsItem, "icon">[] = [
  {
    id: "why-1",
    img: iconImg1,
    title: "Harga Terbaik",
    desc: "Harga transparan tanpa biaya tambahan tersembunyi.",
  },
  {
    id: "why-2",
    img: iconImg2,
    title: "Lokasi Strategis",
    desc: "Dekat dengan kampus, perkantoran, dan pusat kuliner.",
  },
  {
    id: "why-3",
    img: iconImg3,
    title: "Fasilitas Premium",
    desc: "Kamar siap huni lengkap dengan kasur, WiFi, AC, dan lobi.",
  },
  {
    id: "why-4",
    img: iconImg4,
    title: "Bebas Biaya Admin",
    desc: "Proses pencarian dan transaksi mudah tanpa biaya admin berat.",
  },
];

export const WHY_ICONS: Record<string, { Icon: typeof DollarSign; colorClass: string }> = {
  "why-1": { Icon: DollarSign, colorClass: "text-amber-600" },
  "why-2": { Icon: MapPin, colorClass: "text-blue-600" },
  "why-3": { Icon: Sparkles, colorClass: "text-emerald-600" },
  "why-4": { Icon: Percent, colorClass: "text-rose-600" },
};

export const CTA_VIDEO_CARDS: VideoCard[] = [
  { img: cardImg1, handle: "@hunizen.jogja" },
  { img: cardImg2, handle: "@hunizen.kemang" },
  { img: cardImg3, handle: "@hunizen.seturan" },
];

export const FOOTER_COLUMNS: FooterColumn[] = [
  {
    title: "LAYANAN",
    links: ["Kost Putra", "Kost Putri", "Kost Campur", "Kontrakan"],
  },
  {
    title: "KOTA POPULER",
    links: ["Jakarta", "Yogyakarta", "Bandung", "Surabaya"],
  },
  {
    title: "FITUR",
    links: ["Cari Instan", "Peta Kost", "Promo Kilat"],
  },
  {
    title: "BANTUAN",
    links: ["Pusat Bantuan", "Syarat & Ketentuan", "Kebijakan Privasi"],
  },
  {
    title: "PERUSAHAAN",
    links: ["Tentang Kami", "Hubungi Kami", "Karir"],
  },
];

export const FOOTER_LEGAL_LINKS = ["TERMS OF USE", "PRIVACY POLICY", "SECURITY"] as const;

export const SEARCH_PROPERTIES: SearchKostCard[] = [
  {
    id: "sp-1",
    img: promo1,
    price: "Rp 650.000 / bln",
    originalPrice: "Rp 800.000",
    priceVal: 650000,
    title: "Kost Putra Karangmalang",
    location: "Depok, Sleman, Yogyakarta",
    type: "Putra",
    period: "Bulanan",
    rating: 4.8,
    roomLeft: 3,
    specs: { bed: 1, bath: 1, ac: 1, wifi: 1 },
    coordinates: { x: 35, y: 42 },
    latLng: [-7.7715, 110.3855],
    facilities: ["WiFi", "AC", "KM Dalam", "Kasur", "Lemari Baju", "Meja", "Kursi", "Parkir Motor"],
    rules: ["Akses 24 jam", "Maks. 2 orang/kamar", "Khusus karyawan"],
  },
  {
    id: "sp-2",
    img: promo2,
    price: "Rp 850.000 / bln",
    originalPrice: "Rp 1.000.000",
    priceVal: 850000,
    title: "Kost Exclusive Gejayan",
    location: "Caturtunggal, Depok, Yogyakarta",
    type: "Campur",
    period: "Bulanan",
    rating: 4.9,
    roomLeft: 5,
    specs: { bed: 1, bath: 1, ac: 1, wifi: 1 },
    coordinates: { x: 58, y: 30 },
    latLng: [-7.7760, 110.3920],
    facilities: ["WiFi", "AC", "KM Dalam", "Air Panas", "Kasur", "Dapur", "Parkir Mobil", "Penjaga Kos"],
    rules: ["Akses 24 jam", "Boleh pasutri", "Boleh bawa anak"],
  },
  {
    id: "sp-3",
    img: promo3,
    price: "Rp 1.200.000 / bln",
    originalPrice: "Rp 1.500.000",
    priceVal: 1200000,
    title: "Kost Zen Kemang Cozy",
    location: "Mampang Prapatan, Jakarta Selatan",
    type: "Campur",
    period: "Bulanan",
    rating: 4.7,
    roomLeft: 2,
    specs: { bed: 1, bath: 1, ac: 1, wifi: 1 },
    coordinates: { x: 20, y: 75 },
    latLng: [-7.7850, 110.3700],
    facilities: ["WiFi", "AC", "KM Dalam", "Kloset Duduk", "Air Panas", "Dispenser", "Kulkas", "R. Tamu"],
    rules: ["Akses 24 jam", "Boleh bawa hewan", "Maks. 2 orang/kamar"],
  },
  {
    id: "sp-4",
    img: recom1,
    price: "Rp 950.000 / bln",
    priceVal: 950000,
    title: "Kost Industrial Condongcatur",
    location: "Condongcatur, Sleman, Yogyakarta",
    type: "Putri",
    period: "Bulanan",
    rating: 4.6,
    roomLeft: 4,
    specs: { bed: 1, bath: 1, ac: 1, wifi: 1 },
    coordinates: { x: 72, y: 22 },
    latLng: [-7.7610, 110.4005],
    facilities: ["WiFi", "AC", "KM Dalam", "Kasur", "Lemari Baju", "Meja", "Kursi", "Mushola", "R. Keluarga"],
    rules: ["Maks. 2 orang/kamar", "Khusus karyawan"],
  },
  {
    id: "sp-5",
    img: recom2,
    price: "Rp 180.000 / minggu",
    priceVal: 180000,
    title: "Kost Cozy Seturan Townhouse",
    location: "Seturan, Depok, Yogyakarta",
    type: "Putri",
    period: "Mingguan",
    rating: 4.5,
    roomLeft: 1,
    specs: { bed: 1, bath: 1, ac: 0, wifi: 1 },
    coordinates: { x: 80, y: 55 },
    latLng: [-7.7745, 110.4075],
    facilities: ["WiFi", "Kloset Duduk", "Kasur", "Jendela", "Parkir Motor", "Laundry"],
    rules: ["Boleh pasutri", "Boleh bawa anak"],
  },
  {
    id: "sp-6",
    img: recom3,
    price: "Rp 4.000.000 / 3 bln",
    originalPrice: "Rp 4.500.000",
    priceVal: 4000000,
    title: "Kost Executive BSD Premium Suite",
    location: "Serpong, Tangerang, Banten",
    type: "Campur",
    period: "3 Bulan",
    rating: 5.0,
    roomLeft: 6,
    specs: { bed: 2, bath: 2, ac: 2, wifi: 1 },
    coordinates: { x: 45, y: 85 },
    latLng: [-7.7650, 110.3800],
    facilities: ["WiFi", "AC", "KM Dalam", "Kloset Duduk", "Air Panas", "TV", "Termasuk Listrik", "Penjaga Kos"],
    rules: ["Akses 24 jam", "Khusus karyawan"],
  },
  {
    id: "sp-7",
    img: promo1,
    price: "Rp 15.000.000 / thn",
    priceVal: 15000000,
    title: "Kost Backpacker Jogja Tahunan",
    location: "Malioboro, Yogyakarta",
    type: "Campur",
    period: "Tahunan",
    rating: 4.4,
    roomLeft: 8,
    specs: { bed: 1, bath: 1, ac: 0, wifi: 1 },
    coordinates: { x: 15, y: 50 },
    latLng: [-7.7925, 110.3660],
    facilities: ["WiFi", "Kloset Duduk", "Kasur", "Dapur", "Parkir Motor"],
    rules: ["Boleh pasutri", "Khusus karyawan"],
  },
  {
    id: "sp-8",
    img: recom1,
    price: "Rp 5.500.000 / 6 bln",
    priceVal: 5500000,
    title: "Kost Transit Exclusive 6 Bulan",
    location: "Tebet, Jakarta Selatan",
    type: "Campur",
    period: "6 Bulan",
    rating: 4.8,
    roomLeft: 3,
    specs: { bed: 1, bath: 1, ac: 1, wifi: 1 },
    coordinates: { x: 60, y: 68 },
    latLng: [-7.7800, 110.3600],
    facilities: ["WiFi", "AC", "KM Dalam", "Air Panas", "TV", "Kipas Angin", "Mesin Cuci", "R. Keluarga"],
    rules: ["Akses 24 jam", "Maks. 2 orang/kamar", "Boleh bawa hewan"],
  }
];

export const PROPERTY_DETAILS_DB: Record<string, Omit<PropertyDetail, keyof SearchKostCard>> = {
  "sp-1": {
    gallery: [promo1, feat1, feat2, feat3, heroBg],
    host: {
      name: "John Doberman",
      avatar: "https://api.dicebear.com/7.x/adventurer/svg?seed=John",
      joined: "Nov 2023"
    },
    highlights: ["Full Furniture", "Kamar Mandi Dalam", "Parkiran Mobil/Motor", "Peliharaan Diperbolehkan"],
    roomSpecs: ["5 x 4 meter", "Termasuk listrik", "Akses kunci 24 jam", "Maksimal 2 orang"],
    bathroomFacilities: ["Kloset Duduk", "Shower", "Kamar Mandi Dalam", "Air Panas"],
    rulesDetails: [
      "Maks. 2 orang/kamar",
      "Tambah biaya untuk alat elektronik bawaan",
      "Dilarang merokok di kamar",
      "Lawan jenis dilarang ke kamar",
      "Wajib piket",
      "Boleh bawa hewan peliharaan kecil",
      "Ada jam malam untuk tamu",
      "Denda kerusakan barang kos ditanggung penyewa"
    ],
    roomTypes: [
      {
        name: "Ekonomis",
        price: "Rp 650.000",
        specs: { bed: 1, bath: 1, ac: 0, wifi: 1 },
        img: feat1,
        facilities: ["Dapur Umum", "WiFi", "Kasur Single", "Kipas Angin", "Meja Belajar"]
      },
      {
        name: "Standart",
        price: "Rp 850.000",
        specs: { bed: 1, bath: 1, ac: 1, wifi: 1 },
        img: feat2,
        facilities: ["Dapur Umum", "WiFi", "AC", "Kasur Single", "KM Dalam", "Meja"]
      },
      {
        name: "Luxury",
        price: "Rp 1.200.000",
        specs: { bed: 2, bath: 1, ac: 1, wifi: 1 },
        img: feat3,
        facilities: ["Dapur Umum", "WiFi", "AC", "Kasur Queen", "KM Dalam", "Air Panas", "TV"]
      }
    ],
    nearbyPlaces: [
      { name: "Warteg 24", distance: "914 m", rating: 5 },
      { name: "Alfamart", distance: "373 m", rating: 5 },
      { name: "Masjid Muslim United", distance: "2.0 km", rating: 5 }
    ],
    rentalTerms: {
      min: "Bisa di hari H setelah pengajuan sewa.",
      max: "2 bulan setelah pengajuan sewa."
    },
    reviewsList: [
      {
        avatar: "https://api.dicebear.com/7.x/adventurer/svg?seed=John",
        name: "John Doberman",
        date: "Mar 12 2026",
        content: "Kamar sangat bersih, fasilitas lengkap sesuai dengan foto di aplikasi. Lokasi strategis dekat minimarket dan area kuliner. Sangat recommended!",
        rating: 5
      },
      {
        avatar: "https://api.dicebear.com/7.x/adventurer/svg?seed=Sarah",
        name: "Sarah Connor",
        date: "Feb 10 2026",
        content: "Kost bersih, lingkungannya tenang sekali. Parkiran luas dan penjaga sangat ramah. Recommended!",
        rating: 5
      }
    ]
  },
  "sp-2": {
    gallery: [promo2, feat2, feat3, feat1, heroWaterfront],
    host: {
      name: "Sarah Connor",
      avatar: "https://api.dicebear.com/7.x/adventurer/svg?seed=Sarah",
      joined: "Jan 2024"
    },
    highlights: ["Full Furniture", "Kamar Mandi Dalam", "Parkiran Mobil/Motor", "Keamanan 24 Jam"],
    roomSpecs: ["4 x 4 meter", "Tidak termasuk listrik", "Akses kunci 24 jam", "Maksimal 1 orang"],
    bathroomFacilities: ["Kloset Duduk", "Shower", "Kamar Mandi Dalam", "Air Panas"],
    rulesDetails: [
      "Maks. 1 orang/kamar",
      "Dilarang membawa hewan peliharaan",
      "Dilarang merokok di dalam kamar",
      "Tamu lawan jenis dilarang menginap",
      "Menjaga ketenangan setelah pukul 22:00 WIB"
    ],
    roomTypes: [
      {
        name: "Standart",
        price: "Rp 850.000",
        specs: { bed: 1, bath: 1, ac: 1, wifi: 1 },
        img: feat2,
        facilities: ["Dapur Umum", "WiFi", "AC", "Kasur Single", "KM Dalam"]
      },
      {
        name: "Luxury Premium",
        price: "Rp 1.100.000",
        specs: { bed: 1, bath: 1, ac: 1, wifi: 1 },
        img: feat3,
        facilities: ["Dapur Umum", "WiFi", "AC", "Kasur Queen", "KM Dalam", "Air Panas", "TV"]
      }
    ],
    nearbyPlaces: [
      { name: "Warmindo Gejayan", distance: "450 m", rating: 4.8 },
      { name: "Indomaret Point", distance: "200 m", rating: 4.7 },
      { name: "Apotek K-24", distance: "600 m", rating: 4.9 }
    ],
    rentalTerms: {
      min: "H+1 setelah pembayaran DP.",
      max: "1 bulan setelah pengajuan sewa."
    },
    reviewsList: [
      {
        avatar: "https://api.dicebear.com/7.x/adventurer/svg?seed=Dan",
        name: "Daniel",
        date: "Apr 05 2026",
        content: "Kost eksklusif yang sangat sepadan dengan harganya. AC dingin, kamar mandi bersih, parkiran mobil juga aman terjaga.",
        rating: 5
      }
    ]
  },
  "sp-3": {
    gallery: [promo3, feat3, feat1, feat2, kostBanner],
    host: {
      name: "Budi Santoso",
      avatar: "https://api.dicebear.com/7.x/adventurer/svg?seed=Budi",
      joined: "Jul 2022"
    },
    highlights: ["Full Furniture", "Lobi Tamu", "Akses 24 Jam", "Dispenser & Kulkas Bersama"],
    roomSpecs: ["6 x 4 meter", "Termasuk listrik", "Akses kunci 24 jam", "Maksimal 2 orang"],
    bathroomFacilities: ["Kloset Duduk", "Shower", "Kamar Mandi Dalam", "Air Panas", "Bathtub"],
    rulesDetails: [
      "Maks. 2 orang/kamar",
      "Boleh membawa hewan peliharaan (anjing/kucing)",
      "Bebas jam malam tamu (tamu wajib lapor penjaga)",
      "Menjaga kebersihan bersama"
    ],
    roomTypes: [
      {
        name: "Luxury Suite",
        price: "Rp 1.200.000",
        specs: { bed: 1, bath: 1, ac: 1, wifi: 1 },
        img: feat3,
        facilities: ["WiFi", "AC", "KM Dalam", "Kloset Duduk", "Air Panas", "Kulkas Kecil", "R. Tamu"]
      }
    ],
    nearbyPlaces: [
      { name: "Kemang Food Fest", distance: "300 m", rating: 4.6 },
      { name: "Kemang Village Mall", distance: "1.2 km", rating: 4.8 },
      { name: "Circle K Kemang", distance: "150 m", rating: 4.5 }
    ],
    rentalTerms: {
      min: "Bisa di hari H setelah verifikasi dokumen.",
      max: "3 bulan sebelum sewa dimulai."
    },
    reviewsList: [
      {
        avatar: "https://api.dicebear.com/7.x/adventurer/svg?seed=Clara",
        name: "Clara",
        date: "May 01 2026",
        content: "Suasananya cozy banget, serasa tinggal di hotel/apartemen. Owner ramah sekali dan sangat membantu kalau ada keluhan air atau listrik.",
        rating: 5
      }
    ]
  },
  "sp-4": {
    gallery: [recom1, propStaggered1, propStaggered2, feat1, heroBg],
    host: {
      name: "Andi Wijaya",
      avatar: "https://api.dicebear.com/7.x/adventurer/svg?seed=Andi",
      joined: "Mar 2023"
    },
    highlights: ["Full Furniture", "Desain Industrial", "Akses 24 Jam", "R. Santai Bersama"],
    roomSpecs: ["4 x 3.5 meter", "Termasuk listrik", "Akses 24 jam", "Maksimal 2 orang"],
    bathroomFacilities: ["Kloset Duduk", "Shower", "Kamar Mandi Dalam"],
    rulesDetails: [
      "Maks. 2 orang/kamar",
      "Dilarang merokok di area kamar",
      "Khusus mahasiswa/karyawan putri",
      "Dilarang membawa hewan peliharaan"
    ],
    roomTypes: [
      {
        name: "Industrial Class",
        price: "Rp 950.000",
        specs: { bed: 1, bath: 1, ac: 1, wifi: 1 },
        img: recom1,
        facilities: ["WiFi", "AC", "KM Dalam", "Kasur Single", "Meja Kerja", "Lemari Baju"]
      }
    ],
    nearbyPlaces: [
      { name: "Pakuwon Mall Jogja", distance: "1.5 km", rating: 4.8 },
      { name: "Burjo Condongcatur", distance: "250 m", rating: 4.7 },
      { name: "Superindo", distance: "800 m", rating: 4.6 }
    ],
    rentalTerms: {
      min: "Bisa di hari H.",
      max: "1 bulan setelah pengajuan sewa."
    },
    reviewsList: [
      {
        avatar: "https://api.dicebear.com/7.x/adventurer/svg?seed=Mega",
        name: "Mega",
        date: "Feb 18 2026",
        content: "Desain kamarnya modern banget, instagramable. Lingkungannya aman, gerbang selalu terkunci rapat.",
        rating: 5
      }
    ]
  },
  "sp-5": {
    gallery: [recom2, propStaggered2, propStaggered3, feat2, heroWaterfront],
    host: {
      name: "Rian Hermawan",
      avatar: "https://api.dicebear.com/7.x/adventurer/svg?seed=Rian",
      joined: "Oct 2023"
    },
    highlights: ["Ekonomis", "Lingkungan Tenang", "Parkiran Motor Aman", "Dapur Bersama"],
    roomSpecs: ["3 x 3 meter", "Tidak termasuk listrik", "Akses gerbang maks pukul 23.00", "Maksimal 1 orang"],
    bathroomFacilities: ["Kloset Jongkok/Duduk", "Shower", "Kamar Mandi Luar"],
    rulesDetails: [
      "Maks. 1 orang/kamar",
      "Dilarang membawa tamu lawan jenis menginap",
      "Dilarang merokok di dalam kamar",
      "Gerbang ditutup pukul 23:00 WIB"
    ],
    roomTypes: [
      {
        name: "Cozy Room",
        price: "Rp 700.000",
        specs: { bed: 1, bath: 1, ac: 0, wifi: 1 },
        img: recom2,
        facilities: ["WiFi", "Kasur Single", "Meja", "Lemari Baju", "Jendela"]
      }
    ],
    nearbyPlaces: [
      { name: "UPN Veteran Yogyakarta", distance: "800 m", rating: 4.8 },
      { name: "Seturan Culinary Street", distance: "300 m", rating: 4.6 },
      { name: "Lotte Mart", distance: "1.8 km", rating: 4.7 }
    ],
    rentalTerms: {
      min: "H+2 setelah pembayaran sewa.",
      max: "1 bulan sebelum mulai sewa."
    },
    reviewsList: [
      {
        avatar: "https://api.dicebear.com/7.x/adventurer/svg?seed=Ari",
        name: "Ari",
        date: "Jan 12 2026",
        content: "Harganya murah meriah cocok untuk mahasiswa. WiFi kencang, aman dari bising jalan raya.",
        rating: 4.5
      }
    ]
  },
  "sp-6": {
    gallery: [recom3, propStaggered3, propStaggered1, feat3, kostBanner],
    host: {
      name: "Indra Wijaya",
      avatar: "https://api.dicebear.com/7.x/adventurer/svg?seed=Indra",
      joined: "Sep 2021"
    },
    highlights: ["Full Furniture", "Premium Suite", "Parkir Mobil Luas", "Keamanan Card Access"],
    roomSpecs: ["6 x 5 meter", "Termasuk listrik", "Akses kunci 24 jam", "Maksimal 2 orang"],
    bathroomFacilities: ["Kloset Duduk", "Shower", "Kamar Mandi Dalam", "Air Panas", "Wastafel"],
    rulesDetails: [
      "Maks. 2 orang/kamar",
      "Khusus karyawan/pasutri resmi",
      "Akses gerbang menggunakan smart card",
      "Dilarang merokok di area dalam kamar"
    ],
    roomTypes: [
      {
        name: "Executive Suite",
        price: "Rp 4.000.000",
        specs: { bed: 2, bath: 2, ac: 2, wifi: 1 },
        img: recom3,
        facilities: ["WiFi", "AC", "KM Dalam", "Smart TV", "Termasuk Listrik", "Kulkas 2 Pintu", "Dispenser"]
      }
    ],
    nearbyPlaces: [
      { name: "AEON Mall BSD", distance: "2.1 km", rating: 4.9 },
      { name: "The Breeze BSD", distance: "1.5 km", rating: 4.8 },
      { name: "QBig BSD City", distance: "3.0 km", rating: 4.7 }
    ],
    rentalTerms: {
      min: "Bisa di hari H setelah kontrak sewa ditandatangani.",
      max: "3 bulan sebelum sewa dimulai."
    },
    reviewsList: [
      {
        avatar: "https://api.dicebear.com/7.x/adventurer/svg?seed=Kevin",
        name: "Kevin",
        date: "Apr 28 2026",
        content: "Fasilitas sangat premium, parkiran luas muat banyak mobil. Keamanan terjamin karena menggunakan access card.",
        rating: 5
      }
    ]
  },
  "sp-7": {
    gallery: [promo1, feat1, feat2, feat3, heroWaterfront],
    host: {
      name: "Agus Pratama",
      avatar: "https://api.dicebear.com/7.x/adventurer/svg?seed=Agus",
      joined: "May 2023"
    },
    highlights: ["Lokasi Tengah Kota", "Ekonomis", "Boleh Pasutri", "Dapur Bersama"],
    roomSpecs: ["3.5 x 3.5 meter", "Tidak termasuk listrik", "Akses 24 jam", "Maksimal 2 orang"],
    bathroomFacilities: ["Kloset Duduk", "Shower", "Kamar Mandi Dalam"],
    rulesDetails: [
      "Maks. 2 orang/kamar",
      "Boleh pasutri resmi",
      "Wajib lapor RT setempat jika membawa tamu menginap",
      "Menjaga ketertiban lingkungan"
    ],
    roomTypes: [
      {
        name: "Backpacker Room",
        price: "Rp 1.250.000",
        specs: { bed: 1, bath: 1, ac: 0, wifi: 1 },
        img: feat1,
        facilities: ["WiFi", "Kasur Single", "Meja", "Lemari Baju", "Jendela"]
      }
    ],
    nearbyPlaces: [
      { name: "Stasiun Tugu", distance: "800 m", rating: 4.8 },
      { name: "Jalan Malioboro", distance: "200 m", rating: 4.7 },
      { name: "Pasar Beringharjo", distance: "1.0 km", rating: 4.6 }
    ],
    rentalTerms: {
      min: "H+1 setelah pembayaran lunas.",
      max: "2 bulan sebelum sewa."
    },
    reviewsList: [
      {
        avatar: "https://api.dicebear.com/7.x/adventurer/svg?seed=Toni",
        name: "Toni",
        date: "Mar 30 2026",
        content: "Lokasi paling juara, jalan kaki cuma 2 menit udah sampai Malioboro. Kamar mandi dalam dengan kloset duduk bersih.",
        rating: 4.8
      }
    ]
  },
  "sp-8": {
    gallery: [recom1, feat2, feat3, feat1, kostBanner],
    host: {
      name: "Rendy Saputra",
      avatar: "https://api.dicebear.com/7.x/adventurer/svg?seed=Rendy",
      joined: "Dec 2024"
    },
    highlights: ["Akses 24 Jam", "Maks. 2 Orang", "Boleh Bawa Hewan", "Air Panas & TV"],
    roomSpecs: ["4.5 x 3.5 meter", "Termasuk listrik", "Akses kunci 24 jam", "Maksimal 2 orang"],
    bathroomFacilities: ["Kloset Duduk", "Shower", "Kamar Mandi Dalam", "Air Panas"],
    rulesDetails: [
      "Maks. 2 orang/kamar",
      "Boleh membawa hewan peliharaan ukuran kecil/sedang",
      "Bebas jam malam tamu (tamu menginap wajib infokan pemilik)",
      "Denda kerusakan ditanggung penuh penyewa"
    ],
    roomTypes: [
      {
        name: "Transit Premium",
        price: "Rp 950.000",
        specs: { bed: 1, bath: 1, ac: 1, wifi: 1 },
        img: feat2,
        facilities: ["WiFi", "AC", "KM Dalam", "Air Panas", "TV", "Kulkas Kecil"]
      }
    ],
    nearbyPlaces: [
      { name: "Stasiun Tebet", distance: "1.1 km", rating: 4.6 },
      { name: "Tebet Eco Park", distance: "800 m", rating: 4.8 },
      { name: "Sentra Kuliner Tebet", distance: "400 m", rating: 4.7 }
    ],
    rentalTerms: {
      min: "Bisa di hari H.",
      max: "1 bulan setelah pengajuan sewa."
    },
    reviewsList: [
      {
        avatar: "https://api.dicebear.com/7.x/adventurer/svg?seed=Lina",
        name: "Lina",
        date: "Apr 15 2026",
        content: "Kamarnya wangi dan bersih. Lengkap dengan AC dingin, smart TV, dan air panas buat mandi sehabis kerja. Top banget!",
        rating: 5
      }
    ]
  }
};

