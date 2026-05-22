import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { CTA_CONTENT } from "../../constants/about";
import heroBgWaterfront from "../../assets/hero_bg_waterfront.png";
import { scrollViewport } from "../../lib/animations";

export default function AboutCtaBanner() {
  return (
    <section className="w-full bg-white py-16 px-6 md:px-12 flex justify-center">
      <motion.div 
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={scrollViewport}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="w-full max-w-7xl rounded-[2rem] md:rounded-[3rem] overflow-hidden relative shadow-xl bg-brand-green border border-brand-green-accent/40 flex flex-col md:flex-row justify-between items-center gap-8 px-8 md:px-16 py-14 md:py-16 text-white"
      >
        {/* Background image on the right half, blending with solid green */}
        <div className="absolute right-0 top-0 bottom-0 w-full md:w-1/2 h-full z-0 pointer-events-none overflow-hidden select-none bg-brand-green-accent">
          <img 
            src={heroBgWaterfront} 
            alt="Waterfront House Aksen" 
            className="w-full h-full object-cover opacity-60 mix-blend-overlay"
          />
          {/* Gradient to smooth-fade the image into the solid green color on the left */}
          <div className="absolute inset-0 bg-gradient-to-r from-brand-green via-brand-green/30 to-transparent" />
          {/* Gradient for mobile vertical layout blending */}
          <div className="absolute inset-0 bg-gradient-to-t from-brand-green via-transparent to-transparent md:hidden" />
        </div>

        {/* Text Content */}
        <div className="relative z-10 flex flex-col gap-2.5 text-center md:text-left max-w-2xl">
          <span className="text-emerald-400 font-black text-xs uppercase tracking-widest self-center md:self-start">
            Temukan Hunian
          </span>
          <h2 className="text-2xl sm:text-3xl font-black tracking-tight leading-tight">
            {CTA_CONTENT.title}
          </h2>
          <p className="text-slate-300 text-xs sm:text-sm font-light">
            {CTA_CONTENT.desc}
          </p>
        </div>

        {/* Button Action */}
        <Link
          to="/search"
          className="relative z-10 shrink-0 bg-white hover:bg-emerald-450 text-brand-green hover:text-white font-extrabold px-8 py-3.5 rounded-full shadow-md hover:shadow-emerald-500/10 transition-all duration-300 text-xs uppercase tracking-widest text-center"
        >
          {CTA_CONTENT.buttonLabel}
        </Link>
      </motion.div>
    </section>
  );
}
