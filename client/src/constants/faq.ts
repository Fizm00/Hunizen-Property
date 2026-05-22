export interface FaqItem {
  question: string;
  answer: string;
}

export interface FaqCategory {
  id: string;
  title: string;
  desc: string;
  items: FaqItem[];
}

export const FAQ_HERO_CONTENT = {
  tag: "Support & Pusat Bantuan",
  title: "Frequently Asked Questions",
  desc: "Butuh bantuan mengenai pemesanan kost atau metode pembayaran? Temukan jawaban cepat dari pertanyaan yang paling sering diajukan di bawah ini.",
  searchPlaceholder: "Cari pertanyaan Anda di sini..."
};

export const FAQ_CATEGORIES: FaqCategory[] = [
  {
    id: "general",
    title: "General FAQs",
    desc: "Segala hal yang perlu Anda ketahui tentang cara kerja platform Hunizen, pencarian hunian terverifikasi, dan alur sewa kost.",
    items: [
      {
        question: "Bagaimana cara mencari kost di Hunizen?",
        answer: "Anda cukup menggunakan fitur pencarian di beranda utama Hunizen. Masukkan nama area, kota, atau kampus terdekat di kotak pencarian, lalu gunakan filter lanjutan untuk menyaring hasil berdasarkan harga, tipe kost (Putra/Putri/Campur), dan fasilitas utama."
      },
      {
        question: "Apakah foto dan fasilitas kost di Hunizen terjamin keasliannya?",
        answer: "Ya, 100% kos yang terdaftar di Hunizen telah melalui proses survei lapangan dan verifikasi oleh tim internal kami untuk memastikan keaslian lokasi, foto kamar, serta kelengkapan fasilitas yang ditampilkan di platform."
      },
      {
        question: "Bagaimana alur transaksi penyewaan kost di Hunizen?",
        answer: "Cari properti pilihan Anda -> Pilih tipe kamar yang sesuai -> Isi informasi detail diri penyewa -> Tentukan tanggal masuk serta durasi sewa -> Lakukan pembayaran secara instan menggunakan metode pilihan Anda -> Terima nota kontrak sewa resmi."
      },
      {
        question: "Apakah ada biaya administrasi tambahan saat memesan?",
        answer: "Hunizen tidak membebankan biaya administrasi tambahan yang tersembunyi kepada penyewa. Biaya yang tertera pada rincian transaksi adalah harga riil sewa kamar ditambah biaya layanan platform standar yang transparan."
      }
    ]
  },
  {
    id: "billing",
    title: "Billing & Pembayaran",
    desc: "Informasi lengkap mengenai metode pembayaran online, konfirmasi pembayaran kontrak sewa, serta kebijakan invoice.",
    items: [
      {
        question: "Metode pembayaran apa saja yang tersedia?",
        answer: "Kami menyediakan berbagai metode pembayaran aman: E-Wallet (GoPay, DANA, OVO, ShopeePay, LinkAja, Flip), Virtual Account transfer bank resmi (BNI, Mandiri, BRI), serta pembayaran Cash on Delivery (COD) langsung ke pemilik kost untuk beberapa properti bertanda khusus."
      },
      {
        question: "Apakah saya bisa mendapatkan pengembalian dana (refund) jika batal memesan?",
        answer: "Kebijakan pembatalan dan pengembalian dana diatur sesuai syarat & ketentuan yang ditetapkan oleh masing-masing pemilik properti. Anda dapat membaca detail aturan pembatalan pada kontrak sewa sebelum memfinalisasi pembayaran."
      },
      {
        question: "Kapan saya akan menerima invoice sewa setelah membayar?",
        answer: "Invoice resmi dan rincian transaksi Anda akan diterbitkan otomatis oleh sistem dalam format digital setelah status pembayaran Anda berhasil diverifikasi. Dokumen ini dapat diunduh kapan saja melalui halaman sukses transaksi."
      },
      {
        question: "Apakah pembayaran sewa kost di Hunizen bisa dicicil bulanan?",
        answer: "Untuk saat ini pembayaran sewa dilakukan secara penuh di awal sesuai dengan paket durasi sewa yang Anda pilih (misalnya paket 1 bulan, 3 bulan, atau 6 bulan) guna memastikan pemesanan kamar Anda terkunci aman dari calon penyewa lainnya."
      }
    ]
  },
  {
    id: "security",
    title: "Keamanan & Kebijakan Kost",
    desc: "Panduan mengenai garansi kecocokan fasilitas saat check-in, aturan umum kos, serta hak penyewa.",
    items: [
      {
        question: "Bagaimana jika kondisi kamar saat check-in tidak sesuai dengan yang di aplikasi?",
        answer: "Kami menawarkan Garansi Kecocokan Kamar 24 Jam. Jika setelah Anda check-in ditemukan fasilitas utama kamar rusak atau tidak sesuai dengan deskripsi aplikasi, hubungi tim support kami dalam 24 jam untuk pengajuan klaim bantuan relokasi atau refund penuh."
      },
      {
        question: "Apakah tamu lawan jenis diperbolehkan menginap di kamar kost?",
        answer: "Aturan menginap diatur langsung oleh pengelola kost masing-masing. Untuk kost khusus Putra atau khusus Putri, tamu lawan jenis biasanya dilarang masuk ke area dalam kamar demi kenyamanan bersama, namun tetap diperbolehkan bertamu di ruang tamu bersama."
      },
      {
        question: "Apakah saya bisa melihat langsung (survei) kamar kost sebelum membayar?",
        answer: "Tentu saja. Anda dapat menghubungi tim support Hunizen atau menggunakan fitur koordinasi untuk mengajukan jadwal survei langsung ke lokasi kost sebelum memutuskan untuk memfinalisasi kontrak sewa di aplikasi."
      }
    ]
  }
];

export const FAQ_CTA_CONTENT = {
  title: "Masih memiliki pertanyaan?",
  desc: "Hubungi tim support Hunizen yang siap melayani Anda 24/7 untuk menjawab pertanyaan seputar properti, metode pembayaran, atau kendala check-in.",
  buttonPrimaryLabel: "Hubungi Support",
  buttonSecondaryLabel: "Cari Hunian"
};
