import { useState, useRef } from "react";
import { 
  Mail, 
  Phone, 
  CreditCard, 
  CheckCircle2, 
  Loader2,
  Camera
} from "lucide-react";
import { showAlert } from "../../utils/alerts";

interface ProfileVerificationProps {
  email?: string;
  phone?: string;
}

export function ProfileVerification({
  email = "budi.santoso@email.com",
  phone = "+6281234567890",
}: ProfileVerificationProps) {
  const [identityType, setIdentityType] = useState("");
  const [idCardFile, setIdCardFile] = useState<File | null>(null);
  const [idCardPreview, setIdCardPreview] = useState("");
  const [selfieFile, setSelfieFile] = useState<File | null>(null);
  const [selfiePreview, setSelfiePreview] = useState("");
  const [agreed, setAgreed] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const idCardInputRef = useRef<HTMLInputElement>(null);
  const selfieInputRef = useRef<HTMLInputElement>(null);

  const handleIdCardChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      showAlert("error", "File Terlalu Besar", "Maksimal ukuran foto kartu identitas adalah 5 Megabytes.");
      return;
    }

    setIdCardFile(file);
    setIdCardPreview(URL.createObjectURL(file));
  };

  const handleSelfieChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      showAlert("error", "File Terlalu Besar", "Maksimal ukuran foto selfie adalah 5 Megabytes.");
      return;
    }

    setSelfieFile(file);
    setSelfiePreview(URL.createObjectURL(file));
  };

  const handleVerifyIdentity = async () => {
    if (!identityType) {
      showAlert("warning", "Jenis Identitas Belum Pilih", "Silakan pilih jenis kartu identitas terlebih dahulu.");
      return;
    }
    if (!idCardFile) {
      showAlert("warning", "Foto Identitas Belum Diunggah", "Silakan unggah foto Kartu Identitas Anda.");
      return;
    }
    if (!selfieFile) {
      showAlert("warning", "Foto Diri Belum Diunggah", "Silakan unggah foto diri Anda dengan Kartu Identitas.");
      return;
    }
    if (!agreed) {
      showAlert("warning", "Persetujuan Kebijakan", "Anda harus menyetujui pernyataan kebenaran data dan kebijakan privasi.");
      return;
    }

    setIsSaving(true);

    try {
      await new Promise((resolve) => setTimeout(resolve, 1500));
      showAlert(
        "success", 
        "Identitas Berhasil Dikirim", 
        "Dokumen identitas Anda telah berhasil dikirim dan sedang dalam proses peninjauan oleh admin."
      );
    } catch (err) {
      console.error(err);
      showAlert("error", "Gagal Mengirim", "Terjadi kesalahan saat mengirim dokumen identitas.");
    } finally {
      setIsSaving(false);
    }
  };

  const handleUbahClick = (type: string) => {
    showAlert("info", "Ubah Data Akun", `Fitur untuk mengubah ${type} Anda sedang dalam proses pengembangan.`);
  };

  return (
    <div className="flex flex-col gap-8 text-slate-800">
      <div className="border border-slate-200 rounded-3xl p-6 md:p-8 flex flex-col gap-6">
        <div className="flex flex-col gap-2">
          <h4 className="font-extrabold text-slate-800 text-sm md:text-base">
            Email dan Nomor Handphone
          </h4>
          <div className="text-[11px] text-slate-400 font-light leading-relaxed">
            <p className="font-bold text-slate-500 mb-0.5">Mengapa Verifikasi Penting?</p>
            <p>
              Verifikasi bisa mencegah akun kamu diretas oleh orang lain, Karena untuk mengakses akun tetap membutuhkan kode verifikasi yang hanya diketahui oleh Anda sehingga akun anda terjaga keamanannya.
            </p>
          </div>
        </div>

        <div className="flex flex-col gap-4">
          
          <div className="flex items-center justify-between border border-slate-100 rounded-2xl p-4 bg-slate-50/50">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 shrink-0">
                <Mail className="w-4 h-4" />
              </div>
              <div className="flex flex-col">
                <span className="text-xs font-extrabold text-slate-700">Email</span>
                <span className="text-xs text-slate-450 font-semibold">{email}</span>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0" />
              <button 
                type="button"
                onClick={() => handleUbahClick("Email")}
                className="bg-brand-green hover:bg-brand-green-hover text-white text-xs font-bold px-4 py-1.5 rounded-lg transition-colors cursor-pointer"
              >
                Ubah
              </button>
            </div>
          </div>

          <div className="flex items-center justify-between border border-slate-100 rounded-2xl p-4 bg-slate-50/50">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 shrink-0">
                <Phone className="w-4 h-4" />
              </div>
              <div className="flex flex-col">
                <span className="text-xs font-extrabold text-slate-700">Nomor Handphone</span>
                <span className="text-xs text-slate-450 font-semibold">{phone}</span>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0" />
              <button 
                type="button"
                onClick={() => handleUbahClick("Nomor Handphone")}
                className="bg-brand-green hover:bg-brand-green-hover text-white text-xs font-bold px-4 py-1.5 rounded-lg transition-colors cursor-pointer"
              >
                Ubah
              </button>
            </div>
          </div>

        </div>
      </div>

      <div className="border border-slate-200 rounded-3xl p-6 md:p-8 flex flex-col gap-6">
        <h4 className="font-extrabold text-slate-800 text-sm md:text-base">
          Verifikasi Identitas
        </h4>

        <div className="bg-slate-100 border-l-4 border-slate-400 p-4 rounded-r-2xl text-[11px] text-slate-500 leading-normal font-light">
          <p className="font-bold text-slate-700 mb-0.5">Lengkapi datamu agar proses pengajuan sewa lebih cepat.</p>
          <p>Kami berkomitmen sepenuhnya untuk melindungi informasi dan penggunaan data diri para pengguna kami.</p>
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-xs font-bold text-slate-700">
            Jenis Identitas
          </label>
          <select
            value={identityType}
            onChange={(e) => setIdentityType(e.target.value)}
            className="w-full md:max-w-xs bg-white border border-slate-200 hover:border-slate-350 rounded-xl px-4 py-2.5 text-xs font-semibold text-slate-800 focus:outline-none focus:border-brand-green-accent focus:ring-1 focus:ring-brand-green-accent transition-all duration-200 cursor-pointer"
          >
            <option value="">Pilih kartu identitas</option>
            <option value="KTP">KTP (Kartu Tanda Penduduk)</option>
            <option value="SIM">SIM (Surat Izin Mengemudi)</option>
            <option value="Paspor">Paspor</option>
          </select>
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-xs font-bold text-slate-700">
            Unggah foto Identitas
          </label>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            
            <div 
              onClick={() => idCardInputRef.current?.click()}
              className="border border-slate-200 hover:border-slate-350 bg-slate-50/50 hover:bg-slate-50 rounded-2xl p-6 h-36 flex flex-col items-center justify-center gap-2.5 cursor-pointer transition-all duration-200 relative overflow-hidden select-none"
            >
              {idCardPreview ? (
                <img 
                  src={idCardPreview} 
                  alt="Foto Kartu Identitas" 
                  className="w-full h-full object-contain"
                />
              ) : (
                <>
                  <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 shrink-0">
                    <CreditCard className="w-5 h-5" />
                  </div>
                  <span className="text-[11px] font-bold text-slate-500">Kartu Identitas</span>
                </>
              )}
              <input 
                type="file" 
                ref={idCardInputRef}
                onChange={handleIdCardChange}
                accept=".png,.jpg,.jpeg"
                className="hidden"
              />
            </div>

            <div 
              onClick={() => selfieInputRef.current?.click()}
              className="border border-slate-200 hover:border-slate-350 bg-slate-50/50 hover:bg-slate-50 rounded-2xl p-6 h-36 flex flex-col items-center justify-center gap-2.5 cursor-pointer transition-all duration-200 relative overflow-hidden select-none"
            >
              {selfiePreview ? (
                <img 
                  src={selfiePreview} 
                  alt="Foto Diri dengan KTP" 
                  className="w-full h-full object-contain"
                />
              ) : (
                <>
                  <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 shrink-0">
                    <Camera className="w-5 h-5" />
                  </div>
                  <span className="text-[11px] font-bold text-slate-500 text-center">Foto diri dengan Kartu Identitas</span>
                </>
              )}
              <input 
                type="file" 
                ref={selfieInputRef}
                onChange={handleSelfieChange}
                accept=".png,.jpg,.jpeg"
                className="hidden"
              />
            </div>

          </div>
        </div>

        <label className="flex items-start gap-2.5 cursor-pointer mt-2">
          <input
            type="checkbox"
            checked={agreed}
            onChange={(e) => setAgreed(e.target.checked)}
            className="w-4 h-4 rounded text-brand-green focus:ring-brand-green border-slate-300 mt-0.5 cursor-pointer"
          />
          <span className="text-[11px] text-slate-500 leading-normal font-light select-none">
            Dengan melanjutkan, saya menjamin data yang diberikan adalah benar dan menyetujui{" "}
            <span className="text-brand-green font-semibold hover:underline">kebijakan privasi</span>
          </span>
        </label>

        <button
          type="button"
          onClick={handleVerifyIdentity}
          disabled={isSaving}
          className="w-full bg-brand-green hover:bg-brand-green-hover disabled:bg-slate-400 text-white text-xs font-bold py-3 rounded-xl shadow-md flex items-center justify-center gap-2 transition-colors cursor-pointer"
        >
          {isSaving ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              <span>Menyimpan...</span>
            </>
          ) : (
            <span>Simpan</span>
          )}
        </button>

      </div>

    </div>
  );
}
