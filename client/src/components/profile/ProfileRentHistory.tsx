import { Link } from "react-router-dom";
import { 
  Clock, 
  CheckCircle2, 
  XCircle, 
  MapPin, 
  Calendar,
  MessageSquare,
  CreditCard,
  Search
} from "lucide-react";
import { RENT_HISTORY_DATA } from "../../constants/profile";
import type { RentHistoryItem } from "../../types/profile";
import { showAlert } from "../../utils/alerts";

export function ProfileRentHistory() {
  const handleContactLandlord = (phone: string, propertyName: string) => {
    const text = `Halo, saya ingin menanyakan perihal status pengajuan sewa saya untuk ${propertyName}.`;
    const url = `https://wa.me/${phone.replace(/[^0-9]/g, "")}?text=${encodeURIComponent(text)}`;
    window.open(url, "_blank");
  };

  const handlePayment = (id: string, price: string) => {
    showAlert(
      "success",
      "Melanjutkan Pembayaran",
      `Mengalihkan Anda ke gerbang pembayaran transaksi sewa ${id} dengan total ${price}.`
    );
  };

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
        {RENT_HISTORY_DATA.map((item: RentHistoryItem) => {
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
                  <div className="flex items-center gap-2">
                    <span className="text-[9px] font-black text-brand-green bg-brand-green-light px-2 py-0.5 rounded-md uppercase tracking-wider">
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
                        className="border border-slate-350 hover:border-slate-400 text-slate-650 hover:bg-slate-50 text-xs font-bold py-2 px-3.5 rounded-lg flex items-center gap-1.5 transition-colors cursor-pointer"
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
                      className="border border-slate-350 hover:border-slate-450 text-slate-650 hover:bg-slate-50 text-xs font-bold py-2 px-3.5 rounded-lg flex items-center gap-1.5 transition-colors cursor-pointer"
                    >
                      <Search className="w-3.5 h-3.5" />
                      <span>Cari Kost Lain</span>
                    </Link>
                  )}
                </div>
              </div>

            </div>
          );
        })}
      </div>

    </div>
  );
}
