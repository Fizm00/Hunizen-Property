import { Search } from "lucide-react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import heroBg from "../../assets/hero_bg_indoor_kost.png";
import { SEARCH_FILTERS } from "../../constants";
import { ease } from "../../lib/animations";

export default function Hero() {
  const navigate = useNavigate();

  return (
    <section className="relative w-full h-screen overflow-hidden flex flex-col items-center justify-center bg-black">

      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <motion.img
          initial={{ scale: 1.15, opacity: 0 }}
          animate={{ scale: 1, opacity: 0.9 }}
          transition={{ duration: 2, ease: ease.expo }}
          src={heroBg}
          alt="Modern Kost Interior"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/55" />
      </div>

      {/* Main Content */}
      <div className="relative z-10 w-full max-w-5xl mx-auto px-6 flex flex-col items-center text-center mt-12 md:mt-16">

        {/* Headline */}
        <motion.h1
          initial={{ y: 40, opacity: 0, filter: "blur(10px)" }}
          animate={{ y: 0, opacity: 1, filter: "blur(0px)" }}
          transition={{ duration: 1.2, ease: ease.expo }}
          className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-[1.2] md:leading-[1.15] max-w-4xl tracking-tight"
        >
          Temukan Kost Impianmu<br className="hidden md:block" /> dengan Mudah dan Cepat!
        </motion.h1>

        {/* "CARI?" label */}
        <motion.div
          initial={{ y: 20, opacity: 0, filter: "blur(6px)" }}
          animate={{ y: 0, opacity: 1, filter: "blur(0px)" }}
          transition={{ duration: 1, delay: 0.3, ease: ease.expo }}
          className="w-full max-w-[1000px] mt-16 flex justify-start mb-3 px-2"
        >
          <span className="text-white text-2xl font-bold tracking-wide">CARI?</span>
        </motion.div>

        {/* Search Bar Widget */}
        <motion.div
          initial={{ y: 50, opacity: 0, filter: "blur(8px)" }}
          animate={{ y: 0, opacity: 1, filter: "blur(0px)" }}
          transition={{ duration: 1.2, delay: 0.4, ease: ease.expo }}
          onClick={() => navigate("/search")}
          className="w-full max-w-[1000px] bg-white rounded-4xl md:rounded-full p-2 flex flex-col md:flex-row items-center justify-between shadow-2xl overflow-hidden cursor-pointer"
        >
          <div className="flex w-full md:w-auto overflow-x-auto divide-x divide-slate-200">
            {SEARCH_FILTERS.map((filter) => (
              <div
                key={filter.label}
                className={`flex-1 ${filter.minWidth} flex flex-col items-start justify-center px-6 py-2 hover:bg-slate-50 transition-colors`}
              >
                <span className="text-[10px] font-bold text-slate-800">{filter.label}</span>
                <span className="text-xs font-medium text-slate-400 mt-0.5">{filter.placeholder}</span>
              </div>
            ))}

            {/* CTA Label filling the empty space after filters */}
            <div className="hidden md:flex flex-1 items-center justify-center px-6 py-2">
              <span className="text-sm font-semibold text-slate-400 whitespace-nowrap">Cari Kost Disini</span>
            </div>
          </div>

          {/* Search Button */}
          <div className="pl-2 pr-1 w-full md:w-auto mt-2 md:mt-0 flex items-center justify-end">
            <button
              onClick={(e) => {
                e.stopPropagation();
                navigate("/search");
              }}
              className="w-12 h-12 rounded-full bg-brand-green hover:bg-brand-green-hover flex items-center justify-center transition-colors shadow-md text-white shrink-0"
            >
              <Search className="w-5 h-5" strokeWidth={2.5} />
            </button>
          </div>

        </motion.div>

      </div>
    </section>
  );
}
