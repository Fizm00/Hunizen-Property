import { Shield, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import adminPromoBg from "../../assets/banner_admin_promo.png";
import mainWhyImg from "../../assets/kost_banner.png";
import { WHY_CHOOSE_US_ITEMS, WHY_ICONS } from "../../constants";
import { scrollViewport, sectionTransition, slideInLeft, slideInRight } from "../../lib/animations";
import UnderlineText from "../ui/UnderlineText";
import FavoriteButton from "../ui/FavoriteButton";
import { useFavorites } from "../../hooks/useFavorites";

export default function Showcase() {
  const { toggleFavorite, isFavorited } = useFavorites();

  return (
    <section className="w-full bg-white pb-20 px-6 md:px-12 flex flex-col items-center">
      <div className="w-full max-w-7xl">

        {/* Banner: Dapatkan Potongan Admin */}
        <motion.div
          initial={{ y: 60, opacity: 0, filter: "blur(8px)" }}
          whileInView={{ y: 0, opacity: 1, filter: "blur(0px)" }}
          viewport={scrollViewport}
          transition={sectionTransition()}
          className="w-full bg-brand-green rounded-4xl md:rounded-[3rem] flex flex-col md:flex-row overflow-hidden shadow-xl mb-24 relative md:max-h-[420px]"
        >
          {/* Banner Left Image */}
          <div className="flex-1 relative min-h-[200px] md:min-h-full">
            <div className="absolute inset-0 bg-linear-to-r from-transparent via-brand-green/40 to-brand-green z-10 hidden md:block" />
            <div className="absolute inset-0 bg-linear-to-t from-transparent via-brand-green/40 to-brand-green z-10 block md:hidden" />
            <img src={adminPromoBg} alt="Promo Admin Illustration" className="w-full h-full object-cover" />
          </div>

          {/* Banner Right Content */}
          <div className="flex-1 p-8 md:p-12 lg:p-14 flex flex-col justify-center items-start md:items-end text-left md:text-right z-10">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight mb-3">
              Dapatkan Potongan Admin!
            </h2>
            <p className="text-slate-400 text-sm md:text-base mb-6 max-w-sm">
              Daftarkan segera usaha kost atau kontrakan anda sekarang juga dan nikmati diskon biaya admin di awal!
            </p>
            <a
              href="#daftar"
              className="bg-white text-brand-green font-bold px-8 py-3.5 rounded-full hover:bg-slate-200 transition-all duration-300 shadow-md"
            >
              Daftar
            </a>
          </div>
        </motion.div>

        {/* Why Choose Us Grid */}
        <div className="w-full">

          {/* Header */}
          <motion.div
            initial={{ y: 30, opacity: 0, filter: "blur(6px)" }}
            whileInView={{ y: 0, opacity: 1, filter: "blur(0px)" }}
            viewport={scrollViewport}
            transition={sectionTransition()}
            className="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-12 items-end"
          >
            <div className="lg:col-span-7">
              <h2 className="text-3xl md:text-5xl font-bold text-slate-800 tracking-tight leading-tight">
                Mengapa Harus Memilih<br />
                <UnderlineText>Layanan Hunizen?</UnderlineText>
              </h2>
            </div>
            <div className="lg:col-span-5">
              <p className="text-sm md:text-base text-slate-500 leading-relaxed">
                Kami berkomitmen menyediakan solusi pencarian hunian sementara terbaik, mengedepankan keamanan transaksi, kelengkapan fasilitas kamar, dan harga yang jujur tanpa biaya tersembunyi.
              </p>
            </div>
          </motion.div>

          {/* Asymmetrical Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">

            {/* Left Column: Big Card */}
            <motion.div
              variants={slideInLeft()}
              initial="hidden"
              whileInView="visible"
              viewport={scrollViewport}
              className="lg:col-span-7 relative h-[450px] lg:h-[550px] rounded-3xl overflow-hidden group shadow-md border border-slate-100/50"
            >
              <img src={mainWhyImg} alt="Keamanan Terjamin" className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-700" />

              <FavoriteButton
                isFavorited={isFavorited("security")}
                onToggle={() => toggleFavorite("security")}
              />

              {/* Bottom Details Overlay */}
              <div className="absolute bottom-6 left-6 right-6 bg-white/95 backdrop-blur-md rounded-2xl p-6 shadow-xl flex items-center justify-between z-10 border border-white/40">
                <div className="flex flex-col max-w-[80%]">
                  <div className="flex items-center gap-2 mb-1.5">
                    <Shield className="w-5 h-5 text-emerald-600" />
                    <span className="text-lg font-bold text-slate-800">Prioritas Keamanan 24/7</span>
                  </div>
                  <p className="text-xs text-slate-500 leading-relaxed">
                    Sistem keamanan kost terintegrasi dengan CCTV, penjagaan security, serta gerbang smart lock untuk memberikan rasa tenang maksimal selama Anda tinggal.
                  </p>
                </div>
                <button className="w-12 h-12 rounded-full bg-brand-green hover:bg-brand-green-hover text-white flex items-center justify-center transition-colors shadow-md shrink-0">
                  <ArrowRight className="w-5 h-5" />
                </button>
              </div>
            </motion.div>

            {/* Right Column: 2×2 Grid */}
            <motion.div
              variants={slideInRight()}
              initial="hidden"
              whileInView="visible"
              viewport={scrollViewport}
              className="lg:col-span-5 grid grid-cols-2 gap-4 h-auto lg:h-[550px]"
            >
              {WHY_CHOOSE_US_ITEMS.map((item) => {
                const { Icon, colorClass } = WHY_ICONS[item.id];

                return (
                  <div
                    key={item.id}
                    className="relative rounded-2xl overflow-hidden group shadow-sm border border-slate-100/50 h-40 sm:h-52 lg:h-auto"
                  >
                    <img src={item.img} alt={item.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />

                    <FavoriteButton
                      isFavorited={isFavorited(item.id)}
                      onToggle={() => toggleFavorite(item.id)}
                      size="sm"
                    />

                    {/* Hover Overlay */}
                    <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4 z-10">
                      <div className="flex items-center gap-1.5 text-white mb-1">
                        <Icon className={`w-5 h-5 ${colorClass}`} />
                        <span className="text-xs font-bold tracking-wide">{item.title}</span>
                      </div>
                      <p className="text-[10px] text-slate-300 leading-normal">{item.desc}</p>
                    </div>

                    {/* Default Bottom Banner */}
                    <div className="absolute bottom-3 left-3 right-3 bg-white/90 backdrop-blur-sm px-3 py-2 rounded-xl flex items-center gap-2 group-hover:opacity-0 transition-opacity duration-300 shadow-sm border border-white/20 z-10">
                      <Icon className={`w-5 h-5 ${colorClass}`} />
                      <span className="text-[11px] font-bold text-slate-700 truncate">{item.title}</span>
                    </div>
                  </div>
                );
              })}
            </motion.div>

          </div>
        </div>

      </div>
    </section>
  );
}
