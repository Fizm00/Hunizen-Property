import { 
  Wifi, 
  Wind, 
  Utensils, 
  Tv, 
  Check, 
  Bath, 
  Flame, 
  Shield, 
  Plug, 
  Droplet,
  ShowerHead,
  Toilet
} from "lucide-react";

interface PropertyFacilitiesProps {
  facilities: string[];
  bathroomFacilities: string[];
}

const getFacilityIcon = (name: string) => {
  const f = name.toLowerCase();
  
  if (f.includes("wifi")) return Wifi;
  if (f.includes("ac")) return Wind;
  if (f.includes("dapur") || f.includes("masak")) return Utensils;
  if (f.includes("tv")) return Tv;
  if (f.includes("laundry") || f.includes("cuci")) return Check;
  if (f.includes("listrik")) return Plug;
  if (f.includes("penjaga") || f.includes("keamanan") || f.includes("security")) return Shield;
  if (f.includes("air panas") || f.includes("heater")) return Flame;
  if (f.includes("kamar mandi dalam") || f.includes("km dalam")) return Bath;
  if (f.includes("kloset") || f.includes("toilet")) return Toilet;
  if (f.includes("shower")) return ShowerHead;
  if (f.includes("wastafel") || f.includes("sink")) return Droplet;
  
  return Check;
};

export default function PropertyFacilities({
  facilities,
  bathroomFacilities,
}: PropertyFacilitiesProps) {
  return (
    <div className="py-8 border-b border-slate-200/80 flex flex-col gap-6">
      <div>
        <h2 className="text-lg font-bold text-slate-800 mb-4">Fasilitas Kost</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
          {facilities.map((f, i) => {
            const IconComp = getFacilityIcon(f);
            return (
              <div key={i} className="flex items-center gap-2 text-sm font-bold text-slate-600">
                <div className="w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center text-slate-500 shrink-0">
                  <IconComp className="w-4 h-4" />
                </div>
                <span>{f}</span>
              </div>
            );
          })}
        </div>
      </div>

      <div className="h-px bg-slate-100 w-full" />

      <div>
        <h2 className="text-lg font-bold text-slate-800 mb-4">Fasilitas Kamar Mandi</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
          {bathroomFacilities.map((bf, i) => {
            const IconComp = getFacilityIcon(bf);
            return (
              <div key={i} className="flex items-center gap-2 text-sm font-bold text-slate-600">
                <div className="w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center text-slate-500 shrink-0">
                  <IconComp className="w-4 h-4" />
                </div>
                <span>{bf}</span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
