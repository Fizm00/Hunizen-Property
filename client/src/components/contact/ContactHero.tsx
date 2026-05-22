import { motion } from "framer-motion";
import Navbar from "../layout/Navbar";
import { CONTACT_HERO } from "../../constants/contact";

export default function ContactHero() {
  return (
    <section className="relative w-full bg-white overflow-hidden">
      {/* Transparent Navbar on Top — dark bg strip behind it */}
      <div className="absolute top-0 left-0 w-full h-20 bg-brand-green z-40">
        <Navbar />
      </div>

      {/* Content — pushed down below the solid navbar strip */}
      <div className="w-full max-w-7xl mx-auto px-6 md:px-12 pt-32 pb-12 flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
        {/* Left: Tag + Heading */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col gap-3"
        >
          <span className="text-xs font-black text-slate-400 uppercase tracking-widest">
            {CONTACT_HERO.tag}
          </span>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-black text-slate-900 tracking-tight leading-[1.05]">
            {CONTACT_HERO.title}
          </h1>
        </motion.div>

        {/* Right: Description */}
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          className="text-slate-500 text-sm font-light leading-relaxed max-w-sm md:text-right"
        >
          {CONTACT_HERO.desc}
        </motion.p>
      </div>

      {/* Divider */}
      <div className="w-full max-w-7xl mx-auto px-6 md:px-12">
        <div className="border-t border-slate-100" />
      </div>
    </section>
  );
}
