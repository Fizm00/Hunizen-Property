import { Star, MapPin, Bed, Bath, Wind, Wifi, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";
import type { SearchKostCard } from "../../types";

interface PropertyHorizontalCardProps {
  property: SearchKostCard;
  isHovered: boolean;
  isSelected: boolean;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
  onClick: () => void;
}

export function PropertyHorizontalCard({
  property,
  isHovered,
  isSelected,
  onMouseEnter,
  onMouseLeave,
  onClick,
}: PropertyHorizontalCardProps) {
  return (
    <div
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      onClick={onClick}
      className={`flex flex-col sm:flex-row gap-4 p-3 w-full bg-white border rounded-3xl transition-all duration-300 cursor-pointer group ${
        isHovered || isSelected
          ? "border-brand-green bg-slate-50/50 shadow-md shadow-slate-100/50"
          : "border-slate-200/60 hover:border-slate-300 hover:bg-slate-50/30 hover:shadow-sm"
      }`}
    >
      <div className="relative w-full sm:w-44 h-40 shrink-0 overflow-hidden rounded-[1.25rem]">
        <img
          src={property.img}
          alt={property.title}
          className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-700"
        />
        
        <span className={`absolute top-3 left-3 px-3 py-1 rounded-full text-[10px] font-bold tracking-wide backdrop-blur-md shadow-sm text-white ${
          property.type === "Campur"
            ? "bg-amber-600/90"
            : property.type === "Putra"
            ? "bg-blue-600/90"
            : "bg-rose-600/90"
        }`}>
          {property.type}
        </span>
      </div>

      <div className="flex-1 flex flex-col justify-between py-1">
        <div>
          <div className="flex justify-between items-center gap-2 w-full">
            <span className="flex items-center gap-0.5 px-2 py-0.5 text-[10px] font-bold text-amber-600 bg-amber-500/10 rounded-md">
              <Star className="w-3 h-3 fill-amber-500 stroke-amber-500" />
              {property.rating.toFixed(1)}
            </span>
            
            <span className="px-2 py-0.5 text-[10px] font-semibold text-emerald-600 bg-emerald-500/10 rounded-md">
              Sisa {property.roomLeft} Kamar
            </span>
          </div>

          <h3 className="mt-2 font-bold text-base text-slate-800 group-hover:text-brand-green transition-colors line-clamp-1">
            {property.title}
          </h3>
          <p className="flex items-center gap-1 mt-1 text-xs text-slate-500">
            <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
            <span className="line-clamp-1">{property.location}</span>
          </p>

          <div className="flex items-center gap-3 mt-3.5 text-slate-500">
            <div className="flex items-center gap-1 text-[11px] font-medium">
              <Bed className="w-3.5 h-3.5 text-slate-400" />
              <span>{property.specs.bed} Bed</span>
            </div>
            <div className="flex items-center gap-1 text-[11px] font-medium">
              <Bath className="w-3.5 h-3.5 text-slate-400" />
              <span>{property.specs.bath} KM</span>
            </div>
            {property.specs.ac > 0 && (
              <div className="flex items-center gap-1 text-[11px] font-medium">
                <Wind className="w-3.5 h-3.5 text-slate-400" />
                <span>AC</span>
              </div>
            )}
            {property.specs.wifi > 0 && (
              <div className="flex items-center gap-1 text-[11px] font-medium">
                <Wifi className="w-3.5 h-3.5 text-slate-400" />
                <span>WiFi</span>
              </div>
            )}
          </div>
        </div>

        <div className="flex justify-between items-end mt-3 pt-3 border-t border-slate-100 w-full">
          <div className="flex flex-col">
            {property.originalPrice && (
              <span className="text-[10px] text-slate-400 line-through">
                {property.originalPrice}
              </span>
            )}
            <span className="text-sm font-extrabold text-brand-green-vibrant">
              {property.price}
            </span>
          </div>
          
          <Link
            to={`/property/${property.id}`}
            onClick={(e) => e.stopPropagation()}
            className="flex items-center gap-1 text-xs font-semibold text-brand-green hover:underline hover:text-brand-green-hover transition-colors"
          >
            <span>Detail</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </div>
  );
}

