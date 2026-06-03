import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { 
  Clock, 
  CheckCircle2, 
  XCircle, 
  MapPin, 
  Calendar,
  MessageSquare,
  CreditCard,
  Search,
  AlertCircle
} from "lucide-react";
import { bookingService } from "../../services/bookingService";
import type { RentHistoryItem } from "../../types/profile";
import { showAlert } from "../../utils/alerts";

export function ProfileRentHistory() {
  const [rentHistory, setRentHistory] = useState<RentHistoryItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    async function loadHistory() {
      setLoading(true);
      try {
        const bookings = await bookingService.getMyBookings();
        if (isMounted) {
          const mapped = bookings.map((b) => {
            const prop = b.property;
            const mappedStatus = b.status === "disetujui" 
              ? "disetujui" 
              : b.status === "ditolak" 
              ? "ditolak" 
              : "pending";

            return {
              id: b._id,
              propertyName: prop?.title || "Kost Hunizen",
              propertyImage: prop?.gallery?.[0] || "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?auto=format&fit=crop&q=80&w=600",
              location: prop?.location || "Jakarta Selatan",
              applyDate: b.createdAt 
                ? new Date(b.createdAt).toLocaleDateString("id-ID", { day: "numeric", month: "short", year: "numeric" }) 
                : "1 Mei 2026",
              startDate: b.startDate 
                ? new Date(b.startDate).toLocaleDateString("id-ID", { day: "numeric", month: "short", year: "numeric" }) 
                : "-",
              duration: `${b.durationMonths || 1} Bulan`,
              price: `Rp ${(b.totalPayment || prop?.priceVal || 0).toLocaleString("id-ID")}`,
              status: mappedStatus as "disetujui" | "pending" | "ditolak",
              roomType: b.roomType || "Standard Room",
              landlordPhone: prop?.host?.phone || "+6287766554433",
            };
          });
          setRentHistory(mapped);
        }
      } catch (err) {
        console.error("Gagal memuat histori sewa:", err);
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    }
    loadHistory();
    return () => {
      isMounted = false;
    };
  }, []);

  const handleContactLandlord = (phone: string, propertyName: string) => {
    const text = `Halo, saya ingin menanyakan perihal status pengajuan sewa saya untuk ${propertyName}.`;
    const cleanPhone = phone.replace(/[^0-9]/g, "").replace(/^0/, "62");
    const url = `https://wa.me/${cleanPhone}?text=${encodeURIComponent(text)}`;
    window.open(url, "_blank");
  };

  const handlePayment = (id: string, price: string) => {
    showAlert(
      "success",
      "Melanjutkan Pembayaran",
      `Mengalihkan Anda ke gerbang pembayaran transaksi sewa ${id} dengan total ${price}.`
    );
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center p-12">
        <div className="flex flex-col items-center gap-3">
          <div className="w-8 h-8 border-4 border-zinc-300 border-t-brand-green rounded-full animate-spin" />
          <span className="text-xs text-slate-500 font-semibold">Memuat riwayat sewa...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-1.5">
        <h3 className="font-extrabold text-slate-800 text-lg md:text-xl">
          Riwayat Pengajuan Sewa
        </h3>
        <p className="text-xs text-slate-400 font-light leading-relaxed">
          Pantau status pengajuan sewa kost dan riwayat transaksi sewa Anda secara real-time.
        </p>
      </div>

      <div className="w-full h-px bg-slate-100" />

      <div className="flex flex-col gap-4">
        {rentHistory.length === 0 ? (
          <div className="flex flex-col items-center justify-center text-center p-12 border border-dashed border-slate-200 rounded-2xl bg-slate-50 gap-3">
            <AlertCircle className="w-8 h-8 text-slate-400" />
            <span className="text-xs text-slate-400 font-medium">Belum ada pengajuan sewa aktif.</span>
          </div>
        ) : (
          rentHistory.map((item: RentHistoryItem) => {
            return (
              <div 
                key={item.id}
                className="bg-white border border-slate-200/80 rounded-2xl p-5 flex flex-col md:flex-row items-start md:items-center justify-between gap-5 transition-all hover:shadow-sm"
              >
                <div className="flex flex-col sm:flex-row items-start gap-4 flex-1">
                  <img 
                    src={item.propertyImage} 
                    alt={item.propertyName} 
                    className="w-full sm:w-32 h-24 object-cover rounded-xl border border-slate-100 shrink-0 bg-slate-50"
                  />
                  
                  <div className="flex flex-col gap-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-[8px] font-black text-brand-green bg-brand-green-light px-2 py-0.5 rounded border border-brand-green/10 uppercase tracking-wider">
                        {item.id}
                      </span>
                      <span className="text-[10px] text-slate-400 font-bold">
                        Diajukan: {item.applyDate}
                      </span>
                    </div>
                    
                    <h4 className="font-extrabold text-slate-800 text-sm md:text-base leading-tight mt-0.5 hover:text-brand-green transition-colors">
                      {item.propertyName}
                    </h4>
                    
                    <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wide">
                      {item.roomType}
                    </span>

                    <div className="flex flex-col gap-1 mt-1.5 text-xs text-slate-455 font-semibold">
                      <div className="flex items-center gap-1.5">
                        <MapPin className="w-3.5 h-3.5 text-slate-400" />
                        <span>{item.location}</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Calendar className="w-3.5 h-3.5 text-slate-400" />
                        <span>Mulai: <b className="text-slate-700">{item.startDate}</b> ({item.duration})</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col items-end justify-between self-stretch md:self-auto gap-4 shrink-0 border-t border-slate-100 md:border-t-0 pt-4 md:pt-0">
                  <div className="flex md:flex-col items-center md:items-end justify-between w-full md:w-auto gap-2">
                    
                    {item.status === "disetujui" && (
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-100 rounded-full">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        <span>Disetujui</span>
                      </span>
                    )}
                    {item.status === "pending" && (
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 text-[10px] font-bold bg-amber-50 text-amber-700 border border-amber-100 rounded-full">
                        <Clock className="w-3.5 h-3.5 animate-pulse" />
                        <span>Menunggu Review</span>
                      </span>
                    )}
                    {item.status === "ditolak" && (
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 text-[10px] font-bold bg-red-50 text-red-700 border border-red-100 rounded-full">
                        <XCircle className="w-3.5 h-3.5" />
                        <span>Ditolak</span>
                      </span>
                    )}

                    <span className="text-sm font-extrabold text-slate-800 md:mt-1">
                      {item.price}
                    </span>
                  </div>

                  <div className="flex gap-2 w-full justify-end">
                    {item.status === "disetujui" && (
                      <>
                        <button
                          onClick={() => handlePayment(item.id, item.price)}
                          className="bg-brand-green hover:bg-brand-green-hover text-white text-xs font-bold py-2 px-3.5 rounded-lg flex items-center gap-1.5 transition-colors cursor-pointer shadow-sm"
                        >
                          <CreditCard className="w-3.5 h-3.5" />
                          <span>Bayar Sekarang</span>
                        </button>
                        <button
                          onClick={() => handleContactLandlord(item.landlordPhone, item.propertyName)}
                          className="border border-slate-350 hover:border-slate-400 text-slate-655 hover:bg-slate-50 text-xs font-bold py-2 px-3.5 rounded-lg flex items-center gap-1.5 transition-colors cursor-pointer"
                        >
                          <MessageSquare className="w-3.5 h-3.5" />
                          <span>Hubungi Pemilik</span>
                        </button>
                      </>
                    )}
                    {item.status === "pending" && (
                      <button
                        onClick={() => handleContactLandlord(item.landlordPhone, item.propertyName)}
                        className="bg-brand-green hover:bg-brand-green-hover text-white text-xs font-bold py-2 px-3.5 rounded-lg flex items-center gap-1.5 transition-colors cursor-pointer shadow-sm"
                      >
                        <MessageSquare className="w-3.5 h-3.5" />
                        <span>Hubungi Pemilik</span>
                      </button>
                    )}
                    {item.status === "ditolak" && (
                      <Link
                        to="/search"
                        className="border border-slate-350 hover:border-slate-450 text-slate-655 hover:bg-slate-50 text-xs font-bold py-2 px-3.5 rounded-lg flex items-center gap-1.5 transition-colors cursor-pointer"
                      >
                        <Search className="w-3.5 h-3.5" />
                        <span>Cari Kost Lain</span>
                      </Link>
                    )}
                  </div>
                </div>

              </div>
            );
          })
        )}
      </div>

    </div>
  );
}
