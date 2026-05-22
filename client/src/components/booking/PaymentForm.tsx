import { CreditCard, Wallet, ShieldCheck, CheckCircle2 } from "lucide-react";

// Import payment logos from assets
import gopayLogo from "../../assets/paymentasset/gopay.svg";
import shopeepayLogo from "../../assets/paymentasset/shoppeepay.svg";
import danaLogo from "../../assets/paymentasset/dana.svg";
import ovoLogo from "../../assets/paymentasset/ovo.svg";
import linkajaLogo from "../../assets/paymentasset/linkaja.svg";
import flipLogo from "../../assets/paymentasset/flip.svg";
import bniLogo from "../../assets/paymentasset/bni.svg";
import mandiriLogo from "../../assets/paymentasset/mandiri.svg";
import briLogo from "../../assets/paymentasset/bri.svg";

interface PaymentFormProps {
  paymentMethod: string;
  setPaymentMethod: (method: string) => void;
  onSubmit: (e: React.FormEvent) => void;
  isSubmitting: boolean;
}

export default function PaymentForm({
  paymentMethod,
  setPaymentMethod,
  onSubmit,
  isSubmitting
}: PaymentFormProps) {
  
  // Logos using official SVGs provided in assets
  const logos: Record<string, React.ReactNode> = {
    gopay: <img src={gopayLogo} alt="GoPay" className="h-6 w-auto max-h-full object-contain filter brightness-95" />,
    shopeepay: <img src={shopeepayLogo} alt="ShopeePay" className="h-6.5 w-auto max-h-full object-contain" />,
    dana: <img src={danaLogo} alt="DANA" className="h-6 w-auto max-h-full object-contain" />,
    ovo: <img src={ovoLogo} alt="OVO" className="h-5.5 w-auto max-h-full object-contain" />,
    linkaja: <img src={linkajaLogo} alt="LinkAja" className="h-7.5 w-auto max-h-full object-contain" />,
    flip: <img src={flipLogo} alt="Flip" className="h-5.5 w-auto max-h-full object-contain" />,
    bni: <img src={bniLogo} alt="BNI" className="h-5.5 w-auto max-h-full object-contain" />,
    mandiri: <img src={mandiriLogo} alt="Mandiri" className="h-5.5 w-auto max-h-full object-contain" />,
    bri: <img src={briLogo} alt="BRI" className="h-6.5 w-auto max-h-full object-contain" />,
    cod: (
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 rounded-full bg-brand-green-light flex items-center justify-center text-brand-green">
          <Wallet className="w-4.5 h-4.5" />
        </div>
        <div className="text-left">
          <h4 className="font-extrabold text-sm text-slate-800">COD (Cash on Delivery)</h4>
          <p className="text-[10px] text-slate-400 font-semibold mt-0.5">Bayar tunai secara langsung di lokasi saat serah terima kunci / check-in</p>
        </div>
      </div>
    )
  };

  const ewallets = [
    { id: "gopay", label: "GoPay" },
    { id: "shopeepay", label: "ShopeePay" },
    { id: "dana", label: "DANA" },
    { id: "ovo", label: "OVO" },
    { id: "linkaja", label: "LinkAja" },
    { id: "flip", label: "Flip" }
  ];

  const mbanks = [
    { id: "bni", label: "BNI" },
    { id: "mandiri", label: "Mandiri" },
    { id: "bri", label: "BRI" }
  ];

  return (
    <div className="bg-white border border-slate-200/60 rounded-3xl p-6 md:p-8 shadow-sm flex flex-col gap-6 w-full">
      {/* Header section */}
      <div className="border-b border-slate-100 pb-4">
        <h2 className="text-lg font-black text-slate-800 flex items-center gap-2">
          <CreditCard className="w-5 h-5 text-black" />
          Metode Pembayaran
        </h2>
        <p className="text-xs text-slate-400 mt-1">Silakan pilih opsi pembayaran untuk verifikasi sewa Anda</p>
      </div>

      <div className="flex flex-col gap-6">
        {/* E-Wallet Grid */}
        <div className="flex flex-col gap-3">
          <h3 className="text-xs font-black text-slate-500 uppercase tracking-wider">E-Wallet</h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {ewallets.map((wallet) => {
              const isSelected = paymentMethod === wallet.id;
              return (
                <button
                  key={wallet.id}
                  type="button"
                  onClick={() => setPaymentMethod(wallet.id)}
                  className={`h-20 px-3 border rounded-2xl flex flex-col items-center justify-center gap-1.5 transition-all cursor-pointer relative ${
                    isSelected
                      ? "border-brand-green bg-brand-green-light shadow-inner scale-[0.98]"
                      : "border-slate-200 bg-white hover:border-brand-green-accent hover:scale-[1.01]"
                  }`}
                >
                  <div className="h-8 flex items-center justify-center w-full">
                    {logos[wallet.id]}
                  </div>
                  <span
                    className={`text-[11px] font-bold transition-colors ${
                      isSelected ? "text-slate-800 font-extrabold" : "text-slate-500"
                    }`}
                  >
                    {wallet.label}
                  </span>
                  {isSelected && (
                    <div className="absolute top-2 right-2 text-brand-green">
                      <CheckCircle2 className="w-3.5 h-3.5 fill-brand-green stroke-white" />
                    </div>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* M-Banking Grid */}
        <div className="flex flex-col gap-3">
          <h3 className="text-xs font-black text-slate-500 uppercase tracking-wider">M-Banking / Transfer Virtual Account</h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {mbanks.map((bank) => {
              const isSelected = paymentMethod === bank.id;
              return (
                <button
                  key={bank.id}
                  type="button"
                  onClick={() => setPaymentMethod(bank.id)}
                  className={`h-20 px-3 border rounded-2xl flex flex-col items-center justify-center gap-1.5 transition-all cursor-pointer relative ${
                    isSelected
                      ? "border-brand-green bg-brand-green-light shadow-inner scale-[0.98]"
                      : "border-slate-200 bg-white hover:border-brand-green-accent hover:scale-[1.01]"
                  }`}
                >
                  <div className="h-8 flex items-center justify-center w-full">
                    {logos[bank.id]}
                  </div>
                  <span
                    className={`text-[11px] font-bold transition-colors ${
                      isSelected ? "text-slate-800 font-extrabold" : "text-slate-500"
                    }`}
                  >
                    {bank.label}
                  </span>
                  {isSelected && (
                    <div className="absolute top-2 right-2 text-brand-green">
                      <CheckCircle2 className="w-3.5 h-3.5 fill-brand-green stroke-white" />
                    </div>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* COD Option */}
        <div className="flex flex-col gap-3">
          <h3 className="text-xs font-black text-slate-500 uppercase tracking-wider">Bayar di Tempat</h3>
          <button
            type="button"
            onClick={() => setPaymentMethod("cod")}
            className={`p-4 border rounded-2xl flex items-center justify-between transition-all cursor-pointer relative text-left ${
              paymentMethod === "cod"
                ? "border-brand-green bg-brand-green-light shadow-inner scale-[0.98]"
                : "border-slate-200 bg-white hover:border-brand-green-accent hover:scale-[1.01]"
            }`}
          >
            {logos.cod}
            {paymentMethod === "cod" && (
              <div className="text-brand-green">
                <CheckCircle2 className="w-4 h-4 fill-brand-green stroke-white" />
              </div>
            )}
          </button>
        </div>
      </div>

      {/* Guaranteed Secure Info */}
      <div className="flex items-center gap-2.5 p-3.5 bg-slate-50 border border-slate-100 rounded-2xl mt-2">
        <ShieldCheck className="w-4.5 h-4.5 text-zinc-500 shrink-0" />
        <span className="text-[10.5px] text-zinc-500 font-semibold leading-normal">
          Seluruh metode pembayaran diproses secara aman menggunakan enkripsi industri standar 256-bit.
        </span>
      </div>

      {/* Submit Trigger Button */}
      <button
        type="button"
        onClick={onSubmit}
        disabled={isSubmitting}
        className="w-full py-4 bg-brand-green hover:bg-brand-green-hover disabled:bg-zinc-600 text-white text-sm font-bold rounded-full transition-all shadow-md active:scale-98 cursor-pointer border-0 mt-3 flex items-center justify-center gap-2"
      >
        {isSubmitting ? (
          <>
            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
            Memproses Pengajuan...
          </>
        ) : (
          "Konfirmasi & Bayar"
        )}
      </button>
    </div>
  );
}
