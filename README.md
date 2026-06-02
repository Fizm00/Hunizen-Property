# Hunizen - Website Pencarian dan Pemesanan Properti Kost

Hunizen adalah platform digital pencarian dan pemesanan properti kost serta kontrakan secara modern. Aplikasi ini dirancang dengan antarmuka pengguna premium menggunakan palet warna hijau hutan gelap (Dark Green) dan hitam-putih, serta dilengkapi sistem backend berbasis REST API dengan tingkat keamanan dan keandalan yang tinggi.

## Struktur Proyek

Proyek ini menggunakan arsitektur monorepo sederhana yang memisahkan area presentasi dan logika bisnis:
*   **client/**: Berisi aplikasi frontend Single Page Application (SPA) berbasis React, Vite, dan Tailwind CSS.
*   **server/**: Berisi aplikasi backend REST API berbasis Node.js, Express, Mongoose, dan TypeScript.

---

## Fitur Utama

### 1. Frontend (Client)
*   **Pencarian Properti Interaktif**: Pencarian kost berdasarkan kata kunci, kota, jenis kost (Putra/Putri/Campur), dan rentang harga dengan peta interaktif Leaflet.
*   **Alur Pemesanan Multi-Step**: Formulir data penyewa dengan penguncian gender otomatis berdasarkan jenis kost, pemilihan metode pembayaran (E-Wallet, Transfer Bank, Cash), dan bukti nota pembayaran dinamis.
*   **Dashboard Profil Lengkap**: 
    *   Biodata diri dengan sinkronisasi Navbar reaktif.
    *   Informasi aktif sewa kost ("Kos Saya") lengkap dengan spesifikasi kamar, timeline kontrak, dan pusat pengaduan masalah kamar.
    *   Daftar riwayat sewa, log transaksi, tagihan pembayaran bulanan, dan ulasan/rating.
*   **Halaman Informasional Bespoke**: Desain unik, asimetris, dan premium untuk halaman "Tentang Kami" (About), "Pusat Bantuan" (FAQ), dan halaman penanganan kesalahan (404 Not Found).

### 2. Backend (Server)
*   **Otentikasi & Keamanan JWT**: Sistem registrasi, masuk, dan update profil dengan kata sandi yang dienkripsi menggunakan bcrypt dan dilindungi token JSON Web Token (JWT).
*   **Validasi Masukan Ketat**: Menggunakan Zod untuk memvalidasi seluruh request body guna memastikan integritas data dan tipe data yang aman (type-safe).
*   **Pengolahan Gambar Cloud**: Integrasi dengan Cloudinary untuk upload multi-gambar galeri properti melalui middleware Multer.
*   **Sistem Tiket Laporan Keluhan**: Alur penanganan komplain masalah kamar dari penyewa ke pemilik kost.
*   **Sistem Keamanan Berlapis**: Dilengkapi perlindungan header menggunakan Helmet, batasan asal permintaan menggunakan CORS, logging dengan Morgan, dan limitasi tingkat akses IP menggunakan Express Rate Limit.
*   **Utilitas Data Seeding**: Skrip otomatis untuk mengisi database dengan data awal untuk memudahkan pengujian.

---

## Teknologi yang Digunakan

### Frontend
*   React 18
*   Vite
*   TypeScript
*   Tailwind CSS v4 (Aksen warna Dark Green kustom)
*   Framer Motion (Animasi transisi mikro)
*   React Router DOM (Navigasi SPA)
*   SweetAlert2 (Pop-up notifikasi modern)
*   Leaflet & React Leaflet (Peta koordinat kost)

### Backend
*   Node.js
*   Express 5
*   TypeScript
*   MongoDB & Mongoose
*   Zod (Validasi payload)
*   jsonwebtoken (JWT)
*   bcryptjs (Enkripsi kata sandi)
*   Multer & Cloudinary SDK
*   Helmet, CORS, Morgan, & Express Rate Limit

---

## Panduan Instalasi dan Menjalankan Proyek

### Prasyarat
Pastikan Anda sudah menginstal Node.js (versi 18 ke atas) dan memiliki akses ke MongoDB (lokal atau cloud Atlas).

### 1. Setup Backend (Server)
1.  Masuk ke direktori server:
    ```bash
    cd server
    ```
2.  Pasang semua dependensi:
    ```bash
    npm install
    ```
3.  Salin berkas contoh `.env.example` menjadi `.env`:
    ```bash
    cp .env.example .env
    ```
    *Sesuaikan nilai MONGODB_URI, CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET, dan JWT_SECRET di dalam berkas .env Anda.*
4.  Jalankan skrip seeding untuk mengisi database dengan data awal:
    ```bash
    npm run seed
    ```
5.  Jalankan server dalam mode development:
    ```bash
    npm run dev
    ```
    *Server akan berjalan di http://localhost:5000.*

### 2. Setup Frontend (Client)
1.  Buka terminal baru dan masuk ke direktori client:
    ```bash
    cd client
    ```
2.  Pasang semua dependensi:
    ```bash
    npm install
    ```
3.  Jalankan aplikasi frontend:
    ```bash
    npm run dev
    ```
    *Aplikasi akan berjalan di http://localhost:5173.*

---

## Panduan Pengujian API dengan Postman

Kami telah menyediakan koleksi API lengkap untuk memudahkan Anda menguji semua rute di Postman:
1.  Impor berkas `server/hunizen_api_collection.json` ke dalam aplikasi Postman Anda.
2.  Gunakan request **Login** di dalam folder **Auth** untuk masuk dengan kredensial data awal (Tenant: `081234567890`, Landlord: `087766554433`, Sandi: `password123`).
3.  Setelah request Login dikirim, script uji Postman akan otomatis menangkap token JWT dan menyimpannya ke variabel koleksi `jwt_token`.
4.  Semua request privat dalam folder lain akan langsung menggunakan variabel token tersebut untuk otentikasi Bearer secara dinamis.
