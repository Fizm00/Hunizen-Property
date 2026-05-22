import { X, Check } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import type { GenderFilter, PeriodFilter, SortFilter } from "../../hooks/usePropertySearch";

interface AdvancedFilterModalProps {
  isOpen: boolean;
  onClose: () => void;
  minPrice: number;
  setMinPrice: (price: number) => void;
  maxPrice: number;
  setMaxPrice: (price: number) => void;
  activeGender: GenderFilter;
  setActiveGender: (gender: GenderFilter) => void;
  activePeriod: PeriodFilter;
  setActivePeriod: (period: PeriodFilter) => void;
  activeFacilities: string[];
  handleFacilityToggle: (facility: string) => void;
  activeRules: string[];
  handleRuleToggle: (rule: string) => void;
  activeSort: SortFilter;
  setActiveSort: (sort: SortFilter) => void;
  resetFilters: () => void;
}

export function AdvancedFilterModal({
  isOpen,
  onClose,
  minPrice,
  setMinPrice,
  maxPrice,
  setMaxPrice,
  activeGender,
  setActiveGender,
  activePeriod,
  setActivePeriod,
  activeFacilities,
  handleFacilityToggle,
  activeRules,
  handleRuleToggle,
  activeSort,
  setActiveSort,
  resetFilters,
}: AdvancedFilterModalProps) {
  const roomFacilities = [
    "KM Dalam",
    "Kloset Duduk",
    "Air Panas",
    "Kasur",
    "TV",
    "Lemari Baju",
    "AC",
    "Meja",
    "Kursi",
    "Kipas Angin",
    "Jendela",
    "Termasuk Listrik",
  ];

  const sharedFacilities = [
    "WiFi",
    "Parkir Mobil",
    "Parkir Motor",
    "Dapur",
    "Mesin Cuci",
    "Laundry",
    "Mushola",
    "Penjaga Kos",
    "Kulkas",
    "Dispenser",
    "R. Keluarga",
    "R. Tamu",
  ];

  const rulesList = [
    "Akses 24 jam",
    "Boleh pasutri",
    "Maks. 2 orang/kamar",
    "Boleh bawa hewan",
    "Khusus karyawan",
    "Boleh bawa anak",
  ];

  const genders: { label: string; value: GenderFilter }[] = [
    { label: "Putra", value: "Putra" },
    { label: "Putri", value: "Putri" },
    { label: "Campuran", value: "Campur" },
  ];

  const periods: { label: string; value: PeriodFilter }[] = [
    { label: "Mingguan", value: "Mingguan" },
    { label: "Bulanan", value: "Bulanan" },
    { label: "3 Bulan", value: "3 Bulan" },
    { label: "6 Bulan", value: "6 Bulan" },
    { label: "Tahunan", value: "Tahunan" },
  ];

  const sorts: { label: string; value: SortFilter }[] = [
    { label: "Rekomendasi", value: "rekomendasi" },
    { label: "Harga Terendah", value: "terendah" },
    { label: "Harga Tertinggi", value: "tertinggi" },
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex justify-center items-center p-4 bg-black/85 backdrop-blur-sm"
        >
          <motion.div
            initial={{ scale: 0.95, y: 15 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.95, y: 15 }}
            data-lenis-prevent
            className="flex flex-col gap-6 p-6 md:p-8 w-full max-w-5xl max-h-[90vh] bg-zinc-900 border border-zinc-800 rounded-3xl overflow-y-auto custom-scrollbar"
          >
            {/* Modal Header */}
            <div className="flex justify-between items-center w-full pb-2 border-b border-zinc-800/60">
              <div>
                <h3 className="text-lg font-bold text-white tracking-tight">Filter</h3>
                <p className="mt-0.5 text-xs text-zinc-400">Sesuaikan kriteria pencarian kosan Anda</p>
              </div>
              <button
                onClick={onClose}
                className="flex justify-center items-center w-8 h-8 bg-zinc-800 hover:bg-zinc-700 text-zinc-400 hover:text-white rounded-full transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* 3-Column Layout */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full">
              
              {/* Column 1: Core Tipe, Waktu Bayar, Harga, Urutkan */}
              <div className="flex flex-col gap-6">
                
                {/* 1. Tipe Kos */}
                <div className="flex flex-col gap-2.5 w-full">
                  <span className="text-xs font-semibold text-zinc-300">Tipe Kos</span>
                  <div className="grid grid-cols-3 gap-2 w-full">
                    {genders.map((g) => {
                      const isActive = activeGender === g.value;
                      return (
                        <button
                          key={g.value}
                          onClick={() => setActiveGender(isActive ? "Semua Tipe" : g.value)}
                          className={`py-2.5 rounded-xl text-xs font-semibold border transition-all cursor-pointer ${
                            isActive
                              ? "bg-brand-green-accent text-white border-brand-green-accent shadow-sm"
                              : "bg-zinc-950/40 text-zinc-400 border-zinc-800 hover:border-zinc-700"
                          }`}
                        >
                          {g.label}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* 2. Waktu Bayar Kos */}
                <div className="flex flex-col gap-2.5 w-full">
                  <span className="text-xs font-semibold text-zinc-300">Waktu Bayar Kos</span>
                  <div className="grid grid-cols-3 gap-2 w-full">
                    {periods.map((p) => {
                      const isActive = activePeriod === p.value;
                      return (
                        <button
                          key={p.value}
                          onClick={() => setActivePeriod(isActive ? "Semua Periode" : p.value)}
                          className={`py-2 rounded-xl text-xs font-semibold border transition-all cursor-pointer ${
                            isActive
                              ? "bg-brand-green-accent text-white border-brand-green-accent shadow-sm"
                              : "bg-zinc-950/40 text-zinc-400 border-zinc-800 hover:border-zinc-700"
                          }`}
                        >
                          {p.label}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* 3. Harga */}
                <div className="flex flex-col gap-2.5 w-full">
                  <span className="text-xs font-semibold text-zinc-300">Harga</span>
                  <div className="grid grid-cols-2 gap-3 w-full">
                    <div className="flex flex-col gap-1.5">
                      <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-wider">Minimal</label>
                      <div className="flex items-center gap-1.5 px-3 py-2 bg-zinc-950/40 border border-zinc-800 rounded-xl focus-within:border-zinc-700 transition-colors">
                        <span className="text-zinc-500 text-xs font-semibold select-none">Rp</span>
                        <input
                          type="number"
                          value={minPrice || ""}
                          onChange={(e) => setMinPrice(Math.max(0, parseInt(e.target.value) || 0))}
                          placeholder="10.000"
                          className="bg-transparent border-none outline-none text-white text-xs font-medium w-full [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                        />
                      </div>
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-wider">Maksimal</label>
                      <div className="flex items-center gap-1.5 px-3 py-2 bg-zinc-950/40 border border-zinc-800 rounded-xl focus-within:border-zinc-700 transition-colors">
                        <span className="text-zinc-500 text-xs font-semibold select-none">Rp</span>
                        <input
                          type="number"
                          value={maxPrice || ""}
                          onChange={(e) => setMaxPrice(Math.max(0, parseInt(e.target.value) || 0))}
                          placeholder="20.000.000"
                          className="bg-transparent border-none outline-none text-white text-xs font-medium w-full [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* 4. Urutkan */}
                <div className="flex flex-col gap-2.5 w-full">
                  <span className="text-xs font-semibold text-zinc-300">Urutkan</span>
                  <div className="grid grid-cols-3 gap-2 w-full">
                    {sorts.map((s) => {
                      const isActive = activeSort === s.value;
                      return (
                        <button
                          key={s.value}
                          onClick={() => setActiveSort(s.value)}
                          className={`py-2 px-1 rounded-xl text-[10px] font-semibold border transition-all cursor-pointer text-center ${
                            isActive
                              ? "bg-brand-green-accent text-white border-brand-green-accent shadow-sm"
                              : "bg-zinc-950/40 text-zinc-400 border-zinc-800 hover:border-zinc-700"
                          }`}
                        >
                          {s.label}
                        </button>
                      );
                    })}
                  </div>
                </div>

              </div>

              {/* Column 2: Fasilitas Kamar */}
              <div className="flex flex-col gap-2.5">
                <span className="text-xs font-semibold text-zinc-300">Fasilitas Kamar</span>
                <div className="grid grid-cols-2 gap-2 w-full">
                  {roomFacilities.map((fac) => {
                    const isActive = activeFacilities.includes(fac);
                    return (
                      <button
                        key={fac}
                        onClick={() => handleFacilityToggle(fac)}
                        className={`flex items-center gap-2 px-3 py-2.5 border rounded-xl text-xs font-medium transition-all cursor-pointer text-left ${
                          isActive
                            ? "bg-brand-green-accent/10 border-brand-green-accent text-white"
                            : "bg-zinc-950/20 border-zinc-800 hover:border-zinc-700 text-zinc-400"
                        }`}
                      >
                        <div className={`flex justify-center items-center w-4 h-4 border rounded-md shrink-0 ${
                          isActive
                            ? "bg-brand-green-accent border-brand-green-accent text-white"
                            : "border-zinc-750"
                        }`}>
                          {isActive && <Check className="w-2.5 h-2.5" strokeWidth={3} />}
                        </div>
                        <span className="truncate">{fac}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Column 3: Fasilitas Bersama & Aturan Kos */}
              <div className="flex flex-col gap-6">
                
                {/* Fasilitas Bersama */}
                <div className="flex flex-col gap-2.5">
                  <span className="text-xs font-semibold text-zinc-300">Fasilitas Bersama</span>
                  <div className="grid grid-cols-2 gap-2 w-full">
                    {sharedFacilities.map((fac) => {
                      const isActive = activeFacilities.includes(fac);
                      return (
                        <button
                          key={fac}
                          onClick={() => handleFacilityToggle(fac)}
                          className={`flex items-center gap-2 px-3 py-2.5 border rounded-xl text-xs font-medium transition-all cursor-pointer text-left ${
                            isActive
                              ? "bg-brand-green-accent/10 border-brand-green-accent text-white"
                              : "bg-zinc-950/20 border-zinc-800 hover:border-zinc-700 text-zinc-400"
                          }`}
                        >
                          <div className={`flex justify-center items-center w-4 h-4 border rounded-md shrink-0 ${
                            isActive
                              ? "bg-brand-green-accent border-brand-green-accent text-white"
                              : "border-zinc-750"
                          }`}>
                            {isActive && <Check className="w-2.5 h-2.5" strokeWidth={3} />}
                          </div>
                          <span className="truncate">{fac}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Aturan Kos */}
                <div className="flex flex-col gap-2.5 w-full">
                  <span className="text-xs font-semibold text-zinc-300">Aturan Kos</span>
                  <div className="grid grid-cols-2 gap-2 w-full">
                    {rulesList.map((rule) => {
                      const isActive = activeRules.includes(rule);
                      return (
                        <button
                          key={rule}
                          onClick={() => handleRuleToggle(rule)}
                          className={`flex items-center gap-2 px-3 py-2 border rounded-xl text-xs font-medium transition-all cursor-pointer text-left ${
                            isActive
                              ? "bg-brand-green-accent/10 border-brand-green-accent text-white"
                              : "bg-zinc-950/20 border-zinc-800 hover:border-zinc-700 text-zinc-400"
                          }`}
                        >
                          <div className={`flex justify-center items-center w-4 h-4 border rounded-md shrink-0 ${
                            isActive
                              ? "bg-brand-green-accent border-brand-green-accent text-white"
                              : "border-zinc-750"
                          }`}>
                            {isActive && <Check className="w-2.5 h-2.5" strokeWidth={3} />}
                          </div>
                          <span className="truncate">{rule}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>

              </div>

            </div>

            {/* Modal Footer Controls */}
            <div className="flex items-center gap-3 pt-5 border-t border-zinc-800 mt-2 w-full">
              <button
                onClick={resetFilters}
                className="flex-1 py-3 text-xs font-bold text-zinc-400 hover:text-white transition-colors cursor-pointer"
              >
                Reset Filter
              </button>
              
              <button
                onClick={onClose}
                className="flex-1 py-3 text-xs font-bold bg-brand-green-accent hover:bg-brand-green-hover text-white border border-brand-green-accent rounded-full shadow-lg transition-colors cursor-pointer text-center"
              >
                Terapkan Hasil
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
