import { Link } from "react-router-dom";
import { ArrowLeft, Eye, EyeOff, Phone, Lock, User, Mail } from "lucide-react";
import { motion } from "framer-motion";
import { staggerContainer, itemFadeUp } from "../lib/animations";
import heroBg from "../assets/hero_bg_indoor_kost.png";
import { useRegisterForm } from "../hooks/useRegisterForm";

export default function RegisterPage() {
  const { state, actions } = useRegisterForm();
  const {
    name,
    phone,
    email,
    password,
    confirmPassword,
    showPassword,
    showConfirmPassword,
    isLoading,
    error,
  } = state;
  const {
    setName,
    setPhone,
    setEmail,
    setPassword,
    setConfirmPassword,
    setShowPassword,
    setShowConfirmPassword,
    handleRegister,
  } = actions;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 min-h-screen w-full bg-white font-sans text-slate-800 overflow-hidden">
      
      {/* Left Pane: Register Form */}
      <div className="flex flex-col justify-center items-center px-6 py-12 sm:px-12 lg:px-20 relative w-full h-full bg-white overflow-y-auto">
        
        {/* Back Button */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="absolute top-6 left-6 sm:top-8 sm:left-8"
        >
          <Link
            to="/"
            className="flex items-center justify-center w-10 h-10 border border-slate-200 rounded-full text-slate-500 hover:text-brand-green hover:border-brand-green transition-all cursor-pointer bg-white shadow-sm"
            aria-label="Kembali ke Beranda"
          >
            <ArrowLeft className="w-5 h-5" />
          </Link>
        </motion.div>

        {/* Form Container */}
        <motion.div
          variants={staggerContainer(0.05)}
          initial="hidden"
          animate="visible"
          className="w-full max-w-md flex flex-col gap-6 my-8"
        >
          
          {/* Header */}
          <motion.div variants={itemFadeUp(15, 0.5)} className="text-center md:text-left">
            <h1 className="text-3xl font-black text-slate-800 tracking-tight">
              Registrasi ke Hunizen
            </h1>
            <p className="text-sm text-slate-400 font-semibold mt-2">
              Daftarkan diri Anda untuk mulai menyewa hunian impian.
            </p>
          </motion.div>

          {/* Form */}
          <motion.form onSubmit={handleRegister} variants={itemFadeUp(15, 0.5)} className="flex flex-col gap-4">
            {error && (
              <div className="p-3 bg-red-50 border border-red-100 rounded-2xl text-xs font-bold text-red-600">
                {error}
              </div>
            )}

            {/* Full Name Input */}
            <div className="flex flex-col gap-1.5">
              <label htmlFor="name" className="text-xs font-black text-slate-700 uppercase tracking-wider">
                Nama Lengkap
              </label>
              <div className="relative">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
                  <User className="w-4.5 h-4.5" />
                </div>
                <input
                  id="name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Masukkan nama lengkap Anda"
                  className="w-full pl-12 pr-4 py-3.5 border border-slate-200 rounded-2xl bg-slate-50/30 text-sm text-slate-700 focus:outline-none focus:border-brand-green focus:bg-white transition-all font-semibold"
                  disabled={isLoading}
                />
              </div>
            </div>

            {/* Phone Number Input */}
            <div className="flex flex-col gap-1.5">
              <label htmlFor="phone" className="text-xs font-black text-slate-700 uppercase tracking-wider">
                Nomor Handphone
              </label>
              <div className="relative">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
                  <Phone className="w-4.5 h-4.5" />
                </div>
                <input
                  id="phone"
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="Contoh: 081234567890"
                  className="w-full pl-12 pr-4 py-3.5 border border-slate-200 rounded-2xl bg-slate-50/30 text-sm text-slate-700 focus:outline-none focus:border-brand-green focus:bg-white transition-all font-semibold"
                  disabled={isLoading}
                />
              </div>
            </div>

            {/* Email Input */}
            <div className="flex flex-col gap-1.5">
              <label htmlFor="email" className="text-xs font-black text-slate-700 uppercase tracking-wider">
                Alamat Email
              </label>
              <div className="relative">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
                  <Mail className="w-4.5 h-4.5" />
                </div>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Contoh: user@email.com"
                  className="w-full pl-12 pr-4 py-3.5 border border-slate-200 rounded-2xl bg-slate-50/30 text-sm text-slate-700 focus:outline-none focus:border-brand-green focus:bg-white transition-all font-semibold"
                  disabled={isLoading}
                />
              </div>
            </div>

            {/* Password Input */}
            <div className="flex flex-col gap-1.5">
              <label htmlFor="password" className="text-xs font-black text-slate-700 uppercase tracking-wider">
                Password
              </label>
              <div className="relative">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
                  <Lock className="w-4.5 h-4.5" />
                </div>
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Buat password minimal 6 karakter"
                  className="w-full pl-12 pr-12 py-3.5 border border-slate-200 rounded-2xl bg-slate-50/30 text-sm text-slate-700 focus:outline-none focus:border-brand-green focus:bg-white transition-all font-semibold"
                  disabled={isLoading}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-750 transition-colors cursor-pointer"
                  disabled={isLoading}
                >
                  {showPassword ? <EyeOff className="w-4.5 h-4.5" /> : <Eye className="w-4.5 h-4.5" />}
                </button>
              </div>
            </div>

            {/* Confirm Password Input */}
            <div className="flex flex-col gap-1.5">
              <label htmlFor="confirmPassword" className="text-xs font-black text-slate-700 uppercase tracking-wider">
                Ulangi Password
              </label>
              <div className="relative">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
                  <Lock className="w-4.5 h-4.5" />
                </div>
                <input
                  id="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Masukkan ulang password Anda"
                  className="w-full pl-12 pr-12 py-3.5 border border-slate-200 rounded-2xl bg-slate-50/30 text-sm text-slate-700 focus:outline-none focus:border-brand-green focus:bg-white transition-all font-semibold"
                  disabled={isLoading}
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-750 transition-colors cursor-pointer"
                  disabled={isLoading}
                >
                  {showConfirmPassword ? <EyeOff className="w-4.5 h-4.5" /> : <Eye className="w-4.5 h-4.5" />}
                </button>
              </div>
            </div>

            {/* Register Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-4 bg-brand-green hover:bg-brand-green-hover text-white text-sm font-bold rounded-full transition-all shadow-md active:scale-[0.98] cursor-pointer border-0 mt-3 flex items-center justify-center gap-2"
            >
              {isLoading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Mendaftarkan Akun...
                </>
              ) : (
                "Daftar"
              )}
            </button>
          </motion.form>

          {/* Login Prompt */}
          <motion.div variants={itemFadeUp(15, 0.5)} className="text-center mt-2 flex flex-col gap-3">
            <p className="text-xs font-semibold text-slate-400">
              Sudah punya akun Hunizen?{" "}
              <Link
                to="/login"
                className="text-brand-green font-bold hover:underline transition-all"
              >
                Masuk Sekarang
              </Link>
            </p>
            <p className="text-[10px] font-semibold text-slate-450 mt-1">
              Dengan mendaftar saya menyetujui{" "}
              <a href="#kebijakan-privasi" className="text-brand-green/80 hover:underline">
                Kebijakan Privasi
              </a>
            </p>
          </motion.div>

        </motion.div>

      </div>

      {/* Right Pane: Split Image (Visible on Large Screens Only) */}
      <motion.div
        initial={{ opacity: 0, x: 40 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
        className="hidden lg:block relative w-full h-full bg-slate-100 overflow-hidden"
      >
        <motion.img
          initial={{ scale: 1.08 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.8, ease: [0.16, 1, 0.3, 1] }}
          src={heroBg}
          alt="Hunizen Premium Bedroom"
          className="absolute inset-0 w-full h-full object-cover select-none pointer-events-none"
        />
        {/* Subtle top-left gradient overlay for soft shadows */}
        <div className="absolute inset-0 bg-linear-to-tr from-black/20 via-transparent to-transparent pointer-events-none" />
      </motion.div>

    </div>
  );
}
