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
      
      {/* 1. Sticky Header */}
      <SearchHeader
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        openFilterModal={() => setIsFilterModalOpen(true)}
      />

      {/* 2. Sticky Filter Chips Bar */}
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

      {/* 3. Main Split Screen Content */}
      <main className="relative flex flex-1 w-full min-h-0 overflow-hidden">
        
        {/* Left Side: Property Listings */}
        <section
          data-lenis-prevent
          className={`flex-col gap-6 p-4 md:p-6 lg:p-8 w-full md:w-[55%] lg:w-[50%] h-full overflow-y-auto custom-scrollbar ${
            mobileView === "map" ? "hidden md:flex" : "flex"
          }`}
        >
          {/* Header text */}
          <div className="flex justify-between items-center w-full">
            <div>
              <h1 className="text-xl md:text-2xl font-bold text-white tracking-tight">
                Kost di Sekitarmu
              </h1>
              {loading ? (
                <div className="mt-2 h-3.5 bg-zinc-800/60 rounded w-40 animate-pulse" />
              ) : (
                <p className="mt-1 text-xs text-zinc-400">
                  Menampilkan <span className="font-semibold text-zinc-300">{filteredProperties.length}</span> properti terbaik
                </p>
              )}
            </div>
            
            {/* Sorting indicator */}
            <div className="flex items-center gap-1.5 px-3 py-1.5 text-xs text-zinc-400 bg-zinc-900/60 border border-zinc-800/80 rounded-xl">
              <span>Urutkan:</span>
              <span className="font-semibold text-zinc-200">
                {activeSort === "terendah" ? "Harga Terendah" : activeSort === "tertinggi" ? "Harga Tertinggi" : "Rekomendasi"}
              </span>
            </div>
          </div>

          {/* Cards Stack */}
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
            /* Empty State */
            <div className="flex flex-col justify-center items-center flex-1 p-8 text-center bg-zinc-950/20 border border-dashed border-zinc-800 rounded-3xl">
              <div className="flex justify-center items-center w-12 h-12 bg-zinc-900 border border-zinc-800 rounded-full text-zinc-500 mb-4">
                <SlidersHorizontal className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-zinc-200 text-base">Tidak ada properti cocok</h3>
              <p className="mt-1.5 text-xs text-zinc-500 max-w-xs">
                Coba sesuaikan kata kunci pencarian Anda atau bersihkan beberapa filter untuk melihat listing.
              </p>
              <button
                onClick={resetFilters}
                className="mt-4 px-5 py-2 text-xs font-semibold bg-[#F4F3EC] text-zinc-900 rounded-full hover:bg-white transition-colors cursor-pointer"
              >
                Reset Semua Filter
              </button>
            </div>
          )}
        </section>

        {/* Right Side: Interactive Vector Map */}
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

        {/* Floating Mobile Toggle Button */}
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

      {/* 4. Advanced Filter Modal (Glassmorphism overlay) */}
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
