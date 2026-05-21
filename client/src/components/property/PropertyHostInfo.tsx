import { UserCheck } from "lucide-react";

interface Host {
  name: string;
  avatar: string;
  joined: string;
}

interface PropertyHostInfoProps {
  host: Host;
}

export default function PropertyHostInfo({ host }: PropertyHostInfoProps) {
  return (
    <div className="py-8 border-b border-slate-200/80 flex items-center justify-between gap-4">
      <div className="flex items-center gap-4">
        <img
          src={host.avatar}
          alt={host.name}
          className="w-12 h-12 rounded-full border border-slate-200 bg-slate-50"
        />
        <div>
          <span className="text-xs font-bold text-slate-400 tracking-wide block uppercase">Pemilik Kost</span>
          <span className="font-bold text-slate-800 text-base block">{host.name}</span>
          <span className="text-sm text-slate-400 font-semibold block">Bergabung sejak {host.joined}</span>
        </div>
      </div>
      
      <div className="flex items-center gap-1.5 px-3.5 py-1.5 text-sm font-bold text-emerald-600 bg-emerald-50 rounded-full border border-emerald-100 shadow-sm">
        <UserCheck className="w-3.5 h-3.5" />
        <span>Terverifikasi</span>
      </div>
    </div>
  );
}
