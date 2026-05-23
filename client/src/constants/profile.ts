import recom1 from "../assets/recom_kost_1.png";
import promo2 from "../assets/promo_kost_2.png";
import promo3 from "../assets/promo_kost_3.png";
import type { 
  SidebarMenuItem, 
  RentHistoryItem, 
  ActiveRentItem,
  ComplaintItem,
  UserReviewItem,
  TransactionItem,
  BillItem
} from "../types/profile";

export const PROFILE_SIDEBAR_MENU: SidebarMenuItem[] = [
  { id: "pengaturan", label: "Pengaturan", iconName: "Settings" },
  { id: "riwayat", label: "Riwayat Pengajuan Sewa", iconName: "History" },
  { id: "kos", label: "Kos Saya", iconName: "Home" },
  { id: "ulasan", label: "Ulasan", iconName: "MessageSquare" },
  { id: "transaksi", label: "Transaksi", iconName: "CreditCard" },
  { id: "tagihan", label: "Tagihan", iconName: "Receipt" },
];

export const RENT_HISTORY_DATA: RentHistoryItem[] = [
  {
    id: "REQ-2026-001",
    propertyName: "Kost Apik Duren Sawit Tipe A",
    propertyImage: recom1,
    location: "Duren Sawit, Jakarta Timur",
    applyDate: "12 Mei 2026",
    startDate: "1 Juni 2026",
    duration: "3 Bulan",
    price: "Rp 1.800.000 / bulan",
    status: "disetujui",
    roomType: "Kost Putra - Single Bed",
    landlordPhone: "+6281234567890",
  },
  {
    id: "REQ-2026-002",
    propertyName: "Kost Singgahsini Waterfront Executive",
    propertyImage: promo2,
    location: "Coblong, Bandung",
    applyDate: "08 Mei 2026",
    startDate: "15 Juni 2026",
    duration: "1 Bulan",
    price: "Rp 2.450.000 / bulan",
    status: "pending",
    roomType: "Kost Campur - Double Bed",
    landlordPhone: "+6287765432100",
  },
  {
    id: "REQ-2026-003",
    propertyName: "Kost Cozy Stay Condongcatur Jogja",
    propertyImage: promo3,
    location: "Depok, Sleman, Yogyakarta",
    applyDate: "20 April 2026",
    startDate: "1 Mei 2026",
    duration: "6 Bulan",
    price: "Rp 1.200.000 / bulan",
    status: "ditolak",
    roomType: "Kost Putri - Single Bed",
    landlordPhone: "+6281399887766",
  },
];

export const GENDER_OPTIONS = [
  { value: "Laki-laki", label: "Laki-laki" },
  { value: "Perempuan", label: "Perempuan" },
];

export const JOB_OPTIONS = [
  { value: "Mahasiswa", label: "Mahasiswa" },
  { value: "Karyawan", label: "Karyawan" },
  { value: "Wirausaha", label: "Wirausaha" },
  { value: "Lainnya", label: "Lainnya" },
];

export const CITY_OPTIONS = [
  { value: "Jakarta", label: "Jakarta" },
  { value: "Bandung", label: "Bandung" },
  { value: "Yogyakarta", label: "Yogyakarta" },
  { value: "Surabaya", label: "Surabaya" },
  { value: "Malang", label: "Malang" },
  { value: "Semarang", label: "Semarang" },
  { value: "Medan", label: "Medan" },
  { value: "Lainnya", label: "Lainnya" },
];

export const STATUS_OPTIONS = [
  { value: "Belum Menikah", label: "Belum Menikah" },
  { value: "Menikah", label: "Menikah" },
];

export const EDUCATION_OPTIONS = [
  { value: "SMA/SMK", label: "SMA/SMK" },
  { value: "Diploma (D3)", label: "Diploma (D3)" },
  { value: "Sarjana (S1)", label: "Sarjana (S1)" },
  { value: "Pascasarjana (S2/S3)", label: "Pascasarjana (S2/S3)" },
];

export const MOCK_ACTIVE_RENT: ActiveRentItem = {
  id: "KOS-2026-904",
  propertyName: "Kost Apik Duren Sawit Tipe A",
  propertyImage: recom1,
  location: "Duren Sawit, Jakarta Timur",
  roomName: "Kamar No. 102 - Lantai 2",
  startDate: "1 Mei 2026",
  endDate: "1 Agustus 2026",
  price: "Rp 1.800.000 / bulan",
  landlordName: "Ibu H. Rahma",
  landlordPhone: "+6281234567890",
  nextPaymentDate: "1 Juni 2026",
  paymentStatus: "lunas",
  kostRules: [
    "Dilarang membawa hewan peliharaan",
    "Batas bertamu maksimal pukul 22.00 WIB",
    "Menjaga kebersihan kamar dan koridor bersama",
    "Dilarang membuat kegaduhan selepas pukul 21.00 WIB"
  ]
};

