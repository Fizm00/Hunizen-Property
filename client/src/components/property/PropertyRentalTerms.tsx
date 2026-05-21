import { Calendar } from "lucide-react";

interface PropertyRentalTermsProps {
  rentalTerms: {
    min: string;
    max: string;
  };
}

export default function PropertyRentalTerms({ rentalTerms }: PropertyRentalTermsProps) {
  return (
    <div className="py-8 border-b border-slate-200/80">
      <h2 className="text-lg font-bold text-slate-800 mb-4">Ketentuan Sewa</h2>
      <div className="flex flex-col gap-4">
        <div className="flex items-start gap-3">
          <div className="w-8 h-8 rounded-lg bg-zinc-100 flex items-center justify-center text-zinc-600 shrink-0 mt-0.5">
            <Calendar className="w-4.5 h-4.5" />
          </div>
          <div>
            <span className="text-sm font-bold text-slate-700 block">Waktu Mulai Ngekos Terdekat</span>
            <span className="text-sm text-slate-400 font-semibold mt-0.5 block">{rentalTerms.min}</span>
          </div>
        </div>

        <div className="flex items-start gap-3">
          <div className="w-8 h-8 rounded-lg bg-zinc-100 flex items-center justify-center text-zinc-600 shrink-0 mt-0.5">
            <Calendar className="w-4.5 h-4.5" />
          </div>
          <div>
            <span className="text-sm font-bold text-slate-700 block">Waktu Mulai Ngekos Terjauh</span>
            <span className="text-sm text-slate-400 font-semibold mt-0.5 block">{rentalTerms.max}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
