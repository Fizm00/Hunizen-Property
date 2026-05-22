import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { WHY_CHOOSE_US_HEADER, WHY_CHOOSE_US_CARDS } from "../../constants/about";
import { scrollViewport } from "../../lib/animations";

export default function AboutWhyChooseUs() {
  return (
    <section className="w-full py-24 px-6 md:px-12 bg-slate-50 flex justify-center border-y border-slate-100">
      <div className="w-full max-w-7xl grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
        
        {/* Left Column */}
        <div className="lg:col-span-5 flex flex-col items-start gap-6">
          <span className="text-xs font-black text-brand-green uppercase tracking-widest">
            {WHY_CHOOSE_US_HEADER.tag}
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-slate-800 tracking-tight leading-tight">
            {WHY_CHOOSE_US_HEADER.title}
          </h2>
          <p className="text-slate-500 text-sm leading-relaxed font-light">
            {WHY_CHOOSE_US_HEADER.desc}
          </p>
          <Link
            to="/search"
            className="mt-2 bg-brand-green hover:bg-brand-green-hover text-white font-extrabold px-8 py-3.5 rounded-full shadow-md hover:shadow-lg transition-all duration-300 text-xs uppercase tracking-widest"
          >
            Cari Hunian
          </Link>
        </div>

        {/* Right Column: 2x2 Cards Grid */}
        <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-6 w-full">
          {WHY_CHOOSE_US_CARDS.map((card, idx) => {
            const IconComponent = card.Icon;
            return (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={scrollViewport}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
                className="bg-white p-7 rounded-[2rem] shadow-sm border border-slate-100/60 flex flex-col gap-4 hover:shadow-md transition-shadow"
              >
                <div className="w-12 h-12 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center border border-emerald-100/40">
                  <IconComponent className="w-5 h-5" />
                </div>
                <h3 className="text-base font-bold text-slate-800">{card.title}</h3>
                <p className="text-slate-500 text-xs leading-relaxed font-light">
                  {card.desc}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
