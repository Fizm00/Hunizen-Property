import { Check } from "lucide-react";

interface PropertyHighlightsProps {
  highlights: string[];
}

export default function PropertyHighlights({ highlights }: PropertyHighlightsProps) {
  return (
    <div className="py-8 border-b border-slate-200/80">
      <h3 className="text-base font-bold text-slate-400 tracking-wider mb-5 uppercase">Fasilitas Utama</h3>
      
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {highlights.map((h, i) => (
          <div
            key={i}
            className="flex flex-col items-center justify-center text-center p-4 bg-slate-50 border border-slate-100 rounded-2xl gap-2 shadow-sm hover:bg-slate-100/50 transition-colors"
          >
            <div className="w-10 h-10 rounded-full bg-slate-200 flex items-center justify-center text-slate-700">
              <Check className="w-5 h-5 text-slate-600" />
            </div>
            <span className="text-sm font-bold text-slate-700 leading-tight">{h}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
