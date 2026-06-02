import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Home, Search, HelpCircle, ArrowLeft } from "lucide-react";
import { ease } from "../lib/animations";

export default function NotFoundPage() {
  return (
    <div className="min-h-screen bg-zinc-950 flex flex-col justify-between font-sans text-zinc-300 relative overflow-hidden">
      
      {/* Decorative background glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-brand-green/20 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 left-1/3 w-[300px] h-[300px] bg-brand-green-accent/15 rounded-full blur-[100px] pointer-events-none" />
      
      {/* Subtle grid pattern overlay */}
      <div className="absolute inset-0 opacity-[0.03] bg-[radial-gradient(#fff_1px,transparent_1px)] bg-size-[24px_24px] pointer-events-none" />

      {/* Header / Logo */}
      <header className="w-full max-w-7xl mx-auto px-6 py-8 flex justify-between items-center relative z-10">
        <Link to="/" className="flex items-center gap-2 group">
          <div className="text-white bg-brand-green p-2 rounded-xl group-hover:scale-105 transition-transform duration-300">
            <Home className="w-5 h-5" strokeWidth={2.5} />
          </div>
          <span className="font-extrabold text-lg tracking-tight text-white">
            Hunizen
          </span>
        </Link>
        <Link 
          to="/" 
          className="flex items-center gap-1.5 text-xs font-semibold text-zinc-400 hover:text-white transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Kembali</span>
        </Link>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex flex-col items-center justify-center px-6 relative z-10 py-12">
        <div className="text-center max-w-lg flex flex-col items-center gap-6">
          
          {/* Animated 404 badge */}
          <motion.div 
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.8, ease: ease.expo }}
            className="relative"
          >
            <h1 className="text-8xl md:text-9xl font-black text-transparent bg-clip-text bg-linear-to-b from-white to-zinc-700 tracking-tighter leading-none select-none">
              404
            </h1>
            <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 px-3 py-1 bg-brand-green border border-brand-green-accent text-[10px] font-black tracking-widest text-emerald-400 uppercase rounded-full shadow-lg">
              PAGE NOT FOUND
            </div>
          </motion.div>

          {/* Description */}
          <motion.div 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2, ease: ease.expo }}
            className="flex flex-col gap-2.5 mt-4"
          >
            <h2 className="text-xl md:text-2xl font-bold text-white tracking-tight">
              Halaman Tidak Ditemukan
            </h2>
            <p className="text-xs md:text-sm text-zinc-400 leading-relaxed font-light">
              Maaf, halaman yang Anda tuju tidak dapat kami temukan. Mungkin alamat URL salah diketik, atau halaman telah dipindahkan ke lokasi lain.
            </p>
          </motion.div>

          {/* Action Buttons */}
          <motion.div 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.3, ease: ease.expo }}
            className="flex flex-col sm:flex-row gap-3 w-full mt-4 justify-center"
          >
            <Link
              to="/"
              className="bg-brand-green hover:bg-brand-green-hover text-white text-xs font-bold py-3.5 px-6 rounded-xl flex items-center justify-center gap-2 shadow-lg transition-colors cursor-pointer border border-brand-green-accent/50"
            >
              <Home className="w-4 h-4" />
              <span>Kembali ke Beranda</span>
            </Link>
            
            <Link
              to="/search"
              className="bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-white text-xs font-bold py-3.5 px-6 rounded-xl flex items-center justify-center gap-2 shadow-md transition-colors cursor-pointer"
            >
              <Search className="w-4 h-4" />
              <span>Cari Kost Sekarang</span>
            </Link>
          </motion.div>

          {/* Help hint */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="mt-8 flex items-center gap-2 text-xs text-zinc-500 font-medium"
          >
            <HelpCircle className="w-4 h-4 text-zinc-600" />
            <span>Butuh bantuan? Kunjungi halaman <Link to="/faq" className="text-brand-green-vibrant hover:underline">FAQ</Link> atau <Link to="/contact" className="text-brand-green-vibrant hover:underline">Kontak Kami</Link>.</span>
          </motion.div>

        </div>
      </main>

      {/* Footer copyright */}
      <footer className="w-full text-center py-6 text-[10px] text-zinc-600 font-medium relative z-10">
        © HUNIZEN 2026. All rights reserved.
      </footer>

    </div>
  );
}
