import { ChevronLeft, ChevronRight } from "lucide-react";
import { motion } from "framer-motion";
import { useProperties } from "../../hooks/useProperties";
import { PropertyVerticalCard } from "../ui/PropertyVerticalCard";
import type { KostCard } from "../../types";
import { staggerContainer, scrollViewport, sectionTransition } from "../../lib/animations";
import UnderlineText from "../ui/UnderlineText";

interface SectionHeaderProps {
  prefix: string;
  highlight: string;
}

function SectionHeader({ prefix, highlight }: SectionHeaderProps) {
  return (
    <motion.div
      initial={{ y: 30, opacity: 0, filter: "blur(6px)" }}
      whileInView={{ y: 0, opacity: 1, filter: "blur(0px)" }}
      viewport={scrollViewport}
      transition={sectionTransition()}
      className="flex items-end justify-between mb-8"
    >
      <h2 className="text-2xl md:text-4xl font-bold text-slate-800 tracking-tight">
        {prefix}{" "}
        <UnderlineText>{highlight}</UnderlineText>
      </h2>

      <div className="flex gap-2">
        {[ChevronLeft, ChevronRight].map((Icon, i) => (
          <button
            key={i}
            className="w-10 h-10 rounded-full border border-slate-200 hover:border-slate-800 flex items-center justify-center text-slate-500 hover:text-slate-800 transition-colors shadow-sm bg-white cursor-pointer"
          >
            <Icon className="w-5 h-5" />
          </button>
        ))}
      </div>
    </motion.div>
  );
}

interface PropertySectionProps {
  titlePrefix: string;
  titleHighlight: string;
  items: KostCard[];
  variant: "promo" | "recom";
}

function PropertySection({ titlePrefix, titleHighlight, items, variant }: PropertySectionProps) {
  return (
    <div className="w-full max-w-7xl mb-20">
      <SectionHeader prefix={titlePrefix} highlight={titleHighlight} />

      <motion.div
        variants={staggerContainer(0.06)}
        initial="hidden"
        whileInView="visible"
        viewport={scrollViewport}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        {items.map((kost, idx) => (
          <PropertyVerticalCard
            key={kost.title + idx}
            property={kost}
            variant={variant}
            index={idx}
          />
        ))}
      </motion.div>
    </div>
  );
}

export default function PropertyList() {
  const { promo, recommended, loading } = useProperties();

  if (loading) {
    return (
      <section className="w-full bg-white py-16 px-6 md:px-12 flex flex-col items-center">
        <div className="w-full max-w-7xl mb-20 animate-pulse">
          <div className="h-10 w-72 bg-slate-100 rounded-xl mb-8" />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map((n) => (
              <div key={n} className="h-[390px] bg-slate-50 border border-slate-100 rounded-3xl p-4 flex flex-col gap-4">
                <div className="h-60 w-full bg-slate-200 rounded-3xl" />
                <div className="h-4 w-24 bg-slate-200 rounded" />
                <div className="h-6 w-48 bg-slate-200 rounded" />
                <div className="h-4 w-32 bg-slate-200 rounded" />
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="w-full bg-white py-16 px-6 md:px-12 flex flex-col items-center">
      <PropertySection
        titlePrefix="Promo Kilat Kost di"
        titleHighlight="Semua Kota!"
        items={promo}
        variant="promo"
      />

      <div className="h-6" />

      <PropertySection
        titlePrefix="Rekomendasi Kost di"
        titleHighlight="Semua Kota!"
        items={recommended}
        variant="recom"
      />
    </section>
  );
}
