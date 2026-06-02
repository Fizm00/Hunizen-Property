import { FOOTER_COLUMNS, FOOTER_LEGAL_LINKS } from "../../constants";
import type { FooterColumn } from "../../types";
import { toSlug } from "../../utils/formatters";
import { Link } from "react-router-dom";

interface LinkColumnProps {
  column: FooterColumn;
}

function LinkColumn({ column }: LinkColumnProps) {
  return (
    <div className="flex flex-col gap-6 pr-4">
      <span className="text-[10px] font-bold text-zinc-500 tracking-widest">
        {column.title}
      </span>
      <ul className="flex flex-col gap-3.5">
        {column.links.map((link) => {
          if (link === "Tentang Kami") {
            return (
              <li key={link}>
                <Link
                  to="/about"
                  className="text-lg md:text-xl font-medium tracking-tight text-white hover:text-slate-300 transition-colors"
                >
                  {link}
                </Link>
              </li>
            );
          }
          if (link === "Pusat Bantuan") {
            return (
              <li key={link}>
                <Link
                  to="/faq"
                  className="text-lg md:text-xl font-medium tracking-tight text-white hover:text-slate-300 transition-colors"
                >
                  {link}
                </Link>
              </li>
            );
          }
          if (link === "Hubungi Kami") {
            return (
              <li key={link}>
                <Link
                  to="/contact"
                  className="text-lg md:text-xl font-medium tracking-tight text-white hover:text-slate-300 transition-colors"
                >
                  {link}
                </Link>
              </li>
            );
          }
          return (
            <li key={link}>
              <a
                href={toSlug(link)}
                className="text-lg md:text-xl font-medium tracking-tight text-white hover:text-slate-300 transition-colors"
              >
                {link}
              </a>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default function Footer() {
  const standardColumns = FOOTER_COLUMNS.slice(0, 4);
  const companyColumn = FOOTER_COLUMNS[4];

  return (
    <footer className="w-full bg-brand-green text-slate-400 pt-24 pb-12 px-6 md:px-12 flex flex-col items-center">
      <div className="w-full max-w-7xl">

        <div className="grid grid-cols-1 md:grid-cols-5 gap-y-12 md:gap-x-12 mb-12">

          <div className="md:col-span-4 flex flex-col justify-between gap-12">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-y-12 gap-x-6">
              {standardColumns.map((col) => (
                <LinkColumn key={col.title} column={col} />
              ))}
            </div>

            <div className="flex flex-col gap-8 pt-8">
              <div className="flex items-end gap-5 text-[#F4F3EC] leading-none select-none">
                <svg
                  className="w-24 h-24 md:w-40 md:h-40 text-[#F4F3EC] opacity-90 mb-1 md:mb-3 shrink-0"
                  viewBox="0 0 100 100"
                  fill="currentColor"
                >
                  <path d="M15 85 V 45 L 50 15 L 85 45 V 85 H 60 V 55 H 40 V 85 Z" />
                </svg>
                <h1 className="text-[12vw] font-bold leading-none tracking-tighter text-[#F4F3EC] opacity-90 font-sans">
                  Hunizen
                </h1>
              </div>

              <div className="flex items-center gap-3">
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-zinc-900 hover:bg-zinc-800 text-white flex items-center justify-center transition-colors border border-zinc-800/50 hover:text-amber-500"
                  aria-label="Instagram"
                >
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
                    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                  </svg>
                </a>
                <a
                  href="https://twitter.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-zinc-900 hover:bg-zinc-800 text-white flex items-center justify-center transition-colors border border-zinc-800/50 hover:text-sky-400"
                  aria-label="Twitter/X"
                >
                  <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                  </svg>
                </a>
                <a
                  href="https://facebook.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-zinc-900 hover:bg-zinc-800 text-white flex items-center justify-center transition-colors border border-zinc-800/50 hover:text-blue-500"
                  aria-label="Facebook"
                >
                  <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                    <path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.8c4.56-.93 8-4.96 8-9.8z" />
                  </svg>
                </a>
                <a
                  href="https://youtube.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-zinc-900 hover:bg-zinc-800 text-white flex items-center justify-center transition-colors border border-zinc-800/50 hover:text-red-500"
                  aria-label="Youtube"
                >
                  <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                    <path d="M23.498 6.163a3.003 3.003 0 0 0-2.11-2.108C19.524 3.545 12 3.545 12 3.545s-7.525 0-9.388.51a3.003 3.003 0 0 0-2.11 2.108C0 8.025 0 12 0 12s0 3.975.502 5.837a3.003 3.003 0 0 0 2.11 2.108C4.475 20.455 12 20.455 12 20.455s7.525 0 9.388-.51a3.002 3.002 0 0 0 2.11-2.108C24 15.975 24 12 24 12s0-3.975-.502-5.837zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                  </svg>
                </a>
              </div>
            </div>

          </div>

          <div className="flex flex-col gap-6 pr-4 justify-between min-h-[300px]">

            <LinkColumn column={companyColumn} />

            <div className="flex flex-col gap-2.5 mt-8 w-full">
              <Link
                to="/search"
                className="bg-[#F4F3EC] hover:bg-white text-brand-green text-center text-xs font-bold px-6 py-3.5 rounded-full transition-colors tracking-wide block"
              >
                CARI SEKARANG
              </Link>
              <Link
                to="/contact"
                className="bg-transparent hover:bg-white/5 border border-zinc-800 text-white text-center text-xs font-bold px-6 py-3.5 rounded-full transition-all tracking-wide block"
              >
                HUBUNGI SUPPORT
              </Link>
            </div>

            <div className="flex flex-col gap-2.5 text-[10px] font-bold text-zinc-500 tracking-wider mt-8">
              {FOOTER_LEGAL_LINKS.map((link) => (
                <a key={link} href={toSlug(link)} className="hover:text-slate-300 transition-colors">
                  {link}
                </a>
              ))}
              <span className="mt-4 block font-normal text-[9px] text-zinc-600">© HUNIZEN 2026</span>
            </div>

          </div>

        </div>

      </div>
    </footer>
  );
}
