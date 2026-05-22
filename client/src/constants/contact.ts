/* ─── Contact Page Constants ─── */

export const CONTACT_HERO = {
  tag: "Hubungi Kami",
  title: "Contact Us",
  desc: "Sampaikan kebutuhan hunian Anda dan tim kami akan merespons dalam waktu 24 jam untuk membantu Anda menemukan kost atau kontrakan terbaik.",
};

export const CONTACT_FORM_FIELDS = {
  name: { label: "Nama Lengkap", placeholder: "Nama lengkap Anda" },
  email: { label: "Email", placeholder: "email@contoh.com" },
  phone: { label: "Nomor Telepon", placeholder: "+62 812 3456 7890" },
  type: {
    label: "Tipe Kebutuhan",
    placeholder: "Pilih tipe kebutuhan...",
    options: [
      "Sewa Kost",
      "Kontrakan",
      "Kerjasama Bisnis",
      "Lainnya",
    ],
  },
  city: { label: "Kota Tujuan", placeholder: "Pilih kota tujuan..." },
  budget: {
    label: "Budget",
    placeholder: "Pilih rentang budget...",
    options: [
      "< Rp 500.000",
      "Rp 500.000 – Rp 1.000.000",
      "Rp 1.000.000 – Rp 2.000.000",
      "> Rp 2.000.000",
    ],
  },
  message: {
    label: "Pesan / Permintaan Khusus",
    placeholder: "Ada hal lain yang ingin Anda sampaikan?",
  },
  submitLabel: "Kirim Pesan",
};

export const CONTACT_INFO_CARDS = [
  {
    id: "phone",
    title: "Telepon & WhatsApp",
    lines: ["+62 812 3456 7890", "+62 821 9876 5432"],
  },
  {
    id: "hours",
    title: "Jam Operasional",
    lines: ["Senin – Sabtu: 08.00 – 17.00", "Minggu: Libur"],
  },
  {
    id: "email",
    title: "Tulis ke Kami",
    lines: ["info@hunizen.com", "support@hunizen.com"],
  },
];

export const CONTACT_CTA = {
  tag: "Mulai Sekarang",
  title: "Temukan hunian",
  titleItalic: "impian",
  titleEnd: "Anda",
  desc: "Cari kost atau kontrakan yang tepat dalam hitungan menit dan nikmati setiap momen tinggal Anda.",
};
