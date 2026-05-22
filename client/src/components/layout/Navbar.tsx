import { Home, Menu, X } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { NAV_ITEMS } from "../../constants";
import { toSlug } from "../../utils/formatters";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const closeMenu = () => setIsOpen(false);

  return (
    <>
      <nav className="absolute top-0 left-0 w-full bg-transparent px-6 md:px-12 py-6 flex items-center justify-between z-50">

        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 group">
          <div className="text-white">
            <Home className="w-6 h-6 md:w-7 md:h-7" strokeWidth={2.5} />
          </div>
          <span className="font-bold text-xl md:text-2xl tracking-tight text-white">
            Hunizen
          </span>
        </Link>

        {/* Right Side */}
        <div className="flex items-center gap-4 md:gap-10">

          {/* Desktop Links */}
          <div className="hidden md:flex items-center gap-8">
            {NAV_ITEMS.map((item) => {
              if (item === "Kost & Kontrakan") {
                return (
                  <Link
                    key={item}
                    to="/search"
                    className="text-sm font-medium text-slate-300 hover:text-white transition-colors"
                  >
                    {item}
                  </Link>
                );
              }
              if (item === "Tentang Kami") {
                return (
                  <Link
                    key={item}
                    to="/about"
                    className="text-sm font-medium text-slate-300 hover:text-white transition-colors"
                  >
                    {item}
                  </Link>
                );
              }
              if (item === "FAQ") {
                return (
                  <Link
                    key={item}
                    to="/faq"
                    className="text-sm font-medium text-slate-300 hover:text-white transition-colors"
                  >
                    {item}
                  </Link>
                );
              }
              if (item === "Kontak") {
                return (
                  <Link
                    key={item}
                    to="/contact"
                    className="text-sm font-medium text-slate-300 hover:text-white transition-colors"
                  >
                    {item}
                  </Link>
                );
              }
              return (
                <a
                  key={item}
                  href={toSlug(item)}
                  className="text-sm font-medium text-slate-300 hover:text-white transition-colors"
                >
                  {item}
                </a>
              );
            })}
          </div>

          {/* Login Button */}
          <Link
            to="/login"
            className="bg-white/10 backdrop-blur-md border border-white/20 text-white hover:bg-white hover:text-black text-sm font-semibold px-5 md:px-6 py-2 md:py-2.5 rounded-full transition-all duration-300"
          >
            Masuk
          </Link>

          {/* Hamburger (Mobile) */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="flex md:hidden text-white p-1 hover:bg-white/10 rounded-lg transition-colors z-50"
            aria-label="Toggle Menu"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>

        </div>
      </nav>

      {/* Mobile Drawer Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-brand-green/98 backdrop-blur-md z-40 flex flex-col justify-center items-center p-6 md:hidden"
          >
            <div className="flex flex-col items-center gap-8 text-center">
              {NAV_ITEMS.map((item) => {
                if (item === "Kost & Kontrakan") {
                  return (
                    <Link
                      key={item}
                      to="/search"
                      onClick={closeMenu}
                      className="text-2xl font-bold text-slate-200 hover:text-white transition-colors tracking-tight"
                    >
                      {item}
                    </Link>
                  );
                }
                if (item === "Tentang Kami") {
                  return (
                    <Link
                      key={item}
                      to="/about"
                      onClick={closeMenu}
                      className="text-2xl font-bold text-slate-200 hover:text-white transition-colors tracking-tight"
                    >
                      {item}
                    </Link>
                  );
                }
                if (item === "FAQ") {
                  return (
                    <Link
                      key={item}
                      to="/faq"
                      onClick={closeMenu}
                      className="text-2xl font-bold text-slate-200 hover:text-white transition-colors tracking-tight"
                    >
                      {item}
                    </Link>
                  );
                }
                if (item === "Kontak") {
                  return (
                    <Link
                      key={item}
                      to="/contact"
                      onClick={closeMenu}
                      className="text-2xl font-bold text-slate-200 hover:text-white transition-colors tracking-tight"
                    >
                      {item}
                    </Link>
                  );
                }
                return (
                  <a
                    key={item}
                    href={toSlug(item)}
                    onClick={closeMenu}
                    className="text-2xl font-bold text-slate-200 hover:text-white transition-colors tracking-tight"
                  >
                    {item}
                  </a>
                );
              })}
              <Link
                to="/login"
                onClick={closeMenu}
                className="mt-4 bg-white text-black text-base font-bold px-8 py-3 rounded-full shadow-lg text-center"
              >
                Masuk ke Akun
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
