import { motion } from "framer-motion";
import { CONTACT_CTA } from "../../constants/contact";
import { scrollViewport } from "../../lib/animations";
import propStaggered2 from "../../assets/prop_staggered_2.png";
import propStaggered3 from "../../assets/prop_staggered_3.png";

const CTA_IMAGES = [
  { src: propStaggered2, alt: "Modern premium house bedroom" },
  { src: propStaggered3, alt: "Luxury minimal living room" },
];

export default function ContactCta() {
  return (
    <section className="w-full bg-white pb-20 px-4 sm:px-6 md:px-8 lg:px-10 flex justify-center">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={scrollViewport}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="w-full max-w-[1440px] bg-brand-green-light rounded-[32px] p-6 sm:p-8 md:p-10 lg:p-12 grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-12 items-center"
      >
        <div className="flex flex-col gap-5 items-start">
          <span className="inline-flex items-center bg-white text-slate-800 text-[11px] font-medium px-4 py-1.5 rounded-full tracking-wide uppercase shadow-xs">
            {CONTACT_CTA.tag}
          </span>

          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-[3.25rem] font-bold text-slate-900 tracking-tight leading-[1.05] max-w-md">
            {CONTACT_CTA.title}
            <br />
            <span className="italic font-serif font-normal text-slate-800">
              {CONTACT_CTA.titleItalic}
            </span>{" "}
            {CONTACT_CTA.titleEnd}
          </h2>

          <p className="text-slate-500 text-xs sm:text-sm font-light leading-relaxed max-w-sm">
            {CONTACT_CTA.desc}
          </p>
        </div>

        <div className="grid grid-cols-2 gap-4 h-[280px] sm:h-[350px] lg:h-[400px]">
          {CTA_IMAGES.map((img, idx) => (
            <div
              key={idx}
              className="h-full rounded-[24px] overflow-hidden select-none shadow-xs"
            >
              <img
                src={img.src}
                alt={img.alt}
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
              />
            </div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
