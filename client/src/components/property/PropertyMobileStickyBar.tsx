import type { PropertyDetail } from "../../types";

interface PropertyMobileStickyBarProps {
  property: PropertyDetail;
  handleBooking: () => void;
}

export default function PropertyMobileStickyBar({
  property,
  handleBooking,
}: PropertyMobileStickyBarProps) {
  return (
    <div className="lg:hidden fixed bottom-0 left-0 w-full bg-white/95 backdrop-blur-md border-t border-slate-100 p-4 z-40 flex justify-between items-center shadow-[0_-4px_20px_rgba(0,0,0,0.05)]">
      <div>
        <span className="text-xs text-slate-400 font-bold block uppercase tracking-wider">
          Harga Sewa
        </span>
        <span className="text-base font-black text-slate-800 block mt-0.5">{property.price}</span>
      </div>

      <div className="flex items-center gap-2">
        <a
          href={`https://wa.me/${(property.host?.phone || "+628123456789").replace(/[^0-9]/g, "").replace(/^0/, "62")}?text=Halo%20saya%20tertarik%20dengan%20kost%20${encodeURIComponent(
            property.title
          )}`}
          target="_blank"
          rel="noopener noreferrer"
          className="px-4 py-2.5 border border-slate-200 text-slate-600 text-sm font-bold rounded-full transition-all block text-center"
        >
          Hubungi
        </a>
        <button
          onClick={handleBooking}
          className="px-5 py-2.5 bg-brand-green hover:bg-brand-green-hover text-white text-sm font-bold rounded-full transition-all shadow-md cursor-pointer border-0"
        >
          Ajukan Sewa
        </button>
      </div>
    </div>
  );
}
