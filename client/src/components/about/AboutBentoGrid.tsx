import { motion } from "framer-motion";
import heroBg from "../../assets/hero_bg_indoor_kost.png";
import heroBgWaterfront from "../../assets/hero_bg_waterfront.png";
import promoKost1 from "../../assets/promo_kost_1.png";
import recomKost1 from "../../assets/recom_kost_1.png";
import aboutTeamMeeting from "../../assets/about_team_meeting.png";
import aboutAnalyticsDesk from "../../assets/about_analytics_desk.png";
import { BENTO_HEADER, BENTO_CARDS } from "../../constants/about";
import { scrollViewport } from "../../lib/animations";

export default function AboutBentoGrid() {
  return (
    <section className="w-full py-24 px-6 md:px-12 bg-white flex justify-center">
      <div className="w-full max-w-7xl flex flex-col gap-12">
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={scrollViewport}
          transition={{ duration: 0.6 }}
          className="flex flex-col gap-3"
        >
          <span className="text-xs font-black text-brand-green uppercase tracking-widest">
            {BENTO_HEADER.tag}
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-slate-800 tracking-tight leading-tight">
            {BENTO_HEADER.title}
          </h2>
          <div className="w-16 h-1.5 bg-brand-green rounded-full" />
        </motion.div>

        {/* Bento Grid Layout - Perfectly aligned 4-column grid with NO empty spaces */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6 auto-rows-[180px]">
          
          {/* Bento Card 1: Large Image (span col-2, row-2) */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={scrollViewport}
            transition={{ duration: 0.8 }}
            className="md:col-span-2 md:row-span-2 rounded-[2rem] overflow-hidden relative group shadow-md min-h-[380px]"
          >
            <img 
              src={heroBg} 
              alt="Premium Cozy Bedroom" 
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />
            <div className="absolute bottom-8 left-8 right-8 text-white flex flex-col gap-2">
              <span className="bg-emerald-400 text-[#0F2C20] px-2.5 py-1 rounded font-black text-[10px] uppercase tracking-widest self-start shadow-sm">
                {BENTO_CARDS.card1.tag}
              </span>
              <h3 className="text-xl font-bold">{BENTO_CARDS.card1.title}</h3>
              <p className="text-slate-350 text-xs md:text-sm leading-relaxed max-w-lg font-light">
                {BENTO_CARDS.card1.desc}
              </p>
            </div>
          </motion.div>

          {/* Bento Card 2: Stat Box 1 (col-span-1, row-span-1) - Image Background */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={scrollViewport}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="rounded-[2rem] overflow-hidden relative group shadow-md"
          >
            <img 
              src={heroBgWaterfront} 
              alt="Kota Layanan" 
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
            />
            <div className="absolute inset-0 bg-black/60 group-hover:bg-black/50 transition-colors duration-300" />
            <div className="absolute inset-0 p-6 flex flex-col justify-center items-start text-white">
              <span className="text-3xl font-black text-emerald-400">{BENTO_CARDS.card2.value}</span>
              <h4 className="text-xs font-bold mt-1 uppercase tracking-wide">{BENTO_CARDS.card2.title}</h4>
              <p className="text-slate-300 text-[10px] mt-0.5 leading-tight font-light">
                {BENTO_CARDS.card2.desc}
              </p>
            </div>
          </motion.div>

          {/* Bento Card 3: Stat Box 2 (col-span-1, row-span-1) - Image Background */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={scrollViewport}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="rounded-[2rem] overflow-hidden relative group shadow-md"
          >
            <img 
              src={promoKost1} 
              alt="Hunian Tersewa" 
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
            />
            <div className="absolute inset-0 bg-black/60 group-hover:bg-black/50 transition-colors duration-300" />
            <div className="absolute inset-0 p-6 flex flex-col justify-center items-start text-white">
              <span className="text-3xl font-black text-emerald-400">{BENTO_CARDS.card3.value}</span>
              <h4 className="text-xs font-bold mt-1 uppercase tracking-wide">{BENTO_CARDS.card3.title}</h4>
              <p className="text-slate-300 text-[10px] mt-0.5 leading-tight font-light">
                {BENTO_CARDS.card3.desc}
              </p>
            </div>
          </motion.div>

          {/* Bento Card 6: Small Image Card (col-span-1, row-span-1) */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={scrollViewport}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="rounded-[2rem] overflow-hidden relative group shadow-md"
          >
            <img 
              src={aboutAnalyticsDesk} 
              alt="Workspace" 
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
            />
            <div className="absolute inset-0 bg-black/45 group-hover:bg-black/30 transition-colors duration-300" />
            <div className="absolute inset-0 flex items-center justify-center p-4">
              <span className="text-white text-xs font-black uppercase tracking-wider text-center border-b-2 border-emerald-400 pb-1">
                {BENTO_CARDS.card6.title}
              </span>
            </div>
          </motion.div>

          {/* Bento Card 4: Vertical Image (col-span-1, row-span-2) */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={scrollViewport}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="md:col-span-1 md:row-span-2 rounded-[2rem] overflow-hidden relative group shadow-md min-h-[380px]"
          >
            <img 
              src={recomKost1} 
              alt="Akses Lokasi Strategis" 
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/35 to-transparent" />
            <div className="absolute bottom-8 left-6 right-6 text-white flex flex-col gap-2">
              <span className="bg-white text-slate-900 px-2.5 py-1 rounded font-black text-[10px] uppercase tracking-widest self-start shadow-sm">
                {BENTO_CARDS.card4.tag}
              </span>
              <h3 className="text-base font-bold">{BENTO_CARDS.card4.title}</h3>
              <p className="text-slate-300 text-[11px] leading-relaxed font-light">
                {BENTO_CARDS.card4.desc}
              </p>
            </div>
          </motion.div>

          {/* Bento Card 5: Horizontal Image Card (col-span-3, row-span-1) */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={scrollViewport}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="md:col-span-3 md:row-span-1 rounded-[2rem] overflow-hidden relative group shadow-md"
          >
            <img 
              src={aboutTeamMeeting} 
              alt="Visi Misi Background" 
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
            />
            <div className="absolute inset-0 bg-black/70 group-hover:bg-black/60 transition-colors duration-300" />
            <div className="absolute inset-0 p-8 flex flex-col justify-center text-white">
              <h4 className="text-sm font-extrabold text-emerald-400 uppercase tracking-wide">{BENTO_CARDS.card5.title}</h4>
              <p className="text-slate-300 text-xs md:text-sm mt-2 leading-relaxed font-light max-w-4xl">
                {BENTO_CARDS.card5.desc}
              </p>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
