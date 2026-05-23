import { motion } from "framer-motion";
import { CheckCircle2, MapPin } from "lucide-react";
import { Link } from "react-router-dom";
import type { PropertyDetail } from "../../types";
import { formatIDR } from "../../utils/formatters";

interface SuccessReceiptProps {
  bookingId: string;
  property: PropertyDetail;
  name: string;
  phone: string;
  startDate: string;
  durationMonths: number;
  occupantsCount: number;
  subtotal: number;
  serviceFee: number;
  totalPayment: number;
  paymentMethod?: string;
}

export default function SuccessReceipt({
  bookingId,
  property,
  startDate,
  durationMonths,
  subtotal,
  serviceFee,
  totalPayment,
  paymentMethod
}: SuccessReceiptProps) {
  
  const today = new Date();
  const transactionDate = today.toLocaleDateString("id-ID", {
    year: "numeric",
    month: "long",
    day: "numeric"
  });

  const transactionTime = today.toLocaleTimeString("id-ID", {
    hour: "2-digit",
    minute: "2-digit"
  }).replace(".", ":");
  
  const paidAtDate = `${transactionDate}, ${transactionTime} WIB`;

  const getCheckOutDate = (startStr: string, months: number): string => {
    if (!startStr) return "";
    const date = new Date(startStr);
    date.setMonth(date.getMonth() + months);
    return date.toLocaleDateString("id-ID", {
      year: "numeric",
      month: "long",
      day: "numeric"
    });
  };

  const getPaymentLabel = (method?: string): string => {
    if (!method) return "GoPay";
    const labels: Record<string, string> = {
      gopay: "GoPay",
      shopeepay: "ShopeePay",
      dana: "DANA",
      ovo: "OVO",
      linkaja: "LinkAja",
      flip: "Flip",
      bni: "BNI Virtual Account",
      mandiri: "Mandiri Virtual Account",
      bri: "BRI Virtual Account",
      cod: "COD (Bayar di Tempat)"
    };
    return labels[method] || method;
  };

  return (
    <motion.div
      key="success-receipt"
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.98 }}
      transition={{ duration: 0.4 }}
      className="w-full py-4"
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-start w-full">
        
        <div className="lg:col-span-7 flex flex-col gap-6">
          <div className="flex items-center gap-3">
            <h2 className="text-2xl md:text-3xl font-black text-slate-800 tracking-tight">
              Pengajuan Sewa Berhasil!
            </h2>
            <div className="w-8 h-8 rounded-full bg-brand-green-light flex items-center justify-center text-brand-green shrink-0">
              <CheckCircle2 className="w-5 h-5" />
            </div>
          </div>
          
          <div className="h-px bg-slate-200" />

          <div className="flex flex-col gap-4 text-sm font-semibold">
            <div className="flex justify-between items-center py-2.5 border-b border-slate-100">
              <span className="text-slate-400">No. Invoice</span>
              <span className="text-slate-800 font-bold tracking-wider">{bookingId}</span>
            </div>
            
            <div className="flex justify-between items-center py-2.5 border-b border-slate-100">
              <span className="text-slate-400">Tanggal Transaksi</span>
              <span className="text-slate-700">{transactionDate}</span>
            </div>
            
            <div className="flex justify-between items-center py-2.5 border-b border-slate-100">
              <span className="text-slate-400">Jenis Pembayaran</span>
              <span className="text-slate-700">Bayar Sewa Kos</span>
            </div>
            
            <div className="flex justify-between items-center py-2.5 border-b border-slate-100">
              <span className="text-slate-400">Dibayar pada</span>
              <span className="text-slate-700">{paidAtDate}</span>
            </div>
            
            <div className="flex justify-between items-center py-2.5 border-b border-slate-100">
              <span className="text-slate-400">Status Transaksi</span>
              <span className={`px-3 py-0.5 rounded-full text-[11px] font-bold ${
                paymentMethod === "cod" 
                  ? "bg-amber-500/10 text-amber-600 border border-amber-500/20" 
                  : "bg-brand-green-vibrant/10 text-brand-green-vibrant border border-brand-green-vibrant/20"
              }`}>
                {paymentMethod === "cod" ? "Menunggu Pembayaran" : "Lunas"}
              </span>
            </div>
            
            <div className="flex justify-between items-center py-2.5 border-b border-slate-100">
              <span className="text-slate-400">Metode Pembayaran</span>
              <span className="text-slate-800 font-extrabold">{getPaymentLabel(paymentMethod)}</span>
            </div>
          </div>

          <div>
            <Link
              to="/"
              className="px-10 py-3.5 bg-brand-green hover:bg-brand-green-hover text-white text-xs font-bold rounded-full transition-all inline-block shadow-md active:scale-95 text-center cursor-pointer border-0 mt-6"
            >
              Home
            </Link>
          </div>
        </div>

        <div className="lg:col-span-5 flex flex-col gap-5">
          <div className="bg-white border border-slate-200/60 rounded-3xl p-6 shadow-md flex flex-col gap-5 w-full">
            
            <div className="flex gap-4 items-start">
              <div className="w-20 h-20 rounded-2xl overflow-hidden shrink-0 bg-slate-100 border border-slate-100">
                <img src={property.img} alt={property.title} className="w-full h-full object-cover" />
              </div>
              <div className="min-w-0 flex-1">
                <span className="inline-block border border-slate-200 bg-slate-50 px-2 py-0.5 rounded text-[10px] font-bold text-slate-500 uppercase tracking-wide">
                  Kos {property.type}
                </span>
                <h4 className="font-extrabold text-sm text-slate-800 mt-1 line-clamp-2 leading-snug">
                  {property.title}
                </h4>
                <p className="text-[11px] text-slate-400 font-semibold mt-1 flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                  <span className="truncate">{property.location}</span>
                </p>
                <span className="block text-[10px] text-slate-400 font-bold mt-1.5 uppercase tracking-wide">
                  Durasi Kos : Per 1 Bulan
                </span>
              </div>
            </div>

            <div className="h-px bg-slate-100" />

            <div className="flex flex-col gap-3">
              <h5 className="font-black text-[11px] text-slate-800 uppercase tracking-wider">
                Informasi sewa
              </h5>
              <div className="flex flex-col gap-2 text-xs font-semibold text-slate-700">
                <div className="flex justify-between">
                  <span className="text-slate-400">Tanggal Masuk</span>
                  <span className="text-slate-800 font-bold">
                    {new Date(startDate).toLocaleDateString("id-ID", {
                      year: "numeric",
                      month: "long",
                      day: "numeric"
                    })}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Tanggal Keluar</span>
                  <span className="text-slate-800 font-bold">{getCheckOutDate(startDate, durationMonths)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Durasi Sewa</span>
                  <span className="text-slate-800 font-bold">{durationMonths} Bulan</span>
                </div>
              </div>
            </div>

            <div className="h-px bg-slate-100" />

            <div className="flex flex-col gap-2.5 text-xs font-semibold text-slate-700">
              <div className="flex justify-between">
                <span className="text-slate-400">Biaya sewa kos</span>
                <span className="text-slate-800 font-bold">{formatIDR(subtotal)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Biaya layanan</span>
                <span className="text-slate-800 font-bold">{formatIDR(serviceFee)}</span>
              </div>
            </div>

            <div className="h-px bg-slate-100" />

            <div className="flex justify-between items-center">
              <span className="text-xs font-black text-slate-800 uppercase tracking-wider">Total Pembayaran</span>
              <span className="text-base font-black text-brand-green">{formatIDR(totalPayment)}</span>
            </div>
          </div>

          <div className="flex gap-4 w-full">
            <button
              type="button"
              onClick={() => window.print()}
              className="flex-1 py-3.5 border border-slate-200 hover:border-brand-green hover:text-brand-green text-slate-600 text-xs font-bold rounded-full transition-all text-center cursor-pointer bg-white"
            >
              Cetak
            </button>
            <a
              href={`https://wa.me/628123456789?text=Halo%20saya%20telah%20mengirimkan%20pengajuan%20sewa%20dengan%20ID%20${bookingId}%20untuk%20kost%20${encodeURIComponent(
                property.title
              )}.%20Mohon%20untuk%20segera%20dikonfirmasi.`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 py-3.5 bg-brand-green hover:bg-brand-green-hover text-white text-xs font-bold rounded-full transition-all text-center shadow-md active:scale-98 cursor-pointer border-0 block"
            >
              Chat Pemilik
            </a>
          </div>
        </div>

      </div>
    </motion.div>
  );
}
