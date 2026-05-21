import { ChevronRight } from "lucide-react";

interface PropertyDescriptionProps {
  isDescExpanded: boolean;
  setIsDescExpanded: (expanded: boolean | ((prev: boolean) => boolean)) => void;
}

export default function PropertyDescription({
  isDescExpanded,
  setIsDescExpanded,
}: PropertyDescriptionProps) {
  return (
    <div className="py-8 border-b border-slate-200/80">
      <h2 className="text-lg font-bold text-slate-800 mb-4">Deskripsi Tipe Kost ini</h2>
      <div
        className={`text-sm md:text-base text-slate-500 leading-relaxed font-medium ${
          isDescExpanded ? "" : "line-clamp-3"
        }`}
      >
        <p className="mb-3">
          Kost modern dengan fasilitas lengkap dan premium yang terletak di lokasi yang sangat strategis. Berada di lingkungan yang asri, tenang, dan kondusif, sangat cocok untuk mahasiswa maupun pekerja kantoran yang menginginkan hunian eksklusif dengan privasi tinggi.
        </p>
        <p>
          Kamar didesain secara estetis dan ergonomis dengan memanfaatkan pencahayaan alami yang optimal. Lokasi terhubung langsung dengan akses transportasi utama, dekat dari kampus-kampus ternama, pusat perbelanjaan, perkantoran, dan tempat kuliner terpopuler.
        </p>
      </div>
      <button
        onClick={() => setIsDescExpanded((prev) => !prev)}
        className="mt-4 text-sm font-extrabold text-[#09090B] hover:underline flex items-center gap-0.5 cursor-pointer bg-transparent border-0 p-0"
      >
        <span>{isDescExpanded ? "Tampilkan lebih sedikit" : "Baca selengkapnya"}</span>
        <ChevronRight
          className={`w-3.5 h-3.5 transition-transform ${isDescExpanded ? "-rotate-90" : "rotate-90"}`}
        />
      </button>
    </div>
  );
}
