import { Star, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import type { ReviewItem } from "../../types";

interface PropertyReviewsProps {
  rating: number;
  reviewsList: ReviewItem[];
  showAllReviews: boolean;
  setShowAllReviews: (show: boolean) => void;
}

export default function PropertyReviews({
  rating,
  reviewsList,
  showAllReviews,
  setShowAllReviews,
}: PropertyReviewsProps) {
  return (
    <div className="pt-8 pb-4 flex flex-col gap-6">
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-bold text-slate-800 flex items-center gap-1.5">
          <span>Reviews</span>
          <span className="flex items-center gap-0.5 text-sm font-extrabold text-amber-500 bg-amber-500/10 px-2 py-0.5 rounded">
            <Star className="w-3.5 h-3.5 fill-amber-500 stroke-amber-500" />
            {rating.toFixed(1)}
          </span>
        </h2>
      </div>

      {/* Metrics Rating Progress Bars */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-4">
        {[
          { label: "Kebersihan", score: 5.0 },
          { label: "Kenyamanan", score: 5.0 },
          { label: "Keamanan", score: 5.0 },
          { label: "Harga", score: 5.0 },
          { label: "Fasilitas Kamar", score: 5.0 },
          { label: "Fasilitas Umum", score: 5.0 },
        ].map((metric) => (
          <div key={metric.label} className="flex flex-col gap-1.5">
            <div className="flex justify-between items-center text-sm font-bold text-slate-600">
              <span>{metric.label}</span>
              <span>{metric.score.toFixed(1)}</span>
            </div>
            <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
              <div
                className="h-full bg-amber-400 rounded-full"
                style={{ width: `${(metric.score / 5) * 100}%` }}
              />
            </div>
          </div>
        ))}
      </div>

      <div className="h-px bg-slate-100 w-full" />

      {/* Reviews List */}
      <div className="flex flex-col gap-6">
        {reviewsList.map((rev, i) => (
          <div key={i} className="flex flex-col gap-3">
            <div className="flex items-center gap-3">
              <img
                src={rev.avatar}
                alt={rev.name}
                className="w-10 h-10 rounded-full border border-slate-200 bg-slate-50"
              />
              <div>
                <span className="font-bold text-slate-800 text-sm block">{rev.name}</span>
                <span className="text-xs text-slate-400 font-semibold block">{rev.date}</span>
              </div>
            </div>
            <p className="text-sm text-slate-500 font-semibold leading-relaxed">{rev.content}</p>
          </div>
        ))}

        <button
          onClick={() => setShowAllReviews(true)}
          className="w-full py-2.5 border border-slate-200 rounded-xl text-sm font-extrabold text-slate-600 hover:bg-slate-50 transition-colors mt-2 cursor-pointer bg-white"
        >
          Show All Reviews
        </button>
      </div>

      {/* Review Modal overlay */}
      <AnimatePresence>
        {showAllReviews && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            data-lenis-prevent
            className="fixed inset-0 bg-black/45 backdrop-blur-md z-50 flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.95, y: 15 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 15 }}
              className="bg-white rounded-3xl w-full max-w-lg overflow-hidden shadow-2xl flex flex-col max-h-[85vh]"
            >
              {/* Modal header */}
              <div className="flex justify-between items-center p-5 border-b border-slate-100">
                <h3 className="font-extrabold text-slate-800 text-lg">Semua Review</h3>
                <button
                  onClick={() => setShowAllReviews(false)}
                  className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 flex items-center justify-center transition-colors cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Reviews body list */}
              <div className="p-5 grow overflow-y-auto flex flex-col gap-6 custom-scrollbar">
                {reviewsList.map((rev, i) => (
                  <div
                    key={i}
                    className="flex flex-col gap-2.5 pb-6 border-b border-slate-100/60 last:border-b-0 last:pb-0"
                  >
                    <div className="flex items-center gap-3">
                      <img
                        src={rev.avatar}
                        alt={rev.name}
                        className="w-9 h-9 rounded-full border border-slate-200 bg-slate-50"
                      />
                      <div>
                        <span className="font-bold text-slate-800 text-sm block">{rev.name}</span>
                        <span className="text-xs text-slate-400 font-semibold block">{rev.date}</span>
                      </div>
                    </div>
                    <div className="flex gap-0.5 text-amber-500 my-0.5">
                      {Array.from({ length: rev.rating }).map((_, idx) => (
                        <Star key={idx} className="w-3.5 h-3.5 fill-amber-500 stroke-amber-500" />
                      ))}
                    </div>
                    <p className="text-sm text-slate-500 font-semibold leading-relaxed">{rev.content}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
