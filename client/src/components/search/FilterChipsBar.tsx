import { Search, SlidersHorizontal } from "lucide-react";
import type { GenderFilter, PeriodFilter } from "../../hooks/usePropertySearch";

interface FilterChipsBarProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  activeGender: GenderFilter;
  setActiveGender: (gender: GenderFilter) => void;
  activePeriod: PeriodFilter;
  setActivePeriod: (period: PeriodFilter) => void;
  openFilterModal: () => void;
  activeFiltersCount: number;
}

export function FilterChipsBar({
  searchQuery,
  setSearchQuery,
  activeGender,
  setActiveGender,
  activePeriod,
  setActivePeriod,
  openFilterModal,
  activeFiltersCount,
}: FilterChipsBarProps) {
  const genders: GenderFilter[] = ["Semua Tipe", "Campur", "Putra", "Putri"];
  const periods: PeriodFilter[] = ["Semua Periode", "Bulanan", "Harian"];

  return (
    <div className="sticky top-20 z-20 flex justify-between items-center px-4 md:px-8 w-full h-14 bg-[#09090B] border-b border-zinc-800/40 overflow-x-auto shrink-0 scrollbar-none gap-3">
      
      {/* Search bar specifically for mobile screens */}
      <div className="flex sm:hidden items-center px-3 py-1.5 w-full max-w-[200px] bg-zinc-900 border border-zinc-800 rounded-full">
        <Search className="w-3.5 h-3.5 text-zinc-400 mr-1.5 shrink-0" />
        <input
          type="text"
          placeholder="Cari kost..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full bg-transparent text-xs text-zinc-100 focus:outline-none"
        />
      </div>

      <div className="flex items-center gap-2 overflow-x-auto scrollbar-none">
        {/* Gender Filter Chips */}
        {genders.map((gender) => (
          <button
            key={gender}
            onClick={() => setActiveGender(gender)}
            className={`px-4 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap border transition-all duration-200 cursor-pointer ${
              activeGender === gender
                ? "bg-[#F4F3EC] text-zinc-900 border-[#F4F3EC]"
                : "bg-transparent text-zinc-400 border-zinc-800 hover:border-zinc-700 hover:text-white"
            }`}
          >
            {gender === "Semua Tipe" ? "Semua Tipe Kost" : gender}
          </button>
        ))}

        <div className="h-4 w-px bg-zinc-800 mx-1 shrink-0" />

        {/* Period Filter Chips */}
        {periods.map((period) => (
          <button
            key={period}
            onClick={() => setActivePeriod(period)}
            className={`px-4 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap border transition-all duration-200 cursor-pointer ${
              activePeriod === period
                ? "bg-[#F4F3EC] text-zinc-900 border-[#F4F3EC]"
                : "bg-transparent text-zinc-400 border-zinc-800 hover:border-zinc-700 hover:text-white"
            }`}
          >
            {period}
          </button>
        ))}
      </div>

      {/* Filter Modal Toggle Button */}
      <button
        onClick={openFilterModal}
        className="flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold bg-zinc-900 text-zinc-300 border border-zinc-800 hover:border-zinc-700 hover:text-white transition-all shrink-0 cursor-pointer"
      >
        <SlidersHorizontal className="w-3.5 h-3.5" />
        <span>Filters</span>
        {activeFiltersCount > 0 && (
          <span className="w-4 h-4 rounded-full bg-amber-500 text-zinc-900 flex items-center justify-center text-[9px] font-bold">
            {activeFiltersCount}
          </span>
        )}
      </button>
    </div>
  );
}
