import { ShieldCheck } from "lucide-react";

interface PropertyRulesProps {
  rulesDetails: string[];
}

export default function PropertyRules({ rulesDetails }: PropertyRulesProps) {
  return (
    <div className="py-8 border-b border-slate-200/80">
      <h2 className="text-lg font-bold text-slate-800 mb-4">Peraturan di Kos ini</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
        {rulesDetails.map((rule, i) => (
          <div key={i} className="flex items-start gap-2.5 text-sm text-slate-500 font-semibold">
            <div className="w-5 h-5 rounded-full bg-slate-100 flex items-center justify-center text-slate-400 shrink-0 mt-0.5">
              <ShieldCheck className="w-3.5 h-3.5" />
            </div>
            <span>{rule}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
