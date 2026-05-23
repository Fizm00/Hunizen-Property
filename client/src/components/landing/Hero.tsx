import { useEffect, useRef } from "react";
import { Search } from "lucide-react";
import { motion } from "framer-motion";
import heroBg from "../../assets/hero_bg_indoor_kost.png";
import { SEARCH_FILTERS } from "../../constants";
import { ease } from "../../lib/animations";
import { useHeroSearch } from "../../hooks/useHeroSearch";

export default function Hero() {
  const {
    activeDropdown,
    setActiveDropdown,
    getOptionsFor,
    getSelectedDisplay,
    handleSelect,
    handleSearch,
    keyword,
    setKeyword,
  } = useHeroSearch();

  const searchBarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (searchBarRef.current && !searchBarRef.current.contains(event.target as Node)) {
        setActiveDropdown(null);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [setActiveDropdown]);

  return (
    <section className="relative w-full h-screen overflow-hidden flex flex-col items-center justify-center bg-black">
      <div className="absolute inset-0 z-0">
        <motion.img
          initial={{ scale: 1.15, opacity: 0 }}
          animate={{ scale: 1, opacity: 0.9 }}
          transition={{ duration: 2, ease: ease.expo }}
          src={heroBg}
          alt="Modern Kost Interior"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/55" />
      </div>

      <div className="relative z-10 w-full max-w-5xl mx-auto px-6 flex flex-col items-center text-center mt-12 md:mt-16">
        <motion.h1
          initial={{ y: 40, opacity: 0, filter: "blur(10px)" }}
          animate={{ y: 0, opacity: 1, filter: "blur(0px)" }}
          transition={{ duration: 1.2, ease: ease.expo }}
          className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-[1.2] md:leading-[1.15] max-w-4xl tracking-tight"
        >
          Temukan Kost Impianmu
          <br className="hidden md:block" /> dengan Mudah dan Cepat!
        </motion.h1>

        <motion.div
          initial={{ y: 20, opacity: 0, filter: "blur(6px)" }}
          animate={{ y: 0, opacity: 1, filter: "blur(0px)" }}
          transition={{ duration: 1, delay: 0.3, ease: ease.expo }}
          className="w-full max-w-[1000px] mt-16 flex justify-start mb-3 px-2"
        >
          <span className="text-white text-2xl font-bold tracking-wide">CARI?</span>
        </motion.div>

        <motion.div
          ref={searchBarRef}
          initial={{ y: 50, opacity: 0, filter: "blur(8px)" }}
          animate={{ y: 0, opacity: 1, filter: "blur(0px)" }}
          transition={{ duration: 1.2, delay: 0.4, ease: ease.expo }}
          className="relative z-40 w-full max-w-[1000px] bg-white rounded-4xl md:rounded-full p-2 flex flex-col md:flex-row items-center justify-between shadow-2xl cursor-pointer"
        >
          <div className="flex w-full md:w-auto overflow-x-visible divide-x divide-slate-200">
            {SEARCH_FILTERS.map((filter) => {
              const selectedValue = getSelectedDisplay(filter.label);
              return (
                <div
                  key={filter.label}
                  onClick={(e) => {
                    e.stopPropagation();
                    setActiveDropdown(activeDropdown === filter.label ? null : filter.label);
                  }}
                  className={`relative grow-0 shrink-0 ${filter.minWidth} flex flex-col items-start justify-center px-6 py-2.5 hover:bg-slate-50 rounded-2xl md:rounded-full transition-colors`}
                >
                  <span className="text-[10px] font-bold text-slate-800 tracking-wider uppercase">
                    {filter.label === "Location" ? "Lokasi" : filter.label}
                  </span>
                  <span
                    className={`text-xs font-semibold mt-0.5 whitespace-nowrap ${
                      selectedValue.isCustom ? "text-brand-green font-bold" : "text-slate-400"
                    }`}
                  >
                    {selectedValue.text}
                  </span>

                  {activeDropdown === filter.label && (
                    <div className="absolute top-full left-0 mt-2.5 w-60 bg-white border border-slate-100 rounded-2xl shadow-2xl py-2.5 z-50 text-left">
                      {getOptionsFor(filter.label).map((option) => (
                        <button
                          key={option.value}
                          type="button"
                          onMouseDown={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            handleSelect(filter.label, option);
                          }}
                          className="w-full text-left px-5 py-2.5 text-xs font-bold text-slate-700 hover:bg-brand-green-light hover:text-brand-green transition-colors block cursor-pointer"
                        >
                          {option.label}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}

            <div className="hidden lg:flex flex-1 min-w-[150px] items-center px-6 py-2">
              <input
                type="text"
                placeholder="Cari kost disini..."
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
                className="w-full bg-transparent text-xs font-semibold text-slate-800 placeholder-slate-400 focus:outline-none"
              />
            </div>
          </div>

          <div className="pl-2 pr-1 w-full md:w-auto mt-2 md:mt-0 flex items-center justify-end">
            <button
              onClick={handleSearch}
              className="w-12 h-12 rounded-full bg-brand-green hover:bg-brand-green-hover flex items-center justify-center transition-colors shadow-md text-white shrink-0 cursor-pointer"
              aria-label="Search properties"
            >
              <Search className="w-5 h-5" strokeWidth={2.5} />
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
