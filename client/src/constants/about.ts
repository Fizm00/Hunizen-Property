import { 
  Clock, 
  ShieldCheck, 
  CheckCircle, 
  Sparkles, 
  Home, 
  Building2, 
  DoorClosed, 
  UserCheck 
} from "lucide-react";

export const HERO_CONTENT = {
  title: "About Us",
  breadcrumbs: [
    { label: "Home", path: "/" },
    { label: "About Us", path: "/about", isCurrent: true }
  ]
};

export const BENTO_HEADER = {
  tag: "Welcome to Hunizen",
  title: "Platform Hunian Terintegrasi & Estetik"
};

export const BENTO_CARDS = {
  card1: {
    tag: "Terkurasi Langsung",
    title: "Standardisasi Hunian Kelas Premium",
    desc: "Setiap kamar kos dan kontrakan yang terdaftar di platform kami telah melewati proses inspeksi langsung oleh tim lapangan guna memastikan keselarasan fasilitas dan kenyamanan optimal."
  },
  card2: {
    value: "25+",
    title: "Kota Layanan",
    desc: "Hadir menghubungkan pemilik kos lokal di berbagai kota besar di seluruh Indonesia."
  },
  card3: {
    value: "1,250+",
    title: "Hunian Tersewa",
    desc: "Ribuan penyewa aktif menikmati kemudahan transaksi bulanan tanpa biaya siluman."
  },
  card4: {
    tag: "Aksesibilitas",
    title: "Lokasi Strategis",
    desc: "Akses jalan raya utama dan dekat dengan pusat transportasi umum serta kampus ternama."
  },
  card5: {
    title: "Visi & Misi Hunizen",
    desc: "Kami membangun ekosistem real estate digital yang aman, transparan, dan terstandarisasi. Menghilangkan kerumitan transaksi tradisional dengan pembayaran digital sewa sekali klik dan kontrak berbasis hukum."
  },
  card6: {
    title: "Workspace Premium"
  }
};

export const WHY_CHOOSE_US_HEADER = {
  tag: "Why Choose Us",
  title: "Solusi Terbaik Bagi Pemilik & Penyewa Kost",
  desc: "Kami menyederhanakan alur sewa menyewa properti di Indonesia dengan menghadirkan verifikasi fisik komprehensif, platform pembayaran modern terpercaya, serta kurasi hunian bergaya arsitektur premium."
};

export const WHY_CHOOSE_US_CARDS = [
  {
    Icon: Clock,
    title: "Pencarian Cepat",
    desc: "Temukan unit kost ideal dalam hitungan menit lewat filter pencarian kota dan detail kamar pintar."
  },
  {
    Icon: ShieldCheck,
    title: "Transaksi Aman",
    desc: "Seluruh dana sewa bulanan disalurkan lewat digital gateway terenkripsi dengan jaminan aman 100%."
  },
  {
    Icon: CheckCircle,
    title: "Terverifikasi 100%",
    desc: "Fasilitas kamar, akurasi harga sewa, dan denah lokasi fisik telah divalidasi langsung oleh tim inspektor."
  },
  {
    Icon: Sparkles,
    title: "Desain Premium",
    desc: "Kamar kost dengan sentuhan desain interior modern, pencahayaan alami, dan sirkulasi udara optimal."
  }
];

export const PARTNER_LOGOS = [
  { Icon: DoorClosed, label: "The Doors" },
  { Icon: Home, label: "My House" },
  { Icon: Building2, label: "Property Co" },
  { Icon: UserCheck, label: "Human Shelter" }
];

export const TESTIMONIAL_CONTENT = {
  tag: "Kualitas Terjamin",
  title: "Desain Interior & Tata Ruang Hunian Kelas Premium",
  desc: "Hunizen berkolaborasi dengan arsitek dan desainer tata kota terpilih untuk menghadirkan hunian sewa yang ergonomis, memaksimalkan pencahayaan sehat, dan menawarkan estetika visual ruang kelas dunia yang fungsional bagi aktivitas produktif harian Anda.",
  signature: {
    name: "Budi Santoso",
    role: "Budi Santoso, CEO Hunizen"
  },
  quote: {
    text: "Hunizen benar-benar merevolusi cara saya menyewa kos. Kamarnya bersih, nyaman, transaksi digitalnya transparan, dan jaminan verifikasi datanya sangat akurat.",
    author: "Mark M.",
    role: "Penyewa Profesional"
  }
};

export const CTA_CONTENT = {
  title: "Siap Menemukan Hunian Impian Anda Bersama Hunizen?",
  desc: "Mulai jelajahi ribuan pilihan properti kost dan kontrakan terverifikasi di kota Anda sekarang.",
  buttonLabel: "Hubungi Kami"
};
