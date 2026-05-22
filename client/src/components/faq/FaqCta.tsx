import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { MessageSquare } from "lucide-react";
import { FAQ_CTA_CONTENT } from "../../constants/faq";
import heroBgWaterfront from "../../assets/hero_bg_waterfront.png";
import { scrollViewport } from "../../lib/animations";

export default function FaqCta() {
  return (
    <section className="w-full bg-white py-16 px-6 md:px-12 flex justify-center">
      <motion.div 
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={scrollViewport}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="w-full max-w-7xl rounded-[2rem] md:rounded-[3rem] overflow-hidden relative shadow-xl bg-zinc-950 border border-zinc-800/85 flex flex-col items-center justify-center text-center px-8 md:px-16 py-16 md:py-24 text-white"
      >
        {/* Background Image with Dark Overlay (Aksen Gelap) */}
        <div className="absolute inset-0 z-0 select-none pointer-events-none">
          <img 
            src={heroBgWaterfront} 
            alt="CTA background" 
            className="w-full h-full object-cover opacity-60 filter brightness-[0.85] contrast-[1.02]"
          />
          <div className="absolute inset-0 bg-black/60 backdrop-blur-[1px]" />
        </div>

        {/* Decorative blur glows */}
        <div className="absolute -bottom-24 -left-24 w-80 h-80 bg-zinc-800/10 rounded-full blur-[80px] pointer-events-none" />

        {/* Content Container */}
        <div className="relative z-10 flex flex-col items-center gap-5 max-w-2xl">
          <span className="text-zinc-400 font-black text-xs uppercase tracking-widest">
            Hubungi Kami
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-black tracking-tight leading-tight uppercase">
            {FAQ_CTA_CONTENT.title}
          </h2>
          <p className="text-slate-300 text-xs sm:text-sm font-light leading-relaxed max-w-xl">
            {FAQ_CTA_CONTENT.desc}
          </p>
          
          {/* Action Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-4 mt-3">
            <a
              href="https://wa.me/628123456789"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white hover:bg-zinc-200 text-zinc-950 font-extrabold px-8 py-3.5 rounded-full shadow-md transition-all duration-300 text-xs uppercase tracking-widest flex items-center gap-2"
            >
              <MessageSquare className="w-4 h-4 shrink-0" />
              {FAQ_CTA_CONTENT.buttonPrimaryLabel}
            </a>
            
            <Link
              to="/search"
              className="bg-zinc-900/80 border border-zinc-800 hover:border-zinc-650 hover:bg-zinc-800 text-white font-extrabold px-8 py-3.5 rounded-full transition-all duration-300 text-xs uppercase tracking-widest"
            >
              {FAQ_CTA_CONTENT.buttonSecondaryLabel}
            </Link>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
