import { Eye, X, ChevronLeft, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import type { PropertyDetail } from "../../types";

interface PropertyGalleryProps {
  property: PropertyDetail;
  showAllPhotos: boolean;
  setShowAllPhotos: (show: boolean) => void;
  activePhotoIdx: number;
  setActivePhotoIdx: (idx: number | ((prev: number) => number)) => void;
}

export default function PropertyGallery({
  property,
  showAllPhotos,
  setShowAllPhotos,
  activePhotoIdx,
  setActivePhotoIdx,
}: PropertyGalleryProps) {
  const images = property.gallery && property.gallery.length > 0 ? property.gallery : [property.img];

  return (
    <>
      <section className="relative w-full h-[320px] md:h-[480px] grid grid-cols-1 md:grid-cols-3 gap-3.5 rounded-[1.75rem] overflow-hidden bg-zinc-200">
        <div
          className="md:col-span-2 h-full overflow-hidden cursor-pointer relative"
          onClick={() => {
            setShowAllPhotos(true);
            setActivePhotoIdx(0);
          }}
        >
          <img
            src={images[0]}
            alt={property.title}
            className="w-full h-full object-cover hover:scale-[1.015] transition-transform duration-700"
          />
        </div>
        <div className="hidden md:grid grid-rows-2 gap-3.5 h-full">
          <div className="grid grid-cols-2 gap-3.5">
            <div
              className="overflow-hidden cursor-pointer"
              onClick={() => {
                setShowAllPhotos(true);
                setActivePhotoIdx(1);
              }}
            >
              <img
                src={images[1] || images[0]}
                className="w-full h-full object-cover hover:scale-103 transition-transform duration-500"
                alt=""
              />
            </div>
            <div
              className="overflow-hidden cursor-pointer"
              onClick={() => {
                setShowAllPhotos(true);
                setActivePhotoIdx(2);
              }}
            >
              <img
                src={images[2] || images[0]}
                className="w-full h-full object-cover hover:scale-103 transition-transform duration-500"
                alt=""
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3.5">
            <div
              className="overflow-hidden cursor-pointer"
              onClick={() => {
                setShowAllPhotos(true);
                setActivePhotoIdx(3);
              }}
            >
              <img
                src={images[3] || images[0]}
                className="w-full h-full object-cover hover:scale-103 transition-transform duration-500"
                alt=""
              />
            </div>
            <div
              className="overflow-hidden cursor-pointer relative"
              onClick={() => {
                setShowAllPhotos(true);
                setActivePhotoIdx(4);
              }}
            >
              <img
                src={images[4] || images[0]}
                className="w-full h-full object-cover hover:scale-103 transition-transform duration-500"
                alt=""
              />
              <div className="absolute inset-0 bg-black/35 flex items-center justify-center hover:bg-black/40 transition-colors">
                <span className="text-white text-sm font-bold tracking-wide">Lihat semua foto</span>
              </div>
            </div>
          </div>
        </div>

        <button
          onClick={() => setShowAllPhotos(true)}
          className="md:hidden absolute bottom-4 right-4 bg-black/60 backdrop-blur-md text-white text-xs font-bold px-3 py-1.5 rounded-full border border-white/10 flex items-center gap-1.5 shadow-lg cursor-pointer"
        >
          <Eye className="w-3.5 h-3.5" />
          <span>Lihat Semua Foto</span>
        </button>
      </section>

      <AnimatePresence>
        {showAllPhotos && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            data-lenis-prevent
            className="fixed inset-0 bg-black/98 z-50 flex flex-col justify-between p-6 select-none"
          >
            <div className="flex justify-between items-center w-full">
              <span className="text-sm font-bold text-zinc-400 tracking-wider">
                Foto {activePhotoIdx + 1} dari {images.length}
              </span>
              <button
                onClick={() => setShowAllPhotos(false)}
                className="w-10 h-10 rounded-full bg-zinc-900 text-zinc-400 hover:text-white flex items-center justify-center border border-zinc-800 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="flex items-center justify-between w-full h-[65vh] relative max-w-5xl mx-auto my-auto">
              <button
                onClick={() =>
                  setActivePhotoIdx((prev) => (prev > 0 ? prev - 1 : images.length - 1))
                }
                className="absolute left-2 z-10 w-12 h-12 rounded-full bg-zinc-900/60 border border-zinc-800 text-white flex items-center justify-center hover:bg-zinc-900 transition-colors cursor-pointer"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>

              <div className="w-full h-full flex items-center justify-center overflow-hidden px-12">
                <motion.img
                  key={activePhotoIdx}
                  initial={{ scale: 0.95, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.95, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  src={images[activePhotoIdx]}
                  alt={`Gallery Photo ${activePhotoIdx}`}
                  className="max-w-full max-h-full object-contain rounded-2xl"
                />
              </div>

              <button
                onClick={() =>
                  setActivePhotoIdx((prev) => (prev < images.length - 1 ? prev + 1 : 0))
                }
                className="absolute right-2 z-10 w-12 h-12 rounded-full bg-zinc-900/60 border border-zinc-800 text-white flex items-center justify-center hover:bg-zinc-900 transition-colors cursor-pointer"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            </div>

            <div className="flex items-center justify-center gap-3.5 overflow-x-auto py-4 max-w-2xl mx-auto w-full hide-scrollbar">
              {images.map((img, idx) => (
                <div
                  key={idx}
                  onClick={() => setActivePhotoIdx(idx)}
                  className={`w-16 h-12 shrink-0 rounded-lg overflow-hidden cursor-pointer border-2 transition-all ${
                    idx === activePhotoIdx
                      ? "border-[#F4F3EC] scale-105"
                      : "border-zinc-800 opacity-50 hover:opacity-100"
                  }`}
                >
                  <img src={img} className="w-full h-full object-cover" alt="" />
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
