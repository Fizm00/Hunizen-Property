import { User, Phone, Briefcase, ChevronDown } from "lucide-react";
import type { BookingFormErrors } from "../../types/booking";
import { OCCUPATION_OPTIONS } from "../../constants/booking";

interface TenantInfoFormProps {
  name: string;
  setName: (val: string) => void;
  phone: string;
  setPhone: (val: string) => void;
  gender: "Laki-laki" | "Perempuan";
  setGender: (val: "Laki-laki" | "Perempuan") => void;
  occupation: string;
  setOccupation: (val: string) => void;
  errors: BookingFormErrors;
}

export default function TenantInfoForm({
  name,
  setName,
  phone,
  setPhone,
  gender,
  setGender,
  occupation,
  setOccupation,
  errors
}: TenantInfoFormProps) {
  return (
    <div className="bg-white border border-slate-200/60 rounded-3xl p-6 md:p-8 shadow-sm flex flex-col gap-6">
      <div className="border-b border-slate-100 pb-4">
        <h2 className="text-lg font-black text-slate-800 flex items-center gap-2">
          <User className="w-5 h-5 text-indigo-500" />
          Informasi Penyewa
        </h2>
        <p className="text-xs text-slate-400 mt-1">Data identitas utama pemohon sewa kost</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {/* Full Name */}
        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-extrabold text-slate-400 uppercase tracking-wide">Nama Lengkap</label>
          <div className={`flex items-center h-12 px-4 border rounded-xl bg-slate-50/30 focus-within:border-[#09090B] transition-colors ${errors.name ? "border-red-400" : "border-slate-200"}`}>
            <User className="w-4.5 h-4.5 text-slate-400 mr-2.5 shrink-0" />
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="bg-transparent text-sm font-bold text-slate-800 focus:outline-none w-full h-full"
              placeholder="Masukkan nama sesuai KTP"
            />
          </div>
          {errors.name && <span className="text-[10px] font-bold text-red-500 mt-0.5">{errors.name}</span>}
        </div>

        {/* WhatsApp Phone */}
        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-extrabold text-slate-400 uppercase tracking-wide">Nomor WhatsApp</label>
          <div className={`flex items-center h-12 px-4 border rounded-xl bg-slate-50/30 focus-within:border-[#09090B] transition-colors ${errors.phone ? "border-red-400" : "border-slate-200"}`}>
            <Phone className="w-4.5 h-4.5 text-slate-400 mr-2.5 shrink-0" />
            <input
              type="text"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="bg-transparent text-sm font-bold text-slate-800 focus:outline-none w-full h-full"
              placeholder="Contoh: 08123456789"
            />
          </div>
          {errors.phone && <span className="text-[10px] font-bold text-red-500 mt-0.5">{errors.phone}</span>}
        </div>

        {/* Gender */}
        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-extrabold text-slate-400 uppercase tracking-wide">Jenis Kelamin</label>
          <div className="flex gap-3">
            <button
              type="button"
              onClick={() => setGender("Laki-laki")}
              className={`flex-1 h-12 border rounded-xl text-sm font-bold text-center flex items-center justify-center transition-all cursor-pointer ${
                gender === "Laki-laki"
                  ? "bg-[#09090B] border-[#09090B] text-white shadow-sm"
                  : "bg-white border-slate-200 text-slate-600 hover:bg-slate-50"
              }`}
            >
              Laki-laki
            </button>
            <button
              type="button"
              onClick={() => setGender("Perempuan")}
              className={`flex-1 h-12 border rounded-xl text-sm font-bold text-center flex items-center justify-center transition-all cursor-pointer ${
                gender === "Perempuan"
                  ? "bg-[#09090B] border-[#09090B] text-white shadow-sm"
                  : "bg-white border-slate-200 text-slate-600 hover:bg-slate-50"
              }`}
            >
              Perempuan
            </button>
          </div>
        </div>

        {/* Occupation */}
        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-extrabold text-slate-400 uppercase tracking-wide">Pekerjaan</label>
          <div className="flex items-center h-12 px-4 border border-slate-200 rounded-xl bg-slate-50/30 focus-within:border-[#09090B] transition-colors relative">
            <Briefcase className="w-4.5 h-4.5 text-slate-400 mr-2.5 shrink-0" />
            <select
              value={occupation}
              onChange={(e) => setOccupation(e.target.value)}
              className="bg-transparent text-sm font-bold text-slate-800 focus:outline-none w-full cursor-pointer appearance-none pr-8"
            >
              {OCCUPATION_OPTIONS.map((opt) => (
                <option key={opt} value={opt}>
                  {opt}
                </option>
              ))}
            </select>
            <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none flex items-center">
              <ChevronDown className="w-4 h-4 text-slate-400" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
