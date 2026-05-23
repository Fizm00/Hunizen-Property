import { 
  History, 
  Home, 
  MessageSquare, 
  Settings, 
  CreditCard, 
  Receipt,
  LogOut,
  UserCheck
} from "lucide-react";
import { PROFILE_SIDEBAR_MENU } from "../../constants/profile";
import type { SidebarMenuItem } from "../../types/profile";

interface ProfileSidebarProps {
  activeTab: string;
  onTabChange: (id: string) => void;
  userName: string;
  avatarUrl: string;
  onLogout: () => void;
}

const iconMapping: Record<string, React.ComponentType<{ className?: string }>> = {
  History: History,
  Home: Home,
  MessageSquare: MessageSquare,
  Settings: Settings,
  CreditCard: CreditCard,
  Receipt: Receipt,
};

export function ProfileSidebar({
  activeTab,
  onTabChange,
  userName,
  avatarUrl,
  onLogout,
}: ProfileSidebarProps) {
  return (
    <div className="flex flex-col gap-6 w-full">
      
      {/* 1. User Summary Card */}
      <div className="bg-white border border-slate-200/70 rounded-3xl p-6 flex items-center gap-4 shadow-sm">
        <div className="relative">
          <img 
            src={avatarUrl} 
            alt="Profile Avatar" 
            className="w-14 h-14 rounded-full object-cover border border-slate-200"
          />
          <div className="absolute -bottom-1 -right-1 bg-emerald-500 text-white rounded-full p-0.5 border border-white">
            <UserCheck className="w-3 h-3" />
          </div>
        </div>
        <div className="flex flex-col">
          <h3 className="font-bold text-slate-800 text-base leading-tight">
            {userName}
          </h3>
          <span className="text-[11px] text-slate-400 font-semibold tracking-wide uppercase mt-0.5">
            Akun Terverifikasi
          </span>
        </div>
      </div>

      {/* 2. Sidebar Navigation Card */}
      <div className="bg-white border border-slate-200/70 rounded-3xl overflow-hidden shadow-sm py-4">
        <div className="flex flex-col">
          {PROFILE_SIDEBAR_MENU.map((item: SidebarMenuItem) => {
            const Icon = iconMapping[item.iconName];
            const isActive = activeTab === item.id;
            
            return (
              <button
                key={item.id}
                onClick={() => onTabChange(item.id)}
                className={`flex items-center gap-3.5 px-6 py-3.5 text-xs font-semibold border-l-4 transition-all duration-200 text-left cursor-pointer ${
                  isActive
                    ? "border-brand-green text-brand-green bg-brand-green-light/40 font-bold"
                    : "border-transparent text-slate-500 hover:text-slate-800 hover:bg-slate-50"
                }`}
              >
                {Icon && <Icon className="w-4 h-4 shrink-0" />}
                <span>{item.label}</span>
              </button>
            );
          })}
          
          <div className="w-full h-px bg-slate-100 my-3" />
          
          {/* Logout Button */}
          <button
            onClick={onLogout}
            className="flex items-center gap-3.5 px-6 py-3.5 text-xs font-semibold text-red-600 hover:bg-red-50 border-l-4 border-transparent transition-all duration-200 text-left cursor-pointer"
          >
            <LogOut className="w-4 h-4 shrink-0" />
            <span>Keluar Akun</span>
          </button>
        </div>
      </div>

      {/* 3. Upgrade Landlord Promo Card */}
      <div className="bg-brand-green-light border border-brand-green-accent/15 rounded-3xl p-6 flex flex-col gap-4 text-center shadow-sm">
        <div className="flex flex-col gap-1.5">
          <h4 className="font-bold text-brand-green text-sm">
            Kamu Punya Kos?
          </h4>
          <p className="text-slate-600 text-xs font-light leading-relaxed">
            Upgrade akun kamu menjadi pemilik kos untuk bergabung bersama kami!
          </p>
        </div>
        <button className="w-full bg-brand-green hover:bg-brand-green-hover text-white text-xs font-bold py-2.5 px-4 rounded-xl shadow-sm transition-all cursor-pointer">
          Daftar Sekarang
        </button>
      </div>

    </div>
  );
}
