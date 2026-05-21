import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import bannerBg from "../assets/kost_banner.png";
import { FEATURE_CARDS } from "../constants";
import { staggerContainer, itemFadeUp, scrollViewport, sectionTransition } from "../lib/animations";
import UnderlineText from "./ui/UnderlineText";

export default function Features() {
  return (
    <section id="fasilitas" className="w-full bg-white py-20 px-6 md:px-12 flex flex-col items-center">
      <div className="w-full max-w-7xl">

        {/* Header Area */}
        <motion.div
          initial={{ y: 30, opacity: 0, filter: "blur(6px)" }}
          whileInView={{ y: 0, opacity: 1, filter: "blur(0px)" }}
          viewport={scrollViewport}
          transition={sectionTransition()}
          className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4"
        >
          <h2 className="text-3xl md:text-5xl font-bold text-slate-800 tracking-tight">
            Kami cariin Kost Terbaik{" "}
            <UnderlineText>Untukmu!</UnderlineText>
          </h2>
          <a href="#semua" className="flex items-center gap-2 text-sm font-semibold text-slate-500 hover:text-slate-800 transition-colors group">
            Lihat semua properti <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </a>
        </motion.div>

        {/* 3-Column Cards Grid */}
        <motion.div
          variants={staggerContainer(0.15)}
          initial="hidden"
          whileInView="visible"
          viewport={scrollViewport}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16"
        >
          {FEATURE_CARDS.map((card, idx) => (
            <motion.div
              variants={itemFadeUp()}
              key={idx}
              className="bg-white rounded-3xl shadow-[0_4px_20px_-10px_rgba(0,0,0,0.1)] border border-slate-100 overflow-hidden flex flex-col group hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
            >
              {/* Image with Badge */}
              <div className="relative h-56 sm:h-64 w-full overflow-hidden p-2">
                <img
                  src={card.img}
                  alt={card.title}
                  className="w-full h-full object-cover rounded-[1.5rem] group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute top-6 right-6 bg-black/40 backdrop-blur-md text-white text-[10px] font-semibold px-3 py-1.5 rounded-full z-10">
                  {card.badge}
                </div>
              </div>

              {/* Card Body */}
              <div className="p-6 pt-4 flex flex-col flex-grow">
                <h3 className="text-xl font-bold text-slate-800 mb-1">{card.title}</h3>
                <p className="text-xs text-slate-400 mb-6">{card.desc}</p>

                {/* Bottom Row */}
                <div className="flex items-center justify-between mt-auto pt-4">
                  <div className="flex items-center divide-x divide-slate-200">
                    {card.specs.map((spec, i) => (
                      <span key={i} className={`text-[10px] md:text-xs text-slate-400 font-medium ${i === 0 ? 'pr-3' : 'px-3'}`}>
                        {spec}
                      </span>
                    ))}
                  </div>
                  <button className="w-10 h-10 rounded-full border border-slate-200 flex items-center justify-center text-slate-400 group-hover:border-slate-800 group-hover:text-slate-800 transition-colors shrink-0">
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Bottom Banner */}
        <motion.div
          initial={{ y: 60, opacity: 0, filter: "blur(8px)" }}
          whileInView={{ y: 0, opacity: 1, filter: "blur(0px)" }}
          viewport={scrollViewport}
          transition={sectionTransition()}
          className="w-full bg-[#18181B] rounded-[2rem] md:rounded-[3rem] flex flex-col md:flex-row overflow-hidden shadow-2xl relative"
        >
          <div className="flex-1 p-10 md:p-16 lg:p-24 flex flex-col justify-center z-10">
            <h2 className="text-3xl md:text-5xl font-bold text-white leading-tight mb-4">
              Gabung<br />Bersama Kami!
            </h2>
            <p className="text-slate-400 text-sm md:text-base mb-10 max-w-sm">
              Daftarkan segera usaha kost anda dan rasakan kemudahan mengelola properti bersama jutaan pengguna kami.
            </p>
            <div>
              <a href="#daftar" className="inline-block bg-white text-[#18181B] font-bold px-8 py-3.5 rounded-full hover:bg-slate-200 transition-colors shadow-lg">
                Daftar Sekarang
              </a>
            </div>
          </div>

          <div className="flex-1 relative min-h-[300px] md:min-h-full hidden sm:block">
            <div className="absolute inset-0 bg-gradient-to-r from-[#18181B] via-transparent to-transparent z-10 hidden md:block" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#18181B] via-transparent to-transparent z-10 block md:hidden" />
            <img src={bannerBg} alt="Premium Kost Join Banner" className="w-full h-full object-cover" />
          </div>
        </motion.div>

      </div>
    </section>
  );
}
