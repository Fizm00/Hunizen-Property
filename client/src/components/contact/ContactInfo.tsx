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
    <section className="w-full bg-white py-12 px-4 sm:px-6 md:px-8 lg:px-10 flex justify-center">
      <div className="w-full max-w-[1440px]">
        {/* Clean cards grid without divider lines */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={scrollViewport}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="grid grid-cols-1 sm:grid-cols-3 gap-12 sm:gap-6"
        >
          {CONTACT_INFO_CARDS.map((card) => {
            const Icon = ICON_MAP[card.id];
            return (
              <div key={card.id} className="flex flex-col items-center text-center gap-3">
                {/* Circle Icon Container - light brand-green background */}
                <div className="w-12 h-12 rounded-full bg-brand-green-light flex items-center justify-center text-slate-800 shadow-xs">
                  <Icon className="w-5 h-5" strokeWidth={1.8} />
                </div>

                {/* Title */}
                <h3 className="text-[15px] font-bold text-slate-900 tracking-tight mt-1">
                  {card.title}
                </h3>

                {/* Lines */}
                <div className="flex flex-col gap-0.5">
                  {card.lines.map((line) => (
                    <span key={line} className="text-xs md:text-sm text-slate-500 font-light">
                      {line}
                    </span>
                  ))}
                </div>
              </div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
