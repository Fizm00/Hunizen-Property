import { useRef } from "react";
import { Camera, Save, Loader2 } from "lucide-react";
import { 
  JOB_OPTIONS, 
  CITY_OPTIONS, 
  STATUS_OPTIONS, 
  EDUCATION_OPTIONS,
  GENDER_OPTIONS
} from "../../constants/profile";

interface ProfileBiodataProps {
  name: string;
  setName: (v: string) => void;
  gender: string;
  setGender: (v: string) => void;
  birthDate: string;
  setBirthDate: (v: string) => void;
  job: string;
  setJob: (v: string) => void;
  city: string;
  setCity: (v: string) => void;
  maritalStatus: string;
  setMaritalStatus: (v: string) => void;
  education: string;
  setEducation: (v: string) => void;
  emergencyPhone: string;
  setEmergencyPhone: (v: string) => void;
  avatarUrl: string;
  onAvatarUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSave: (e: React.FormEvent) => void;
  isLoading: boolean;
  validationError: string;
}

export function ProfileBiodata({
  name,
  setName,
  gender,
  setGender,
  birthDate,
  setBirthDate,
  job,
  setJob,
  city,
  setCity,
  maritalStatus,
  setMaritalStatus,
  education,
  setEducation,
  emergencyPhone,
  setEmergencyPhone,
  avatarUrl,
  onAvatarUpload,
  onSave,
  isLoading,
  validationError,
}: ProfileBiodataProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  return (
    <form onSubmit={onSave} className="flex flex-col gap-8">
      {validationError && (
        <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-r-xl">
          <p className="text-xs font-bold text-red-700">{validationError}</p>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        
        <div className="flex flex-col items-center gap-4">
          <div className="relative w-48 h-48 rounded-4xl overflow-hidden border border-slate-200 shadow-sm bg-slate-50 group">
            <img 
              src={avatarUrl} 
              alt="Avatar Preview" 
              className="w-full h-full object-cover"
            />
            <div 
              onClick={triggerFileInput}
              className="absolute inset-0 bg-black/40 flex flex-col items-center justify-center gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity duration-200 cursor-pointer text-white"
            >
              <Camera className="w-6 h-6" />
              <span className="text-[10px] font-bold uppercase tracking-wider">Ubah Foto</span>
            </div>
          </div>
          
          <input 
            type="file" 
            ref={fileInputRef}
            onChange={onAvatarUpload}
            accept=".png,.jpg,.jpeg"
            className="hidden"
          />

          <button 
            type="button"
            onClick={triggerFileInput}
            className="px-5 py-2 text-xs font-bold text-slate-700 border border-slate-300 hover:border-slate-400 hover:bg-slate-50 rounded-xl transition-all cursor-pointer shadow-sm"
          >
            Upload Foto
          </button>

          <div className="text-center max-w-[200px]">
            <p className="text-[10px] text-slate-400 leading-normal">
              <span className="font-bold text-slate-500">Besar file:</span> maksimum 10.000.000 bytes (10 Megabytes). 
              <span className="font-bold text-slate-500"> Ekstensi file:</span> .JPG, .JPEG, .PNG.
            </p>
          </div>
        </div>

        <div className="md:col-span-2 flex flex-col gap-4">
          
          <div className="grid grid-cols-1 sm:grid-cols-3 items-center gap-2">
            <label className="text-xs font-bold text-slate-600 sm:col-span-1">
              Nama Lengkap
            </label>
            <div className="sm:col-span-2">
              <input 
                type="text" 
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Masukkan nama lengkap"
                className="w-full bg-white border border-slate-200 hover:border-slate-300 rounded-xl px-4 py-2.5 text-xs font-semibold text-slate-800 focus:outline-none focus:border-brand-green-accent focus:ring-1 focus:ring-brand-green-accent transition-all duration-200"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 items-center gap-2">
            <label className="text-xs font-bold text-slate-600 sm:col-span-1">
              Jenis Kelamin
            </label>
            <div className="sm:col-span-2">
              <select 
                value={gender}
                onChange={(e) => setGender(e.target.value)}
                className="w-full bg-white border border-slate-200 hover:border-slate-300 rounded-xl px-4 py-2.5 text-xs font-semibold text-slate-800 focus:outline-none focus:border-brand-green-accent focus:ring-1 focus:ring-brand-green-accent transition-all duration-200 cursor-pointer"
              >
                {GENDER_OPTIONS.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 items-center gap-2">
            <label className="text-xs font-bold text-slate-600 sm:col-span-1">
              Tanggal Lahir
            </label>
            <div className="sm:col-span-2">
              <input 
                type="date" 
                value={birthDate}
                onChange={(e) => setBirthDate(e.target.value)}
                className="w-full bg-white border border-slate-200 hover:border-slate-300 rounded-xl px-4 py-2.5 text-xs font-semibold text-slate-800 focus:outline-none focus:border-brand-green-accent focus:ring-1 focus:ring-brand-green-accent transition-all duration-200"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 items-center gap-2">
            <label className="text-xs font-bold text-slate-600 sm:col-span-1">
              Pekerjaan
            </label>
            <div className="sm:col-span-2">
              <select 
                value={job}
                onChange={(e) => setJob(e.target.value)}
                className="w-full bg-white border border-slate-200 hover:border-slate-300 rounded-xl px-4 py-2.5 text-xs font-semibold text-slate-850 focus:outline-none focus:border-brand-green-accent focus:ring-1 focus:ring-brand-green-accent transition-all duration-200 cursor-pointer"
              >
                <option value="">Pilih pekerjaan</option>
                {JOB_OPTIONS.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 items-center gap-2">
            <label className="text-xs font-bold text-slate-600 sm:col-span-1">
              Kota Asal
            </label>
            <div className="sm:col-span-2">
              <select 
                value={city}
                onChange={(e) => setCity(e.target.value)}
                className="w-full bg-white border border-slate-200 hover:border-slate-300 rounded-xl px-4 py-2.5 text-xs font-semibold text-slate-850 focus:outline-none focus:border-brand-green-accent focus:ring-1 focus:ring-brand-green-accent transition-all duration-200 cursor-pointer"
              >
                <option value="">Pilih kota asal</option>
                {CITY_OPTIONS.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 items-center gap-2">
            <label className="text-xs font-bold text-slate-600 sm:col-span-1">
              Status
            </label>
            <div className="sm:col-span-2">
              <select 
                value={maritalStatus}
                onChange={(e) => setMaritalStatus(e.target.value)}
                className="w-full bg-white border border-slate-200 hover:border-slate-300 rounded-xl px-4 py-2.5 text-xs font-semibold text-slate-850 focus:outline-none focus:border-brand-green-accent focus:ring-1 focus:ring-brand-green-accent transition-all duration-200 cursor-pointer"
              >
                <option value="">Pilih status</option>
                {STATUS_OPTIONS.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 items-center gap-2">
            <label className="text-xs font-bold text-slate-600 sm:col-span-1">
              Pendidikan Terakhir
            </label>
            <div className="sm:col-span-2">
              <select 
                value={education}
                onChange={(e) => setEducation(e.target.value)}
                className="w-full bg-white border border-slate-200 hover:border-slate-300 rounded-xl px-4 py-2.5 text-xs font-semibold text-slate-850 focus:outline-none focus:border-brand-green-accent focus:ring-1 focus:ring-brand-green-accent transition-all duration-200 cursor-pointer"
              >
                <option value="">Pilih pendidikan terakhir</option>
                {EDUCATION_OPTIONS.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 items-center gap-2">
            <label className="text-xs font-bold text-slate-600 sm:col-span-1">
              Nomor Kontak Darurat
            </label>
            <div className="sm:col-span-2">
              <input 
                type="text" 
                value={emergencyPhone}
                onChange={(e) => setEmergencyPhone(e.target.value)}
                placeholder="+62"
                className="w-full bg-white border border-slate-200 hover:border-slate-300 rounded-xl px-4 py-2.5 text-xs font-semibold text-slate-800 focus:outline-none focus:border-brand-green-accent focus:ring-1 focus:ring-brand-green-accent transition-all duration-200"
              />
            </div>
          </div>

          <div className="flex justify-end mt-4">
            <button
              type="submit"
              disabled={isLoading}
              className="flex items-center gap-2 bg-brand-green hover:bg-brand-green-hover disabled:bg-slate-400 text-white text-xs font-bold py-3 px-6 rounded-xl shadow-md transition-all cursor-pointer"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Menyimpan...</span>
                </>
              ) : (
                <>
                  <Save className="w-4 h-4" />
                  <span>Simpan Perubahan</span>
                </>
              )}
            </button>
          </div>

        </div>

      </div>
    </form>
  );
}
