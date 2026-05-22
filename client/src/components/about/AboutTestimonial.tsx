import { motion } from "framer-motion";
import aboutAnalyticsDesk from "../../assets/about_analytics_desk.png";
import { TESTIMONIAL_CONTENT } from "../../constants/about";
import { scrollViewport } from "../../lib/animations";

export default function AboutTestimonial() {
  return (
    <section className="w-full py-24 px-6 md:px-12 bg-white flex justify-center border-t border-slate-100">
      <div className="w-full max-w-7xl grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
        
        {/* Left Side Info */}
        <div className="lg:col-span-6 flex flex-col items-start gap-6">
          <h2 className="text-3xl sm:text-4xl font-black text-slate-800 tracking-tight leading-tight">
            {TESTIMONIAL_CONTENT.title}
          </h2>
          <p className="text-slate-500 text-sm leading-relaxed font-light">
            {TESTIMONIAL_CONTENT.desc}
          </p>
          
          {/* Signature mockup */}
          <div className="mt-4 flex flex-col gap-1.5">
            <span className="font-serif italic font-light text-2xl tracking-wide text-brand-green/80 select-none">
              {TESTIMONIAL_CONTENT.signature.name}
            </span>
            <div className="w-24 h-[1px] bg-slate-300" />
            <span className="text-xs font-extrabold text-slate-400 uppercase tracking-widest">
              {TESTIMONIAL_CONTENT.signature.role}
            </span>
          </div>

          <button
            type="button"
            className="mt-6 bg-brand-green hover:bg-brand-green-hover text-white font-extrabold px-8 py-3.5 rounded-full shadow-md hover:shadow-lg transition-all duration-300 text-xs uppercase tracking-widest cursor-pointer"
          >
            Baca Selengkapnya
          </button>
        </div>

        {/* Right Side: Image with Overlapping Quote */}
        <div className="lg:col-span-6 relative flex items-center justify-center">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={scrollViewport}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-full max-w-[500px] aspect-[4/3] rounded-[2rem] overflow-hidden shadow-2xl border border-slate-100 bg-slate-50"
          >
            <img 
              src={aboutAnalyticsDesk} 
              alt="Workspace and chairs design layout" 
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-slate-900/10 pointer-events-none" />
          </motion.div>

          {/* Overlapping Quote Box - Bold border, sharp shadow */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={scrollViewport}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="absolute -bottom-10 left-6 right-6 md:-left-8 md:right-auto md:w-[360px] bg-white border-2 border-slate-800 p-6 rounded-2xl shadow-[6px_6px_0_0_rgba(15,44,32,1)] flex flex-col gap-2.5"
          >
            <p className="text-slate-600 text-xs md:text-sm italic leading-relaxed font-semibold">
              "{TESTIMONIAL_CONTENT.quote.text}"
            </p>
            <div className="flex flex-col">
              <span className="text-[11px] font-black text-slate-800 uppercase tracking-widest">
                {TESTIMONIAL_CONTENT.quote.author}
              </span>
              <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider">
                {TESTIMONIAL_CONTENT.quote.role}
              </span>
            </div>
          </motion.div>
        </div>

      </div>
    </section>
  );
}
