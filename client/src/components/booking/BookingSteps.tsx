import { ChevronRight, Check } from "lucide-react";

interface BookingStepsProps {
  currentStep?: number;
}

export default function BookingSteps({ currentStep = 1 }: BookingStepsProps) {
  return (
    <div className="flex items-center gap-2 bg-white border border-slate-200/80 px-4 py-2 rounded-2xl shadow-sm self-start md:self-auto">
      {/* Step 1 */}
      <div className="flex items-center gap-1.5">
        {currentStep > 1 ? (
          <span className="w-5 h-5 rounded-full bg-brand-green-vibrant text-white flex items-center justify-center">
            <Check className="w-3.5 h-3.5 stroke-[3]" />
          </span>
        ) : (
          <span className="w-5 h-5 rounded-full bg-brand-green text-white text-[10px] font-bold flex items-center justify-center animate-pulse">
            1
          </span>
        )}
        <span className={`text-xs font-bold ${currentStep >= 1 ? "text-slate-800" : "text-slate-400"}`}>
          Isi Form
        </span>
      </div>

      <ChevronRight className="w-3.5 h-3.5 text-slate-300" />

      {/* Step 2 */}
      <div className="flex items-center gap-1.5">
        {currentStep > 2 ? (
          <span className="w-5 h-5 rounded-full bg-brand-green-vibrant text-white flex items-center justify-center">
            <Check className="w-3.5 h-3.5 stroke-[3]" />
          </span>
        ) : (
          <span className={`w-5 h-5 rounded-full text-[10px] font-bold flex items-center justify-center ${
            currentStep === 2 ? "bg-brand-green text-white animate-pulse" : "bg-slate-100 text-slate-400"
          }`}>
            2
          </span>
        )}
        <span className={`text-xs font-bold ${currentStep >= 2 ? "text-slate-800" : "text-slate-400"}`}>
          Pembayaran
        </span>
      </div>

      <ChevronRight className="w-3.5 h-3.5 text-slate-300" />

      {/* Step 3 */}
      <div className="flex items-center gap-1.5">
        <span className={`w-5 h-5 rounded-full text-[10px] font-bold flex items-center justify-center ${
          currentStep === 3 ? "bg-brand-green text-white" : "bg-slate-100 text-slate-400"
        }`}>
          3
        </span>
        <span className={`text-xs font-bold ${currentStep >= 3 ? "text-slate-800" : "text-slate-400"}`}>
          Selesai
        </span>
      </div>
    </div>
  );
}
