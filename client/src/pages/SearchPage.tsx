import { SlidersHorizontal } from "lucide-react";
import { usePropertySearch } from "../hooks/usePropertySearch";
import { SearchHeader } from "../components/search/SearchHeader";
import { FilterChipsBar } from "../components/search/FilterChipsBar";
import { PropertyHorizontalCard } from "../components/search/PropertyHorizontalCard";
import { PropertyLeafletMap } from "../components/search/PropertyLeafletMap";
import { AdvancedFilterModal } from "../components/search/AdvancedFilterModal";
import { PropertyHorizontalSkeleton } from "../components/search/PropertyHorizontalSkeleton";

export default function SearchPage() {
  const {
    loading,
    searchQuery,
    setSearchQuery,
    activeGender,
    setActiveGender,
    activePeriod,
    setActivePeriod,
    activeFacilities,
    minPrice,
    setMinPrice,
    maxPrice,
    setMaxPrice,
    activeRules,
    handleRuleToggle,
    activeSort,
    setActiveSort,
    activeFiltersCount,
    isFilterModalOpen,
    setIsFilterModalOpen,
    mobileView,
    setMobileView,
    hoveredPropertyId,
    setHoveredPropertyId,
    selectedPropertyId,
    setSelectedPropertyId,
    filteredProperties,
    selectedProperty,
    handleFacilityToggle,
    resetFilters,
  } = usePropertySearch();

  return (
    <div className="flex flex-col w-full h-screen bg-[#09090B] text-zinc-100 font-sans select-none overflow-hidden">
      
      <SearchHeader
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        openFilterModal={() => setIsFilterModalOpen(true)}
      />

      <FilterChipsBar
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        activeGender={activeGender}
        setActiveGender={setActiveGender}
        activePeriod={activePeriod}
        setActivePeriod={setActivePeriod}
        openFilterModal={() => setIsFilterModalOpen(true)}
        activeFiltersCount={activeFiltersCount}
      />

      <main className="relative flex flex-1 w-full min-h-0 overflow-hidden">
        
        <section
          data-lenis-prevent
          className={`flex-col gap-6 p-4 md:p-6 lg:p-8 w-full md:w-[55%] lg:w-[50%] h-full overflow-y-auto custom-scrollbar bg-white ${
            mobileView === "map" ? "hidden md:flex" : "flex"
          }`}
        >
          <div className="flex justify-between items-center w-full">
            <div>
              <h1 className="text-xl md:text-2xl font-bold text-slate-800 tracking-tight">
                Kost di Sekitarmu
              </h1>
              {loading ? (
                <div className="mt-2 h-3.5 bg-slate-100 rounded w-40 animate-pulse" />
              ) : (
                <p className="mt-1 text-xs text-slate-500">
                  Menampilkan <span className="font-semibold text-slate-700">{filteredProperties.length}</span> properti terbaik
                </p>
              )}
            </div>
            
            <div className="flex items-center gap-1.5 px-3 py-1.5 text-xs text-slate-500 bg-slate-50 border border-slate-200 rounded-xl">
              <span>Urutkan:</span>
              <span className="font-semibold text-slate-700">
                {activeSort === "terendah" ? "Harga Terendah" : activeSort === "tertinggi" ? "Harga Tertinggi" : "Rekomendasi"}
              </span>
            </div>
          </div>

          {loading ? (
            <div className="flex flex-col gap-4 w-full">
              {[1, 2, 3].map((n) => (
                <PropertyHorizontalSkeleton key={n} />
              ))}
            </div>
          ) : filteredProperties.length > 0 ? (
            <div className="flex flex-col gap-4 w-full">
              {filteredProperties.map((kost) => (
                <PropertyHorizontalCard
                  key={kost.id}
                  property={kost}
                  isHovered={hoveredPropertyId === kost.id}
                  isSelected={selectedPropertyId === kost.id}
                  onMouseEnter={() => setHoveredPropertyId(kost.id)}
                  onMouseLeave={() => setHoveredPropertyId(null)}
                  onClick={() => {
                    setSelectedPropertyId(kost.id);
                    if (window.innerWidth < 768) {
                      setMobileView("map");
                    }
                  }}
                />
              ))}
            </div>
          ) : (
            <div className="flex flex-col justify-center items-center flex-1 p-8 text-center bg-slate-50/50 border border-dashed border-slate-200 rounded-3xl">
              <div className="flex justify-center items-center w-12 h-12 bg-slate-100 border border-slate-200/80 rounded-full text-slate-400 mb-4">
                <SlidersHorizontal className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-slate-700 text-base">Tidak ada properti cocok</h3>
              <p className="mt-1.5 text-xs text-slate-400 max-w-xs">
                Coba sesuaikan kata kunci pencarian Anda atau bersihkan beberapa filter untuk melihat listing.
              </p>
              <button
                onClick={resetFilters}
                className="mt-4 px-5 py-2 text-xs font-semibold bg-brand-green text-white rounded-full hover:bg-brand-green-hover transition-colors cursor-pointer"
              >
                Reset Semua Filter
              </button>
            </div>
          )}
        </section>

        <section
          className={`flex-1 h-full bg-[#121214] relative overflow-hidden ${
            mobileView === "list" ? "hidden md:block" : "block"
          }`}
        >
          <PropertyLeafletMap
            properties={filteredProperties}
            hoveredPropertyId={hoveredPropertyId}
            setHoveredPropertyId={setHoveredPropertyId}
            selectedPropertyId={selectedPropertyId}
            setSelectedPropertyId={setSelectedPropertyId}
            selectedProperty={selectedProperty}
          />
        </section>

        <div className="absolute bottom-6 left-1/2 z-30 -translate-x-1/2 md:hidden">
          <button
            onClick={() => setMobileView(mobileView === "list" ? "map" : "list")}
            className="flex items-center gap-2 px-6 py-3 bg-[#F4F3EC] hover:scale-105 active:scale-95 text-zinc-900 text-xs font-extrabold rounded-full shadow-2xl transition-all cursor-pointer"
          >
            {mobileView === "list" ? (
              <>
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                </svg>
                <span>Tampilkan Peta</span>
              </>
            ) : (
              <>
                <SlidersHorizontal className="w-4 h-4" />
                <span>Tampilkan Daftar</span>
              </>
            )}
          </button>
        </div>

      </main>

      <AdvancedFilterModal
        isOpen={isFilterModalOpen}
        onClose={() => setIsFilterModalOpen(false)}
        minPrice={minPrice}
        setMinPrice={setMinPrice}
        maxPrice={maxPrice}
        setMaxPrice={setMaxPrice}
        activeGender={activeGender}
        setActiveGender={setActiveGender}
        activePeriod={activePeriod}
        setActivePeriod={setActivePeriod}
        activeFacilities={activeFacilities}
        handleFacilityToggle={handleFacilityToggle}
        activeRules={activeRules}
        handleRuleToggle={handleRuleToggle}
        activeSort={activeSort}
        setActiveSort={setActiveSort}
        resetFilters={resetFilters}
      />
      
    </div>
  );
}
