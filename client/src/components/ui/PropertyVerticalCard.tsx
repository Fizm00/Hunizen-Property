import { motion } from "framer-motion";
import { Bed, Bath, Wind, Wifi, Zap } from "lucide-react";
import { Link } from "react-router-dom";
import type { KostCard, KostSpecs } from "../../types";
import { itemFadeUp } from "../../lib/animations";

interface KostBadgeProps {
  variant: "promo" | "recom";
}

function KostBadge({ variant }: KostBadgeProps) {
  const colorClass = variant === "promo" ? "text-amber-500" : "text-brand-green";
  const fillClass = variant === "promo" ? "fill-amber-500 stroke-amber-500" : "fill-brand-green stroke-brand-green";
  
  return (
    <div className={`absolute top-4 right-4 bg-white/95 backdrop-blur-md p-2.5 rounded-2xl shadow-md z-10 ${colorClass}`}>
      <Zap className={`w-4 h-4 ${fillClass}`} />
    </div>
  );
}

interface SpecsRowProps {
  specs: KostSpecs;
}

function SpecsRow({ specs }: SpecsRowProps) {
  const specItems = [
    { Icon: Bed, value: specs.bed, label: "Bed" },
    { Icon: Bath, value: specs.bath, label: "Bath" },
    { Icon: Wind, value: specs.ac, label: "AC" },
    { Icon: Wifi, value: specs.wifi, label: "WiFi" },
  ];

  return (
    <div className="flex items-center gap-5 text-slate-500">
      {specItems.map(({ Icon, value, label }) => (
        <div key={label} className="flex items-center gap-1.5 text-xs font-semibold">
          <Icon className="w-4 h-4 text-slate-400" />
          <span>{value}</span>
        </div>
      ))}
    </div>
  );
}

interface PropertyVerticalCardProps {
  property: KostCard;
  variant: "promo" | "recom";
  index?: number;
}

export function PropertyVerticalCard({ property, variant }: PropertyVerticalCardProps) {
  return (
    <motion.div
      variants={itemFadeUp(20, 0.55)}
      whileHover={{ y: -6, boxShadow: "0 12px 30px -10px rgba(0, 0, 0, 0.08), 0 8px 15px -8px rgba(0, 0, 0, 0.08)" }}
      transition={{ type: "tween", duration: 0.3, ease: "easeOut" }}
      className="bg-white rounded-3xl overflow-hidden flex flex-col group border border-slate-100/60 p-2 cursor-pointer"
    >
      <Link to={`/property/${property.id}`} className="flex flex-col h-full w-full">
        <div className="relative h-60 w-full overflow-hidden rounded-3xl bg-slate-100">
          <img
            src={property.img}
            alt={property.title}
            className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-700"
            loading="lazy"
          />
          <KostBadge variant={variant} />
        </div>

        <div className="p-5 flex flex-col grow">
          <span className="text-sm font-semibold text-slate-400 mb-1">
            {property.price}
          </span>
          <h3 className="text-lg font-bold text-slate-800 leading-tight mb-1 group-hover:text-brand-green-accent transition-colors line-clamp-1">
            {property.title}
          </h3>
          <p className="text-xs text-slate-400 mb-4 line-clamp-1">
            {property.location}
          </p>
          
          <div className="w-full h-px bg-slate-100 mb-4" />
          
          <SpecsRow specs={property.specs} />
        </div>
      </Link>
    </motion.div>
  );
}