export const MOCK_COMPLAINTS_DATA: ComplaintItem[] = [
  {
    id: "REP-9921",
    category: "Fasilitas Kamar",
    title: "AC kurang dingin dan bising",
    description: "AC di dalam kamar sudah diset suhu 16 derajat namun hembusan angin kurang terasa dingin dan unit indoor mengeluarkan suara bising secara konstan.",
    date: "15 Mei 2026",
    status: "selesai",
    notes: "Teknisi Hunizen AC sudah datang mengisi freon dan membersihkan filter pada 17 Mei 2026. AC kini dingin dan berfungsi normal."
  },
  {
    id: "REP-9954",
    category: "Air & Listrik",
    title: "Lampu kamar mandi mati tiba-tiba",
    description: "Lampu LED di dalam kamar mandi mati total secara mendadak semenjak tadi malam. Mohon diganti dengan bohlam yang baru.",
    date: "22 Mei 2026",
    status: "proses",
    notes: "Sudah dijadwalkan oleh pemilik kos untuk diganti oleh penjaga kos besok pagi pukul 09:00 WIB."
  }
];

export const MOCK_REVIEWS_DATA: UserReviewItem[] = [
  {
    id: "REV-9012",
    propertyName: "Kost Apik Duren Sawit Tipe A",
    roomName: "Kamar No. 102 - Lantai 2",
    rating: 5,
    date: "10 Mei 2026",
    comment: "Sangat puas tinggal di sini. Kamarnya bersih, AC dingin, dan pemilik kost Ibu H. Rahma sangat ramah. Lokasi dekat dengan halte busway memudahkan saya untuk berangkat kerja.",
    landlordReply: "Terima kasih banyak atas ulasan positifnya, Kak! Semoga betah tinggal di Hunizen."
  },
  {
    id: "REV-8941",
    propertyName: "Kost Cozy Stay Condongcatur Jogja",
    roomName: "Kamar No. 04 - Lantai 1",
    rating: 4,
    date: "28 April 2026",
    comment: "Fasilitas lengkap sesuai deskripsi. WiFi stabil untuk WFH. Hanya saja area parkir motor agak sempit di malam hari.",
    landlordReply: "Terima kasih masukannya, Kak. Kami sedang mengupayakan perluasan lahan parkir motor bulan depan."
  }
];

export const MOCK_TRANSACTIONS_DATA: TransactionItem[] = [
  {
    id: "TXN-2026-0098",
    propertyName: "Kost Apik Duren Sawit Tipe A",
    roomName: "Kamar No. 102 - Lantai 2",
    amount: "Rp 1.800.000",
    date: "01 Mei 2026, 09:15 WIB",
    type: "Sewa Kamar (Bulan Pertama)",
    method: "GoPay",
    status: "berhasil"
  },
  {
    id: "TXN-2026-0045",
    propertyName: "Kost Apik Duren Sawit Tipe A",
    roomName: "Kamar No. 102 - Lantai 2",
    amount: "Rp 100.000",
    date: "01 Mei 2026, 09:30 WIB",
    type: "Uang Jaminan / Deposit",
    method: "GoPay",
    status: "berhasil"
  },
  {
    id: "TXN-2026-0012",
    propertyName: "Kost Cozy Stay Condongcatur Jogja",
    roomName: "Kamar No. 04 - Lantai 1",
    amount: "Rp 1.200.000",
    date: "25 April 2026, 14:22 WIB",
    type: "Sewa Kamar (Bulan Pertama)",
    method: "BNI Virtual Account",
    status: "gagal"
  }
];

export const MOCK_BILLS_DATA: BillItem[] = [
  {
    id: "INV-2026-0501",
    propertyName: "Kost Apik Duren Sawit Tipe A",
    roomName: "Kamar No. 102 - Lantai 2",
    amount: "Rp 1.800.000",
    dueDate: "01 Juni 2026",
    type: "Sewa Bulanan (Juni)",
    status: "belum_bayar",
    month: "Juni 2026"
  },
  {
    id: "INV-2026-0401",
    propertyName: "Kost Apik Duren Sawit Tipe A",
    roomName: "Kamar No. 102 - Lantai 2",
    amount: "Rp 1.800.000",
    dueDate: "01 Mei 2026",
    type: "Sewa Bulanan (Mei)",
    status: "lunas",
    month: "Mei 2026"
  },
  {
    id: "INV-2026-0402",
    propertyName: "Kost Apik Duren Sawit Tipe A",
    roomName: "Kamar No. 102 - Lantai 2",
    amount: "Rp 100.000",
    dueDate: "01 Mei 2026",
    type: "Deposit Kamar Kost",
    status: "lunas",
    month: "Mei 2026"
  }
];
