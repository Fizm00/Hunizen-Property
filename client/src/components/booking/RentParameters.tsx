import { Calendar, AlertTriangle } from "lucide-react";
import type { PropertyDetail } from "../../types";
import {
  MAX_OCCUPANTS,
  MIN_OCCUPANTS,
  MAX_DURATION_MONTHS,
  MIN_DURATION_MONTHS
} from "../../constants/booking";

interface RentParametersProps {
  occupantsCount: number;
  incrementOccupants: () => void;
  decrementOccupants: () => void;
  durationMonths: number;
  incrementDuration: () => void;
  decrementDuration: () => void;
  startDate: string;
  setStartDate: (val: string) => void;
  selectedRoomType: string;
  setSelectedRoomType: (val: string) => void;
  property: PropertyDetail;
}

export default function RentParameters({
  occupantsCount,
  incrementOccupants,
  decrementOccupants,
  durationMonths,
  incrementDuration,
  decrementDuration,
  startDate,
  setStartDate,
  selectedRoomType,
  setSelectedRoomType,
  property
}: RentParametersProps) {
  return (
    <div className="bg-white border border-slate-200/60 rounded-3xl p-6 md:p-8 shadow-sm flex flex-col gap-6">
      
      {/* Occupants Count Counter */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-100">
        <div>
          <h3 className="text-sm font-black text-slate-800">Jumlah Penyewa</h3>
          <p className="text-xs text-slate-400 mt-0.5">Jumlah orang yang akan tinggal di kamar</p>
        </div>
        <div className="flex items-center gap-4 w-full md:w-auto justify-between md:justify-end">
          <div className="flex items-center border border-slate-200 rounded-xl p-1 bg-slate-50/30 h-12 w-48 justify-between shrink-0">
            <button
              type="button"
              onClick={decrementOccupants}
              className="w-9 h-9 flex items-center justify-center font-bold text-slate-600 hover:bg-white rounded-lg transition-colors border-0 cursor-pointer text-lg disabled:opacity-40"
              disabled={occupantsCount <= MIN_OCCUPANTS}
            >
              &minus;
            </button>
            <span className="text-center text-sm font-bold text-slate-800">
              {occupantsCount} Orang
            </span>
            <button
              type="button"
              onClick={incrementOccupants}
              className="w-9 h-9 flex items-center justify-center font-bold text-slate-600 hover:bg-white rounded-lg transition-colors border-0 cursor-pointer text-lg disabled:opacity-40"
              disabled={occupantsCount >= MAX_OCCUPANTS}
            >
              &#43;
            </button>
          </div>
          <span className="text-[10px] font-extrabold text-slate-400 uppercase tracking-wider w-28 shrink-0">
            Maksimal {MAX_OCCUPANTS} orang
          </span>
        </div>
      </div>

      {/* Duration Counter */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-100">
        <div>
          <h3 className="text-sm font-black text-slate-800">Durasi Ngekos</h3>
          <p className="text-xs text-slate-400 mt-0.5">Durasi sewa kost yang diajukan</p>
        </div>
        <div className="flex items-center gap-4 w-full md:w-auto justify-between md:justify-end">
          <div className="flex items-center border border-slate-200 rounded-xl p-1 bg-slate-50/30 h-12 w-48 justify-between shrink-0">
            <button
              type="button"
              onClick={decrementDuration}
              className="w-9 h-9 flex items-center justify-center font-bold text-slate-600 hover:bg-white rounded-lg transition-colors border-0 cursor-pointer text-lg disabled:opacity-40"
              disabled={durationMonths <= MIN_DURATION_MONTHS}
            >
              &minus;
            </button>
            <span className="text-center text-sm font-bold text-slate-800">
              {durationMonths} Bulan
            </span>
            <button
              type="button"
              onClick={incrementDuration}
              className="w-9 h-9 flex items-center justify-center font-bold text-slate-600 hover:bg-white rounded-lg transition-colors border-0 cursor-pointer text-lg disabled:opacity-40"
              disabled={durationMonths >= MAX_DURATION_MONTHS}
            >
              &#43;
            </button>
          </div>
          <span className="text-[10px] font-extrabold text-slate-400 uppercase tracking-wider w-28 shrink-0">
            Hingga {MAX_DURATION_MONTHS} Bulan
          </span>
        </div>
      </div>

      {/* Start Date Picker */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h3 className="text-sm font-black text-slate-800">Tanggal Mulai Ngekos</h3>
          <p className="text-xs text-slate-400 mt-0.5">Tanggal rencana masuk ke kost</p>
        </div>
        <div className="flex items-center gap-4 w-full md:w-auto justify-between md:justify-end">
          <div className="flex items-center px-3 border border-slate-200 rounded-xl bg-slate-50/30 focus-within:border-[#09090B] transition-colors h-12 w-48 shrink-0">
            <Calendar className="w-4.5 h-4.5 text-slate-400 mr-2.5 shrink-0" />
            <input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="bg-transparent text-sm font-bold text-slate-800 focus:outline-none w-full cursor-pointer scheme-light"
            />
          </div>
          <span className="text-[10px] font-extrabold text-slate-400 uppercase tracking-wider w-28 shrink-0">
            Rencana Masuk
          </span>
        </div>
      </div>

      {/* Room Type Selector (Optional fallback) */}
      {property.roomTypes && property.roomTypes.length > 1 && (
        <div className="flex flex-col gap-2 pt-4 border-t border-slate-100">
          <h3 className="text-sm font-black text-slate-800">Tipe Kamar Terpilih</h3>
          <div className="grid grid-cols-2 gap-3 mt-1">
            {property.roomTypes.map((rt) => (
              <button
                key={rt.name}
                type="button"
                onClick={() => setSelectedRoomType(rt.name)}
                className={`flex flex-col p-3 border rounded-xl text-left transition-all cursor-pointer ${
                  selectedRoomType === rt.name
                    ? "bg-slate-50 border-slate-900 shadow-sm"
                    : "bg-white border-slate-200 hover:bg-slate-50"
                }`}
              >
                <span className="text-xs font-black text-slate-800">{rt.name}</span>
                <span className="text-[10px] text-slate-400 mt-0.5">{rt.price}</span>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Urgency warning banner */}
      <div className="flex items-start gap-3 p-4 bg-amber-50/50 border border-amber-100 rounded-2xl mt-4">
        <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
        <div className="text-xs text-amber-800 leading-relaxed font-semibold">
          <span>Perhatian: Pemilik Kost melarang membawa hewan peliharaan. Harap patuhi tata tertib demi kenyamanan bersama.</span>
        </div>
      </div>
    </div>
  );
}
