import { useState, useEffect } from "react";
import { 
  Star, 
  MessageSquare, 
  AlertCircle, 
  Send,
  Building,
  Calendar,
  User
} from "lucide-react";
import { propertyService, type ApiReview } from "../../services/propertyService";
import { reviewService } from "../../services/reviewService";
import type { UserReviewItem } from "../../types/profile";
import type { SearchKostCard } from "../../types";
import { showAlert, showToast } from "../../utils/alerts";

export function ProfileReviews() {
  const [reviews, setReviews] = useState<UserReviewItem[]>([]);
  const [properties, setProperties] = useState<SearchKostCard[]>([]);
  const [selectedPropertyId, setSelectedPropertyId] = useState("");
  const [rating, setRating] = useState(5);
  const [hoverRating, setHoverRating] = useState<number | null>(null);
  const [comment, setComment] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    async function loadData() {
      setLoading(true);
      try {
        const props = await propertyService.getSearchProperties();
        if (isMounted) {
          setProperties(props);
          if (props.length > 0) {
            setSelectedPropertyId(props[0].id);
          }
        }

        const userSaved = localStorage.getItem("user");
        const currentUser = userSaved ? JSON.parse(userSaved) : null;
        
        if (currentUser) {
          const reviewsPromises = props.map((p) => 
            reviewService.getPropertyReviews(p.id).catch(() => [])
          );
          const allReviewsLists = await Promise.all(reviewsPromises);
          
          const tenantReviews: UserReviewItem[] = [];
          
          allReviewsLists.forEach((reviewList, idx) => {
            const prop = props[idx];
            reviewList.forEach((r: ApiReview) => {
              if (r.tenant?._id === currentUser.id || r.tenant === currentUser.id) {
                tenantReviews.push({
                  id: r._id,
                  propertyName: prop.title,
                  roomName: "Standard Room",
                  rating: r.rating,
                  date: r.createdAt 
                    ? new Date(r.createdAt).toLocaleDateString("id-ID", { day: "numeric", month: "long", year: "numeric" }) 
                    : "1 Juni 2026",
                  comment: r.comment,
                  landlordReply: r.landlordReply,
                });
              }
            });
          });

          if (isMounted) {
            setReviews(tenantReviews);
          }
        }
      } catch (err) {
        console.error("Gagal memuat ulasan:", err);
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    }
    loadData();
    return () => {
      isMounted = false;
    };
  }, []);

  const handleSubmitReview = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!comment.trim()) {
      showToast("warning", "Tuliskan komentar ulasan Anda terlebih dahulu!");
      return;
    }

    if (!selectedPropertyId) {
      showToast("warning", "Pilih properti terlebih dahulu!");
      return;
    }

    const res = await reviewService.createReview({
      property: selectedPropertyId,
      rating,
      comment: comment.trim(),
    });

    if (res.success) {
      const userSaved = localStorage.getItem("user");
      const currentUser = userSaved ? JSON.parse(userSaved) : null;
      
      if (currentUser) {
        const reviewsPromises = properties.map((p) => 
          reviewService.getPropertyReviews(p.id).catch(() => [])
        );
        const allReviewsLists = await Promise.all(reviewsPromises);
        
        const tenantReviews: UserReviewItem[] = [];
        allReviewsLists.forEach((reviewList, idx) => {
          const prop = properties[idx];
          reviewList.forEach((r: ApiReview) => {
            if (r.tenant?._id === currentUser.id || r.tenant === currentUser.id) {
              tenantReviews.push({
                id: r._id,
                propertyName: prop.title,
                roomName: "Standard Room",
                rating: r.rating,
                date: r.createdAt 
                  ? new Date(r.createdAt).toLocaleDateString("id-ID", { day: "numeric", month: "long", year: "numeric" }) 
                  : "1 Juni 2026",
                comment: r.comment,
                landlordReply: r.landlordReply,
              });
            }
          });
        });
        setReviews(tenantReviews);
      }

      setComment("");
      setRating(5);

      const propObj = properties.find((p) => p.id === selectedPropertyId);
      showAlert(
        "success",
        "Ulasan Terkirim",
        `Terima kasih! Ulasan Anda untuk ${propObj?.title || "properti"} berhasil dipublikasikan.`
      );
    } else {
      showAlert("error", "Gagal Mengirim", res.message || "Gagal mengirimkan ulasan.");
    }
  };

  const totalReviews = reviews.length;
  const averageRating = totalReviews > 0 
    ? (reviews.reduce((acc, r) => acc + r.rating, 0) / totalReviews).toFixed(1)
    : "0.0";

  const ratingBreakdown = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 };
  reviews.forEach((r) => {
    if (r.rating >= 1 && r.rating <= 5) {
      ratingBreakdown[r.rating as 5 | 4 | 3 | 2 | 1]++;
    }
  });

  if (loading) {
    return (
      <div className="flex items-center justify-center p-12">
        <div className="flex flex-col items-center gap-3">
          <div className="w-8 h-8 border-4 border-zinc-300 border-t-brand-green rounded-full animate-spin" />
          <span className="text-xs text-slate-500 font-semibold">Memuat ulasan...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6">
      
      <div className="flex flex-col gap-1.5">
        <h3 className="font-extrabold text-slate-800 text-lg md:text-xl flex items-center gap-2">
          <MessageSquare className="w-5 h-5 text-brand-green" />
          <span>Ulasan Saya</span>
        </h3>
        <p className="text-xs text-slate-400 font-light leading-relaxed">
          Tulis ulasan pengalaman menginap Anda dan kelola histori ulasan properti yang pernah Anda sewa.
        </p>
      </div>

      <div className="w-full h-px bg-slate-100" />

      <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5 grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
        
        <div className="md:col-span-4 flex flex-col items-center justify-center text-center border-b md:border-b-0 md:border-r border-slate-200 pb-5 md:pb-0 md:pr-5 shrink-0">
          <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Rata-rata Rating</span>
          <span className="text-5xl font-black text-slate-800 tracking-tight my-1">
            {averageRating}
          </span>
          <div className="flex gap-1 text-amber-500 my-1">
            {[1, 2, 3, 4, 5].map((star) => (
              <Star 
                key={star} 
                className={`w-4 h-4 ${star <= Math.round(Number(averageRating)) ? "fill-amber-500 text-amber-500" : "text-slate-300"}`} 
              />
            ))}
          </div>
          <span className="text-[11px] text-slate-500 font-semibold mt-1">
            Berdasarkan {totalReviews} Ulasan Anda
          </span>
        </div>

        <div className="md:col-span-8 flex flex-col gap-2 grow">
          {[5, 4, 3, 2, 1].map((stars) => {
            const count = ratingBreakdown[stars as 5 | 4 | 3 | 2 | 1];
            const percentage = totalReviews > 0 ? (count / totalReviews) * 100 : 0;
            return (
              <div key={stars} className="flex items-center gap-3 text-xs font-semibold text-slate-600">
                <div className="flex items-center gap-1 w-10 shrink-0">
                  <span className="font-bold text-slate-700">{stars}</span>
                  <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
                </div>
                <div className="grow h-2 bg-slate-200 rounded overflow-hidden border border-slate-350">
                  <div 
                    className="h-full bg-brand-green rounded"
                    style={{ width: `${percentage}%` }}
                  />
                </div>
                <span className="w-8 text-right font-extrabold text-slate-800">{count}</span>
              </div>
            );
          })}
        </div>

      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        <form onSubmit={handleSubmitReview} className="lg:col-span-5 bg-white border border-slate-200 rounded-2xl p-5 flex flex-col gap-4 shadow-sm">
          <div className="flex flex-col gap-1">
            <h4 className="font-extrabold text-slate-850 text-sm">
              Tulis Ulasan Baru
            </h4>
            <p className="text-[11px] text-slate-400 font-light">
              Bagikan pengalaman Anda selama menyewa properti ini.
            </p>
          </div>

          <div className="flex flex-col gap-1.5">
            <label htmlFor="review-property" className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">
              Pilih Properti Kost
            </label>
            <select
              id="review-property"
              value={selectedPropertyId}
              onChange={(e) => setSelectedPropertyId(e.target.value)}
              className="w-full text-xs font-semibold text-slate-700 border border-slate-250 rounded-xl p-3 focus:outline-none focus:border-brand-green focus:ring-1 focus:ring-brand-green/20 bg-white"
            >
              {properties.map((p) => (
                <option key={p.id} value={p.id}>{p.title}</option>
              ))}
            </select>
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">
              Berikan Rating
            </label>
            <div className="flex gap-2 py-1 items-center">
              {[1, 2, 3, 4, 5].map((star) => {
                const isSelected = star <= (hoverRating !== null ? hoverRating : rating);
                return (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setRating(star)}
                    onMouseEnter={() => setHoverRating(star)}
                    onMouseLeave={() => setHoverRating(null)}
                    className="cursor-pointer transition-transform active:scale-95"
                  >
                    <Star 
                      className={`w-7 h-7 ${isSelected ? "fill-amber-500 text-amber-500" : "text-slate-300"}`} 
                    />
                  </button>
                );
              })}
              <span className="text-xs text-slate-500 font-extrabold ml-2 bg-slate-50 border border-slate-200 px-2 py-0.5 rounded">
                {rating} / 5 Bintang
              </span>
            </div>
          </div>

          <div className="flex flex-col gap-1.5">
            <label htmlFor="review-comment" className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">
              Tulis Komentar / Ulasan
            </label>
            <textarea
              id="review-comment"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Bagaimana kondisi kamar, pelayanan pengelola, aksesibilitas, dan suasana lingkungan sekitar kost?"
              required
              rows={5}
              className="w-full text-xs font-semibold text-slate-700 placeholder:text-slate-400 border border-slate-250 rounded-xl p-3 focus:outline-none focus:border-brand-green focus:ring-1 focus:ring-brand-green/20 bg-white resize-none"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-brand-green hover:bg-brand-green-hover text-white text-xs font-bold py-3 px-4 rounded-xl flex items-center justify-center gap-1.5 transition-colors cursor-pointer border border-brand-green shadow-sm"
          >
            <Send className="w-3.5 h-3.5" />
            <span>Kirim Ulasan</span>
          </button>
        </form>

        <div className="lg:col-span-7 flex flex-col gap-4 self-stretch">
          <h4 className="font-extrabold text-slate-850 text-sm">
            Riwayat Ulasan Anda
          </h4>

          <div className="flex flex-col gap-4 max-h-[580px] overflow-y-auto pr-1">
            {reviews.length === 0 ? (
              <div className="flex flex-col items-center justify-center text-center p-12 border border-dashed border-slate-200 rounded-2xl bg-slate-50 gap-3">
                <AlertCircle className="w-8 h-8 text-slate-400" />
                <span className="text-xs text-slate-400 font-medium">Anda belum pernah memberikan ulasan.</span>
              </div>
            ) : (
              reviews.map((item) => (
                <div 
                  key={item.id}
                  className="bg-white border border-slate-200 rounded-2xl p-5 flex flex-col gap-3.5 text-xs text-slate-655 relative shadow-sm"
                >
                  
                  <div className="flex justify-between items-start gap-4">
                    <div className="flex flex-col gap-0.5">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="text-[8px] font-black text-brand-green bg-brand-green-light px-1.5 py-0.5 rounded border border-brand-green/10 uppercase tracking-wider">
                          {item.id}
                        </span>
                        <span className="text-[10px] text-slate-400 font-bold flex items-center gap-1">
                          <Calendar className="w-3 h-3 text-slate-400" />
                          {item.date}
                        </span>
                      </div>
                      <h5 className="font-extrabold text-slate-850 text-xs sm:text-sm mt-1 leading-snug">
                        {item.propertyName}
                      </h5>
                      <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wide flex items-center gap-1 mt-0.5">
                        <Building className="w-3 h-3 text-slate-350" />
                        {item.roomName}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-1 py-0.5 px-2 bg-amber-50 text-amber-700 border border-amber-200 rounded w-max">
                    <div className="flex">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star 
                          key={star} 
                          className={`w-3 h-3 ${star <= item.rating ? "fill-amber-500 text-amber-500" : "text-slate-300"}`} 
                        />
                      ))}
                    </div>
                    <span className="text-[10px] font-extrabold ml-1 pt-0.5">{item.rating} / 5</span>
                  </div>

                  <p className="text-slate-700 font-medium leading-relaxed bg-slate-50 border border-slate-200 rounded-xl p-3.5">
                    "{item.comment}"
                  </p>
                  {item.landlordReply && (
                    <div className="bg-brand-green-light border border-brand-green/10 rounded-xl p-4 flex flex-col gap-1 ml-4 border-l-4 border-l-brand-green">
                      <div className="flex items-center gap-1.5">
                        <User className="w-3.5 h-3.5 text-brand-green animate-none" />
                        <span className="text-[9px] text-brand-green font-black uppercase tracking-wider">
                          Tanggapan Pengelola Kost
                        </span>
                      </div>
                      <p className="text-slate-700 font-semibold leading-relaxed pl-5">
                        "{item.landlordReply}"
                      </p>
                    </div>
                  )}

                </div>
              ))
            )}
          </div>

        </div>

      </div>

    </div>
  );
}
