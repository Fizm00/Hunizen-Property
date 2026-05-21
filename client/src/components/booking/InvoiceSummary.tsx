import { MapPin, HelpCircle, ShieldCheck } from "lucide-react";
import type { PropertyDetail } from "../../types";
import { formatIDR } from "../../utils/formatters";

interface InvoiceSummaryProps {
  property: PropertyDetail;
  durationMonths: number;
  subtotal: number;
  serviceFee: number;
  totalPayment: number;
}

export default function InvoiceSummary({
  property,
  durationMonths,
  subtotal,
  serviceFee,
  totalPayment
}: InvoiceSummaryProps) {
  return (
    <div className="sticky top-28 bg-white border border-slate-200/60 rounded-3xl p-6 shadow-md flex flex-col gap-6">
      
      {/* Property Card Mini representation */}
      <div className="flex gap-4 items-center">
        <div className="w-20 h-20 bg-slate-100 rounded-2xl overflow-hidden shrink-0">
          <img
            src={property.img}
            alt={property.title}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="min-w-0">
          <span className={`inline-block px-2.5 py-0.5 rounded-full text-[9px] font-bold text-white mb-1.5 ${
            property.type === "Campur"
              ? "bg-amber-600"
              : property.type === "Putra"
              ? "bg-blue-600"
              : "bg-rose-600"
          }`}>
            Kos {property.type}
          </span>
          <h4 className="font-extrabold text-base text-slate-800 line-clamp-2 leading-snug">
            {property.title}
          </h4>
          <p className="text-[11.5px] text-slate-400 font-semibold flex items-center gap-1 mt-1">
            <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
            <span className="truncate">{property.location}</span>
          </p>
        </div>
      </div>

      <div className="h-px bg-slate-100 w-full" />

      {/* Payment Details */}
      <div className="flex flex-col gap-4">
        <div>
          <h5 className="text-xs font-black text-slate-800 uppercase tracking-wider">
            Rincian Pembayaran
          </h5>
          <span className="text-[10px] text-slate-400 font-bold block mt-0.5">
            Tagihan pertama setelah pengajuan disetujui
          </span>
        </div>

        <div className="flex flex-col gap-2.5 text-xs">
          {/* Price per Month */}
          <div className="flex justify-between items-center text-slate-500 font-bold">
            <span>Biaya Sewa ({durationMonths} Bulan)</span>
            <span className="text-slate-700">{formatIDR(subtotal)}</span>
          </div>

          {/* Service fee */}
          <div className="flex justify-between items-center text-slate-500 font-bold">
            <span className="flex items-center gap-1 group relative">
              Biaya Layanan Aplikasi
              <HelpCircle className="w-3.5 h-3.5 text-slate-300 cursor-pointer" />
              <span className="absolute bottom-full mb-1 left-1/2 -translate-x-1/2 hidden group-hover:block bg-zinc-900 text-white text-[10px] px-2 py-1 rounded shadow-md whitespace-nowrap z-10 font-medium border border-zinc-800">
                Biaya admin sewa sistem
              </span>
            </span>
            <span className="text-slate-700">{formatIDR(serviceFee)}</span>
          </div>

          <div className="h-px bg-slate-100 w-full my-1.5" />

          {/* Total payment */}
          <div className="flex justify-between items-center text-sm font-extrabold">
            <span className="text-slate-800">Total Pembayaran</span>
            <span className="text-slate-900 text-base">{formatIDR(totalPayment)}</span>
          </div>
        </div>
      </div>

      {/* Security verification details */}
      <div className="flex items-start gap-2.5 p-3 bg-emerald-50 rounded-2xl border border-emerald-100">
        <ShieldCheck className="w-5 h-5 text-emerald-700 shrink-0 mt-0.5" />
        <div className="text-[10.5px] text-emerald-800 leading-normal font-semibold">
          <span>Jaminan Uang Kembali. Transaksi Anda dilindungi dan dana aman hingga unit siap ditempati.</span>
        </div>
      </div>
    </div>
  );
}
