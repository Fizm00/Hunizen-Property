import { motion } from "framer-motion";
import { Phone, Clock, Mail } from "lucide-react";
import { CONTACT_INFO_CARDS } from "../../constants/contact";
import { scrollViewport } from "../../lib/animations";

const ICON_MAP: Record<string, typeof Phone> = {
  phone: Phone,
  hours: Clock,
  email: Mail,
};

export default function ContactInfo() {
  return (
    <section className="w-full bg-white py-16 px-6 md:px-12 flex justify-center">
      <div className="w-full max-w-7xl">
        {/* Top divider */}
        <div className="border-t border-slate-100 mb-14" />

        {/* Cards grid */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={scrollViewport}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="grid grid-cols-1 sm:grid-cols-3 gap-10 sm:gap-6"
        >
          {CONTACT_INFO_CARDS.map((card) => {
            const Icon = ICON_MAP[card.id];
            return (
              <div key={card.id} className="flex flex-col items-center text-center gap-4">
                {/* Icon circle */}
                <div className="w-14 h-14 rounded-full border-2 border-slate-200 flex items-center justify-center text-slate-700">
                  <Icon className="w-6 h-6" strokeWidth={1.8} />
                </div>

                {/* Title */}
                <h3 className="text-base font-extrabold text-slate-900 tracking-tight">
                  {card.title}
                </h3>

                {/* Lines */}
                <div className="flex flex-col gap-0.5">
                  {card.lines.map((line) => (
                    <span key={line} className="text-sm text-slate-500 font-medium">
                      {line}
                    </span>
                  ))}
                </div>
              </div>
            );
          })}
        </motion.div>

        {/* Bottom divider */}
        <div className="border-t border-slate-100 mt-14" />
      </div>
    </section>
  );
}
