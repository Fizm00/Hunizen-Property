import { Play, Rocket } from "lucide-react";
import { motion } from "framer-motion";
import { CTA_VIDEO_CARDS } from "../../constants";
import { staggerContainer, itemScaleUp, scrollViewport, sectionTransition } from "../../lib/animations";

export default function CTA() {
  return (
    <section className="w-full bg-white py-16 px-6 md:px-12 flex flex-col items-center justify-center">

      {/* Contained Dark Floating Card */}
      <motion.div
        initial={{ y: 60, opacity: 0, filter: "blur(10px)" }}
        whileInView={{ y: 0, opacity: 1, filter: "blur(0px)" }}
        viewport={scrollViewport}
        transition={sectionTransition()}
        className="w-full max-w-7xl bg-[#09090B] rounded-[2.5rem] md:rounded-[4rem] px-6 md:px-16 py-20 md:py-24 flex flex-col items-center justify-center text-center relative overflow-hidden shadow-2xl border border-zinc-900"
      >
        {/* Subtle background glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-white/5 rounded-full blur-[100px] pointer-events-none" />

        {/* Top Pill Badge */}
        <div className="inline-block bg-[#18181B] border border-zinc-800 rounded-full px-4 py-1.5 mb-6 shadow-sm z-10">
          <span className="text-white text-xs font-semibold tracking-wide">Mulai Sekarang</span>
        </div>

        {/* Heading */}
        <h2 className="text-4xl md:text-6xl font-bold text-white tracking-tight leading-tight max-w-4xl mb-4 font-sans z-10">
          Perjalanan Hunianmu <br className="sm:hidden" />
          dimulai <span className="font-serif italic font-normal text-slate-100">sekarang juga</span>
        </h2>

        {/* Subtitle */}
        <p className="text-slate-400 text-sm md:text-base max-w-xl leading-relaxed mb-10 z-10">
          Jelajahi kost terverifikasi melalui tur video interaktif untuk memastikan kenyamanan dan kesesuaian ruangan sebelum Anda tinggal.
        </p>

        {/* CTA Button */}
        <a
          href="#cari"
          className="inline-flex items-center gap-2 bg-white text-[#09090B] font-bold px-8 py-3.5 rounded-full hover:bg-slate-200 transition-all duration-300 shadow-lg mb-20 text-sm z-10"
        >
          <Rocket className="w-4 h-4 fill-[#09090B]" />
          Cari Kost Sekarang
        </a>

        {/* Video Preview Cards */}
        <motion.div
          variants={staggerContainer(0.15)}
          initial="hidden"
          whileInView="visible"
          viewport={scrollViewport}
          className="w-full max-w-5xl grid grid-cols-1 md:grid-cols-3 gap-6 z-10"
        >
          {CTA_VIDEO_CARDS.map((card, idx) => (
            <motion.div
              variants={itemScaleUp()}
              key={idx}
              className="relative h-[400px] rounded-3xl overflow-hidden group shadow-xl border border-zinc-950 cursor-pointer"
            >
              <img
                src={card.img}
                alt={`Kost Preview ${idx + 1}`}
                className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-700 brightness-[0.8] group-hover:brightness-90"
              />

              {/* Play Button */}
              <div className="absolute inset-0 flex items-center justify-center z-10">
                <div className="w-14 h-14 rounded-full bg-white/95 backdrop-blur-sm flex items-center justify-center text-zinc-900 group-hover:bg-white group-hover:scale-110 shadow-lg transition-all duration-300">
                  <Play className="w-5 h-5 fill-zinc-900 ml-0.5" />
                </div>
              </div>

              {/* Handle Tag */}
              <div className="absolute bottom-5 left-5 z-20">
                <span className="text-white text-[10px] font-bold bg-black/45 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-white/10 tracking-wide">
                  {card.handle}
                </span>
              </div>
            </motion.div>
          ))}
        </motion.div>

      </motion.div>

    </section>
  );
}
