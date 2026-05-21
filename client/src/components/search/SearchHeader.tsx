import { Link } from "react-router-dom";
import { Home, Search, SlidersHorizontal } from "lucide-react";

interface SearchHeaderProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  openFilterModal: () => void;
}

export function SearchHeader({
  searchQuery,
  setSearchQuery,
  openFilterModal,
}: SearchHeaderProps) {
  return (
    <header className="sticky top-0 z-30 flex justify-between items-center px-4 md:px-8 w-full h-20 bg-[#09090B] border-b border-zinc-800/60 shrink-0">
      
      {/* Left Side: Logo */}
      <Link to="/" className="flex items-center gap-2 group shrink-0">
        <div className="text-[#F4F3EC] group-hover:text-white transition-colors">
          <Home className="w-6 h-6" strokeWidth={2.5} />
        </div>
        <span className="font-bold text-xl tracking-tight text-[#F4F3EC] group-hover:text-white transition-colors">
          Hunizen
        </span>
      </Link>

      {/* Center: Search input bar widget */}
      <div className="hidden sm:flex items-center px-4 py-1.5 gap-2 max-w-md w-full mx-4 bg-zinc-900 border border-zinc-800 rounded-full shadow-lg focus-within:border-zinc-700 transition-all">
        <Search className="w-4 h-4 text-zinc-400 shrink-0" />
        <input
          type="text"
          placeholder="Cari kota, nama kost..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full bg-transparent text-sm text-zinc-100 placeholder-zinc-500 focus:outline-none"
        />
        <button
          onClick={openFilterModal}
          className="p-2 text-zinc-400 hover:text-white transition-colors cursor-pointer"
          title="Filter Selengkapnya"
        >
          <SlidersHorizontal className="w-4 h-4" />
        </button>
      </div>

      {/* Right Side: Quick navigation links */}
      <div className="flex items-center gap-6">
        <nav className="hidden lg:flex items-center gap-6 text-sm font-medium text-zinc-400">
          <Link to="/" className="hover:text-white transition-colors">Tentang Kami</Link>
          <Link to="/" className="hover:text-white transition-colors">FAQ</Link>
          <Link to="/" className="hover:text-white transition-colors">Kontak</Link>
        </nav>
        <a
          href="#masuk"
          className="bg-[#F4F3EC] hover:bg-[#E5E4DD] text-xs md:text-sm font-semibold px-5 py-2 rounded-full shadow-sm shrink-0 transition-all duration-300 text-zinc-900"
        >
          Masuk
        </a>
      </div>
    </header>
  );
}
