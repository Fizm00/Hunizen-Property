import { motion } from "framer-motion";
import { CONTACT_CTA } from "../../constants/contact";
import { scrollViewport } from "../../lib/animations";

/* Asset imports for the 2×2 grid photos */
import propStaggered1 from "../../assets/prop_staggered_1.png";
import propStaggered2 from "../../assets/prop_staggered_2.png";
import heroWaterfront from "../../assets/hero_bg_waterfront.png";
import kostBanner from "../../assets/kost_banner.png";

const CTA_IMAGES = [
  { src: heroWaterfront, alt: "Waterfront property view" },
  { src: propStaggered1, alt: "Modern kost interior" },
  { src: propStaggered2, alt: "Premium room design" },
  { src: kostBanner, alt: "Kost cozy bedroom" },
];

export default function ContactCta() {
  return (
    <section className="w-full bg-white py-14 md:py-20 px-6 md:px-12 flex justify-center">
      <div className="w-full max-w-7xl grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
        {/* ─── Left: Text Content ─── */}
        <motion.div
          initial={{ opacity: 0, y: 35 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={scrollViewport}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col gap-5"
        >
          {/* Tag pill */}
          <span className="self-start bg-slate-900 text-white text-[10px] font-extrabold uppercase tracking-widest px-4 py-1.5 rounded-full">
            {CONTACT_CTA.tag}
          </span>

          {/* Heading */}
          <h2 className="text-3xl sm:text-4xl md:text-[2.75rem] font-black text-slate-900 tracking-tight leading-[1.1]">
            {CONTACT_CTA.title}{" "}
            <em className="font-black not-italic text-brand-green">{CONTACT_CTA.titleItalic}</em>
            <br />
            {CONTACT_CTA.titleEnd}
          </h2>

          {/* Description */}
          <p className="text-slate-500 text-sm font-light leading-relaxed max-w-md">
            {CONTACT_CTA.desc}
          </p>
        </motion.div>

        {/* ─── Right: 2×2 Image Grid ─── */}
        <motion.div
          initial={{ opacity: 0, y: 35 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={scrollViewport}
          transition={{ duration: 0.8, delay: 0.12, ease: [0.16, 1, 0.3, 1] }}
          className="grid grid-cols-2 gap-3 sm:gap-4"
        >
          {CTA_IMAGES.map((img, idx) => (
            <div
              key={idx}
              className="aspect-[4/5] rounded-xl overflow-hidden select-none"
            >
              <img
                src={img.src}
                alt={img.alt}
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
              />
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
