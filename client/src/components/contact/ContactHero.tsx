import { motion } from "framer-motion";
import Navbar from "../layout/Navbar";
import { CONTACT_HERO } from "../../constants/contact";

export default function ContactHero() {
  return (
    <section className="relative w-full bg-white overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-20 bg-brand-green z-40">
        <Navbar />
      </div>

      <div className="w-full max-w-[1440px] mx-auto px-4 sm:px-6 md:px-8 lg:px-10 pt-36 pb-10 flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col gap-2.5"
        >
          <span className="inline-flex items-center bg-slate-100 text-slate-800 text-[11px] font-medium px-4 py-1.5 rounded-full self-start tracking-wide uppercase">
            {CONTACT_HERO.tag}
          </span>
          <h1 className="text-5xl sm:text-6xl md:text-[5.5rem] font-bold text-slate-900 tracking-tight leading-[1.02]">
            {CONTACT_HERO.title}
          </h1>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          className="text-slate-500 text-[13px] md:text-sm font-light leading-relaxed max-w-xs md:max-w-sm text-left md:self-end md:pb-2.5"
        >
          {CONTACT_HERO.desc}
        </motion.p>
      </div>
    </section>
  );
}
