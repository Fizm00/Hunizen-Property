import { Link } from "react-router-dom";
import { Home, Search, SlidersHorizontal } from "lucide-react";
import { useState, useEffect } from "react";
import defaultAvatar from "../../assets/default_user_avatar.png";

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
  const [user, setUser] = useState<{ name: string; avatarUrl?: string } | null>(() => {
    const saved = localStorage.getItem("user");
    return saved ? JSON.parse(saved) : null;
  });

  const [customAvatar, setCustomAvatar] = useState<string | null>(() => {
    return localStorage.getItem("user_custom_avatar");
  });

  useEffect(() => {
    const handleProfileUpdate = () => {
      const saved = localStorage.getItem("user");
      setUser(saved ? JSON.parse(saved) : null);
      setCustomAvatar(localStorage.getItem("user_custom_avatar"));
    };

    window.addEventListener("profile-update", handleProfileUpdate);
    return () => {
      window.removeEventListener("profile-update", handleProfileUpdate);
    };
  }, []);

  const avatarSrc = user?.avatarUrl || customAvatar || defaultAvatar;

  return (
    <header className="sticky top-0 z-30 flex justify-between items-center px-4 md:px-8 w-full h-20 bg-brand-green border-b border-brand-green-accent/60 shrink-0">
      
      <Link to="/" className="flex items-center gap-2 group shrink-0">
        <div className="text-[#F4F3EC] group-hover:text-white transition-colors">
          <Home className="w-6 h-6" strokeWidth={2.5} />
        </div>
        <span className="font-bold text-xl tracking-tight text-[#F4F3EC] group-hover:text-white transition-colors">
          Hunizen
        </span>
      </Link>

      <div className="hidden sm:flex items-center px-4 py-1.5 gap-2 max-w-md w-full mx-4 bg-zinc-900 border border-zinc-800 rounded-full shadow-lg focus-within:border-brand-green-accent transition-all">
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

      <div className="flex items-center gap-6">
        <nav className="hidden lg:flex items-center gap-6 text-sm font-medium text-zinc-400">
          <Link to="/about" className="hover:text-white transition-colors">Tentang Kami</Link>
          <Link to="/faq" className="hover:text-white transition-colors">FAQ</Link>
          <Link to="/contact" className="hover:text-white transition-colors">Kontak</Link>
        </nav>
        {user ? (
          <Link to="/profile" className="flex items-center gap-2 group shrink-0">
            <img
              src={avatarSrc}
              alt="User Profile"
              className="w-9 h-9 rounded-full object-cover border border-white/20 group-hover:border-white transition-colors"
            />
            <span className="hidden lg:inline text-xs font-semibold text-white/95 group-hover:text-white transition-colors">
              {user.name}
            </span>
          </Link>
        ) : (
          <Link
            to="/login"
            className="bg-brand-green-accent hover:bg-brand-green-hover text-white text-xs md:text-sm font-semibold px-5 py-2 rounded-full shadow-sm shrink-0 transition-all duration-300"
          >
            Masuk
          </Link>
        )}
      </div>
    </header>
  );
}
