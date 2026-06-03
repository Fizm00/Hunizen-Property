import { Calendar, ShieldCheck } from "lucide-react";
import type { PropertyDetail } from "../../types";

interface PropertyBookingCardProps {
  property: PropertyDetail;
  checkInDate: string;
  setCheckInDate: (date: string) => void;
  duration: string;
  setDuration: (duration: string) => void;
  handleBooking: () => void;
}

export default function PropertyBookingCard({
  property,
  checkInDate,
  setCheckInDate,
  duration,
  setDuration,
  handleBooking,
}: PropertyBookingCardProps) {
  return (
    <div className="hidden lg:block sticky top-28 bg-white border border-slate-100 rounded-3xl p-6 shadow-md flex-col gap-6">
      <div className="flex justify-between items-end">
        <div>
          <span className="text-sm text-slate-400 font-bold block uppercase tracking-wider">
            Harga Sewa
          </span>
          <span className="text-2xl font-black text-slate-800 block mt-1">{property.price}</span>
        </div>

        <span
          className={`px-4 py-1.5 rounded-full text-sm font-bold text-white tracking-wide shadow-sm ${
            property.type === "Campur"
              ? "bg-amber-600"
              : property.type === "Putra"
              ? "bg-blue-600"
              : "bg-rose-600"
          }`}
        >
          {property.type}
        </span>
      </div>

      <div className="h-px bg-slate-100 w-full" />

      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-bold text-slate-400 uppercase tracking-wide">
            Mulai Kos
          </label>
          <div className="relative flex items-center px-4 py-2.5 border border-slate-200 rounded-xl bg-slate-50/50 focus-within:border-brand-green transition-colors">
            <Calendar className="w-4.5 h-4.5 text-slate-400 mr-2.5 shrink-0" />
            <input
              type="date"
              value={checkInDate}
              onChange={(e) => setCheckInDate(e.target.value)}
              className="bg-transparent text-sm font-bold text-slate-800 focus:outline-none w-full cursor-pointer"
            />
          </div>
        </div>

        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-bold text-slate-400 uppercase tracking-wide">
            Durasi Sewa
          </label>
          <select
            value={duration}
            onChange={(e) => setDuration(e.target.value)}
            className="w-full px-4 py-3 border border-slate-200 rounded-xl bg-slate-50/50 text-sm font-bold text-slate-800 focus:outline-none focus:border-brand-green transition-colors cursor-pointer"
          >
            <option value="Per Hari">Harian</option>
            <option value="Per Minggu">Mingguan</option>
            <option value="Per Bulan">Bulanan</option>
            <option value="Per 3 Bulan">3 Bulan</option>
            <option value="Per 6 Bulan">6 Bulan</option>
            <option value="Per Tahun">Tahunan</option>
          </select>
        </div>
      </div>

      <div className="flex flex-col gap-3.5 mt-2">
        <button
          onClick={handleBooking}
          className="w-full py-3.5 bg-brand-green hover:bg-brand-green-hover text-white text-sm font-bold rounded-full transition-all shadow-md active:scale-98 cursor-pointer border-0"
        >
          Ajukan Sewa
        </button>
        <a
          href={`https://wa.me/${(property.host?.phone || "+628123456789").replace(/[^0-9]/g, "").replace(/^0/, "62")}?text=Halo%20saya%20tertarik%20dengan%20kost%20${encodeURIComponent(
            property.title
          )}`}
          target="_blank"
          rel="noopener noreferrer"
          className="w-full py-3.5 border border-slate-200 hover:border-brand-green hover:text-brand-green text-slate-700 text-center text-sm font-bold rounded-full transition-all block cursor-pointer"
        >
          Hubungi Pemilik
        </a>
      </div>

      <div className="flex items-center gap-2 p-3 bg-brand-green-light rounded-xl text-brand-green text-xs font-bold border border-brand-green-accent/20">
        <ShieldCheck className="w-4.5 h-4.5 shrink-0" />
        <span>Pembayaran Anda aman. Jaminan uang kembali jika kost tidak sesuai.</span>
      </div>
    </div>
  );
}
