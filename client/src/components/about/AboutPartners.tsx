import { motion } from "framer-motion";
import { PARTNER_LOGOS } from "../../constants/about";

export default function AboutPartners() {
  return (
    <section className="w-full py-16 bg-white flex justify-center">
      <div className="w-full max-w-7xl px-6 md:px-12 flex flex-wrap justify-around items-center gap-10 md:gap-6 opacity-60">
        {PARTNER_LOGOS.map((partner, idx) => {
          const IconComponent = partner.Icon;
          return (
            <motion.div 
              key={idx}
              whileHover={{ scale: 1.05, opacity: 1 }}
              className="flex items-center gap-2 cursor-pointer transition-all duration-300 group"
            >
              <IconComponent className="w-6 h-6 text-slate-400 group-hover:text-brand-green transition-colors" />
              <span className="text-sm font-black tracking-widest uppercase text-slate-600 group-hover:text-slate-800 transition-colors">
                {partner.label}
              </span>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
