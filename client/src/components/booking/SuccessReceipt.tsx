import { motion } from "framer-motion";
import { CheckCircle2, MapPin, FileText, ShieldCheck } from "lucide-react";
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
}

export default function SuccessReceipt({
  bookingId,
  property,
  name,
  phone,
  startDate,
  durationMonths,
  occupantsCount,
  subtotal,
  serviceFee,
  totalPayment
}: SuccessReceiptProps) {
  return (
    <motion.div
      key="success-receipt"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.5 }}
      className="max-w-2xl mx-auto px-4 py-12 flex flex-col items-center"
    >
      {/* Header Success Animation */}
      <div className="flex flex-col items-center gap-3 text-center mb-8">
        <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center text-emerald-600 shadow-inner">
          <CheckCircle2 className="w-10 h-10" />
        </div>
        <h2 className="text-2xl font-black text-slate-800 tracking-tight">
          Pengajuan Sewa Terkirim!
        </h2>
        <p className="text-xs text-slate-400 font-semibold max-w-sm">
          Pemilik kost akan melakukan verifikasi data sewa Anda. Estimasi waktu persetujuan maksimal 1x24 jam.
        </p>
      </div>

      {/* Digital Receipt Card */}
      <div className="w-full bg-white border border-slate-200/80 rounded-3xl shadow-xl overflow-hidden relative">
        
        {/* Receipt Border Top design */}
        <div className="h-2.5 w-full bg-gradient-to-r from-emerald-500 via-teal-500 to-indigo-500" />
        
        <div className="p-6 md:p-8 flex flex-col gap-6">
          
          {/* Invoice ID Header */}
          <div className="flex justify-between items-start">
            <div>
              <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">No. Pengajuan</span>
              <h3 className="text-lg font-black text-slate-800 tracking-wider mt-0.5">{bookingId}</h3>
            </div>
            <div className="text-right">
              <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Status</span>
              <span className="block mt-0.5 px-3 py-1 bg-amber-500/10 text-amber-600 text-[10px] font-bold rounded-full border border-amber-500/20">
                Menunggu Persetujuan
              </span>
            </div>
          </div>

          <div className="h-px bg-slate-100" />

          {/* Rental units summary */}
          <div className="flex gap-4 items-center bg-slate-50/50 p-3.5 rounded-2xl border border-slate-100">
            <div className="w-14 h-14 bg-slate-200 rounded-xl overflow-hidden shrink-0">
              <img src={property.img} alt={property.title} className="w-full h-full object-cover" />
            </div>
            <div className="min-w-0">
              <h4 className="font-extrabold text-sm text-slate-800 line-clamp-2 leading-snug">{property.title}</h4>
              <p className="text-[10.5px] text-slate-400 font-semibold mt-1 flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                <span className="truncate">{property.location}</span>
              </p>
            </div>
          </div>

          {/* Tenant Details */}
          <div className="flex flex-col gap-3 text-xs bg-slate-50/20 p-4 rounded-2xl border border-slate-100/50">
            <h5 className="font-black text-slate-800 text-[11px] uppercase tracking-wide flex items-center gap-1.5 mb-1 text-slate-500">
              <FileText className="w-4 h-4 text-slate-400" />
              Informasi Kontrak
            </h5>
            
            <div className="grid grid-cols-2 gap-y-2.5 font-bold">
              <div className="text-slate-400">Penyewa Utama</div>
              <div className="text-slate-700 text-right">{name}</div>
              
              <div className="text-slate-400">Nomor WhatsApp</div>
              <div className="text-slate-700 text-right">{phone}</div>

              <div className="text-slate-400">Tanggal Masuk</div>
              <div className="text-slate-700 text-right">
                {new Date(startDate).toLocaleDateString("id-ID", {
                  weekday: "long",
                  year: "numeric",
                  month: "long",
                  day: "numeric"
                })}
              </div>

              <div className="text-slate-400">Durasi Sewa</div>
              <div className="text-slate-700 text-right">{durationMonths} Bulan</div>

              <div className="text-slate-400">Jumlah Penghuni</div>
              <div className="text-slate-700 text-right">{occupantsCount} Orang</div>
            </div>
          </div>

          {/* Price Receipt Details */}
          <div className="flex flex-col gap-2.5 text-xs">
            <div className="flex justify-between text-slate-400 font-bold">
              <span>Subtotal Biaya Sewa ({durationMonths} Bln)</span>
              <span className="text-slate-700">{formatIDR(subtotal)}</span>
            </div>
            <div className="flex justify-between text-slate-400 font-bold">
              <span>Biaya Layanan Aplikasi</span>
              <span className="text-slate-700">{formatIDR(serviceFee)}</span>
            </div>
            <div className="h-px bg-slate-100 my-1.5" />
            <div className="flex justify-between items-center text-sm font-extrabold">
              <span className="text-slate-800">Total Pembayaran</span>
              <span className="text-slate-900 text-base">{formatIDR(totalPayment)}</span>
            </div>
          </div>

          {/* Alert Warning Box */}
          <div className="bg-slate-50 p-3.5 rounded-2xl text-[10.5px] text-slate-500 leading-relaxed font-semibold border border-slate-100 flex items-start gap-2.5">
            <ShieldCheck className="w-4.5 h-4.5 text-slate-400 shrink-0 mt-0.5" />
            <span>
              Anda baru akan ditagih pembayaran setelah pemilik kost menyetujui dokumen pengajuan sewa ini. Hubungi pemilik kost jika Anda memiliki pertanyaan lain.
            </span>
          </div>

          {/* Action buttons */}
          <div className="flex flex-col gap-3 mt-2">
            <a
              href={`https://wa.me/628123456789?text=Halo%20saya%20telah%20mengirimkan%20pengajuan%20sewa%20dengan%20ID%20${bookingId}%20untuk%20kost%20${encodeURIComponent(
                property.title
              )}.%20Mohon%20untuk%20segera%20dikonfirmasi.`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-3.5 bg-emerald-600 hover:bg-emerald-700 text-white text-center text-xs font-bold rounded-full transition-all block shadow-md cursor-pointer border-0"
            >
              Konfirmasi via WhatsApp
            </a>
            <Link
              to="/"
              className="w-full py-3.5 border border-slate-200 hover:border-slate-800 text-slate-600 hover:text-slate-800 text-center text-xs font-bold rounded-full transition-all block cursor-pointer"
            >
              Kembali ke Beranda
            </Link>
          </div>

        </div>
      </div>
    </motion.div>
  );
}
