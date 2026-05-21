import { MapPin, Star, ChevronRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import type { SearchKostCard } from "../../types";

interface PropertySimilarListProps {
  similarProperties: SearchKostCard[];
}

export default function PropertySimilarList({
  similarProperties,
}: PropertySimilarListProps) {
  const navigate = useNavigate();

  return (
    <section className="mt-12 pt-8 border-t border-slate-100 w-full">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-xl md:text-2xl font-black text-slate-800 tracking-tight leading-none">
          Kamu mungkin suka
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {similarProperties.map((kost) => (
          <div
            key={kost.id}
            onClick={() => navigate(`/property/${kost.id}`)}
            className="bg-white rounded-3xl overflow-hidden flex flex-col group hover:shadow-lg transition-all duration-300 border border-slate-100 p-2.5 cursor-pointer"
          >
            {/* Image */}
            <div className="relative h-48 w-full overflow-hidden rounded-[1.25rem] bg-slate-100">
              <img
                src={kost.img}
                alt={kost.title}
                className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-700"
              />
              <span
                className={`absolute top-3 left-3 px-3 py-1 rounded-full text-[9px] font-extrabold text-white ${
                  kost.type === "Campur"
                    ? "bg-amber-600"
                    : kost.type === "Putra"
                    ? "bg-blue-600"
                    : "bg-rose-600"
                }`}
              >
                {kost.type}
              </span>
            </div>

            {/* Info block */}
            <div className="p-4 flex flex-col flex-grow justify-between">
              <div>
                <div className="flex justify-between items-center text-[10px] font-bold text-slate-400">
                  <span className="flex items-center gap-0.5 text-amber-500 bg-amber-500/10 px-1.5 py-0.5 rounded">
                    <Star className="w-3 h-3 fill-amber-500 stroke-amber-500" />
                    {kost.rating.toFixed(1)}
                  </span>
                  <span>Sisa {kost.roomLeft} Kamar</span>
                </div>

                <h4 className="mt-2.5 font-bold text-slate-800 text-sm group-hover:text-[#09090B] transition-colors line-clamp-1">
                  {kost.title}
                </h4>

                <p className="flex items-center gap-0.5 mt-1 text-[11px] text-slate-400 font-semibold line-clamp-1">
                  <MapPin className="w-3.5 h-3.5 text-slate-400" />
                  {kost.location.split(",").slice(-2).join(",").trim()}
                </p>
              </div>

              <div className="flex justify-between items-end mt-4 pt-4 border-t border-slate-100">
                <span className="text-xs font-black text-slate-800">{kost.price}</span>
                <span className="text-[10px] font-bold text-slate-500 group-hover:text-slate-800 transition-colors flex items-center gap-0.5">
                  <span>Detail</span>
                  <ChevronRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
