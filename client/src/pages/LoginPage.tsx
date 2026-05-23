import { Link } from "react-router-dom";
import { ArrowLeft, Eye, EyeOff, Phone, Lock } from "lucide-react";
import { motion } from "framer-motion";
import { staggerContainer, itemFadeUp } from "../lib/animations";
import heroBg from "../assets/hero_bg_indoor_kost.png";
import { useLoginForm } from "../hooks/useLoginForm";

export default function LoginPage() {
  const { state, actions } = useLoginForm();
  const { phone, password, showPassword, isLoading, error } = state;
  const { setPhone, setPassword, setShowPassword, handleLogin, handleGoogleLogin } = actions;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 min-h-screen w-full bg-white font-sans text-slate-800 overflow-hidden">
      
      <div className="flex flex-col justify-center items-center px-6 py-12 sm:px-12 lg:px-20 relative w-full h-full bg-white">
        
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
 
        <motion.div
          variants={staggerContainer(0.05)}
          initial="hidden"
          animate="visible"
          className="w-full max-w-md flex flex-col gap-8"
        >
          
          <motion.div variants={itemFadeUp(15, 0.5)} className="text-center md:text-left">
            <h1 className="text-3xl font-black text-slate-800 tracking-tight">
              Login ke Hunizen
            </h1>
            <p className="text-sm text-slate-400 font-semibold mt-2">
              Selamat datang kembali! Silakan masuk ke akun Anda.
            </p>
          </motion.div>
 
          <motion.form onSubmit={handleLogin} variants={itemFadeUp(15, 0.5)} className="flex flex-col gap-4">
            {error && (
              <div className="p-3 bg-red-50 border border-red-100 rounded-2xl text-xs font-bold text-red-600">
                {error}
              </div>
            )}
 
            <div className="flex flex-col gap-2">
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
 
            <div className="flex flex-col gap-2">
              <div className="flex justify-between items-center">
                <label htmlFor="password" className="text-xs font-black text-slate-700 uppercase tracking-wider">
                  Password
                </label>
                <a
                  href="#lupa-password"
                  className="text-xs font-bold text-slate-450 hover:text-slate-800 transition-colors"
                >
                  Lupa Password?
                </a>
              </div>
              <div className="relative">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
                  <Lock className="w-4.5 h-4.5" />
                </div>
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Masukkan password"
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
 
            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-4 bg-brand-green hover:bg-brand-green-hover text-white text-sm font-bold rounded-full transition-all shadow-md active:scale-[0.98] cursor-pointer border-0 mt-2 flex items-center justify-center gap-2"
            >
              {isLoading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Memproses Masuk...
                </>
              ) : (
                "Login"
              )}
            </button>
          </motion.form>
 
          <motion.div variants={itemFadeUp(15, 0.5)} className="relative my-1">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-slate-100"></div>
            </div>
            <div className="relative flex justify-center text-xs font-bold uppercase tracking-widest">
              <span className="bg-white px-4 text-slate-400 text-[10px]">atau</span>
            </div>
          </motion.div>
 
          <motion.button
            variants={itemFadeUp(15, 0.5)}
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.99 }}
            type="button"
            className="w-full py-3.5 border border-slate-200 hover:border-slate-400 bg-white text-slate-700 hover:text-slate-900 text-xs font-black rounded-full transition-colors flex items-center justify-center gap-2.5 cursor-pointer shadow-sm"
            onClick={handleGoogleLogin}
            disabled={isLoading}
          >
            <svg className="w-4.5 h-4.5 shrink-0" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" fill="#FBBC05"/>
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
            </svg>
            Login menggunakan Google
          </motion.button>

          <motion.div variants={itemFadeUp(15, 0.5)} className="text-center mt-2">
            <p className="text-xs font-semibold text-slate-400">
              Belum punya akun Hunizen?{" "}
              <Link
                to="/register"
                className="text-brand-green font-bold hover:underline transition-all"
              >
                Daftar Sekarang
              </Link>
            </p>
          </motion.div>

        </motion.div>

      </div>

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
        <div className="absolute inset-0 bg-linear-to-tr from-black/20 via-transparent to-transparent pointer-events-none" />
      </motion.div>

    </div>
  );
}
