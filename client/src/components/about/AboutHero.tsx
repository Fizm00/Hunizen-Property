import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";
import Navbar from "../layout/Navbar";
import aboutTeamMeeting from "../../assets/about_team_meeting.png";
import { HERO_CONTENT } from "../../constants/about";

export default function AboutHero() {
  return (
    <section className="relative w-full h-[400px] flex items-center bg-slate-900 overflow-hidden">
      <Navbar />

      <div className="absolute inset-0 z-0">
        <img 
          src={aboutTeamMeeting} 
          alt="Dark modern seating lounge" 
          className="w-full h-full object-cover opacity-70 filter brightness-90"
        />
        <div className="absolute inset-0 bg-black/50 backdrop-blur-[1px]" />
      </div>

      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 md:px-12 flex flex-col md:flex-row justify-between items-center mt-16">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <h1 className="text-4xl sm:text-5xl font-black text-white tracking-tight uppercase">
            {HERO_CONTENT.title}
          </h1>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="text-slate-300 text-sm font-semibold tracking-wider flex items-center gap-2 mt-4 md:mt-0"
        >
          {HERO_CONTENT.breadcrumbs.map((crumb, idx) => (
            <div key={idx} className="flex items-center gap-2">
              {idx > 0 && <ChevronRight className="w-4 h-4 text-slate-500" />}
              {crumb.isCurrent ? (
                <span className="text-white">{crumb.label}</span>
              ) : (
                <Link to={crumb.path} className="hover:text-emerald-400 transition-colors">
                  {crumb.label}
                </Link>
              )}
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
