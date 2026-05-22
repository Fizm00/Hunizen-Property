import { motion } from "framer-motion";
import { Search } from "lucide-react";
import Navbar from "../layout/Navbar";
import { FAQ_HERO_CONTENT } from "../../constants/faq";
import aboutAnalyticsDesk from "../../assets/about_analytics_desk.png";

interface FaqHeroProps {
  searchQuery: string;
  setSearchQuery: (val: string) => void;
}

export default function FaqHero({ searchQuery, setSearchQuery }: FaqHeroProps) {
  return (
    <section className="relative w-full h-[450px] md:h-[500px] flex items-center justify-center bg-zinc-950 overflow-hidden px-6 text-center">
      {/* Transparent Navbar on Top */}
      <Navbar />

      {/* Background Image with Dark Overlay (Aksen Gelap) */}
      <div className="absolute inset-0 z-0 select-none pointer-events-none">
        <img 
          src={aboutAnalyticsDesk} 
          alt="Support background" 
          className="w-full h-full object-cover opacity-60 filter brightness-[0.85] contrast-[1.02]"
        />
        <div className="absolute inset-0 bg-black/60 backdrop-blur-[1px]" />
      </div>

      {/* Decorative Blur Glows */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] h-[350px] bg-zinc-800/10 rounded-full blur-[100px] pointer-events-none" />

      {/* Content Container */}
      <div className="relative z-10 w-full max-w-3xl mx-auto flex flex-col items-center gap-5 mt-12">
        <motion.span 
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-xs font-black text-zinc-400 uppercase tracking-widest"
        >
          {FAQ_HERO_CONTENT.tag}
        </motion.span>
        
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight uppercase leading-[1.1] max-w-2xl"
        >
          {FAQ_HERO_CONTENT.title}
        </motion.h1>
        
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-slate-300 text-xs sm:text-sm font-light leading-relaxed max-w-xl"
        >
          {FAQ_HERO_CONTENT.desc}
        </motion.p>

        {/* Search Box */}
        <motion.div 
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="w-full max-w-md relative mt-2 group"
        >
          <div className="absolute inset-0 bg-zinc-800/10 rounded-full blur-md opacity-0 group-focus-within:opacity-100 transition-opacity duration-300" />
          <div className="relative flex items-center">
            <Search className="absolute left-5 w-5 h-5 text-slate-400 group-focus-within:text-zinc-300 transition-colors" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={FAQ_HERO_CONTENT.searchPlaceholder}
              className="w-full bg-zinc-900/60 border border-zinc-800 focus:border-zinc-700 focus:outline-none rounded-full py-3.5 pl-14 pr-6 text-sm text-white placeholder-slate-400 transition-all duration-300"
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
