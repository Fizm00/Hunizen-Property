import { ChevronRight } from "lucide-react";

export default function BookingSteps() {
  return (
    <div className="flex items-center gap-2 bg-white border border-slate-200/80 px-4 py-2 rounded-2xl shadow-sm self-start md:self-auto">
      <div className="flex items-center gap-1.5">
        <span className="w-5 h-5 rounded-full bg-[#09090B] text-white text-[10px] font-bold flex items-center justify-center">1</span>
        <span className="text-xs font-bold text-slate-800">Isi Form</span>
      </div>
      <ChevronRight className="w-3.5 h-3.5 text-slate-300" />
      <div className="flex items-center gap-1.5">
        <span className="w-5 h-5 rounded-full bg-slate-100 text-slate-400 text-[10px] font-bold flex items-center justify-center">2</span>
        <span className="text-xs font-bold text-slate-400">Verifikasi</span>
      </div>
      <ChevronRight className="w-3.5 h-3.5 text-slate-300" />
      <div className="flex items-center gap-1.5">
        <span className="w-5 h-5 rounded-full bg-slate-100 text-slate-400 text-[10px] font-bold flex items-center justify-center">3</span>
        <span className="text-xs font-bold text-slate-400">Selesai</span>
      </div>
    </div>
  );
}
