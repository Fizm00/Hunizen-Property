import { useState } from "react";
import { 
  Receipt, 
  Search, 
  CheckCircle2, 
  AlertCircle,
  CreditCard,
  Download,
  Calendar,
  Building} from "lucide-react";
import { MOCK_BILLS_DATA } from "../../constants/profile";
import type { BillItem } from "../../types/profile";

export function ProfileBills() {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("semua");

  const handlePayBill = (id: string) => {
    window.open(`/invoice/${id}`, "_blank");
  };

  const handleDownloadInvoice = (id: string) => {
    window.open(`/invoice/${id}`, "_blank");
  };

  const filteredBills = MOCK_BILLS_DATA.filter((bill: BillItem) => {
    const matchesSearch = bill.propertyName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      bill.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      bill.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
      bill.month.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === "semua" || bill.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  const unpaidCount = MOCK_BILLS_DATA.filter((b) => b.status === "belum_bayar").length;
  const unpaidAmountVal = MOCK_BILLS_DATA
    .filter((b) => b.status === "belum_bayar")
    .reduce((acc, b) => acc + parseInt(b.amount.replace(/[^0-9]/g, "")), 0);

  const unpaidAmount = new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0
  }).format(unpaidAmountVal);

  const paidCount = MOCK_BILLS_DATA.filter((b) => b.status === "lunas").length;
  const paidAmountVal = MOCK_BILLS_DATA
    .filter((b) => b.status === "lunas")
    .reduce((acc, b) => acc + parseInt(b.amount.replace(/[^0-9]/g, "")), 0);

  const paidAmount = new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0
  }).format(paidAmountVal);

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-1.5">
        <h3 className="font-extrabold text-slate-800 text-lg md:text-xl flex items-center gap-2">
          <Receipt className="w-5 h-5 text-brand-green" />
          <span>Tagihan Kost</span>
        </h3>
        <p className="text-xs text-slate-400 font-light leading-relaxed">
          Pantau tagihan kost berjalan, masa tenggang jatuh tempo, serta histori pembayaran tagihan sewa Anda.
        </p>
      </div>

      <div className="w-full h-px bg-slate-100" />

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        
        <div className="bg-amber-50 border border-amber-250 p-4.5 rounded-2xl flex flex-col gap-1.5">
          <span className="text-[10px] text-amber-800 font-bold uppercase tracking-wider flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse" />
            Tagihan Menunggu Pembayaran
          </span>
          <div className="flex items-baseline justify-between mt-1 gap-2">
            <span className="text-2xl font-black text-amber-900 tracking-tight">{unpaidAmount}</span>
            <span className="text-[11px] font-bold text-amber-800 bg-amber-100 px-2 py-0.5 rounded border border-amber-200">
              {unpaidCount} Tagihan Aktif
            </span>
          </div>
        </div>

        <div className="bg-slate-50 border border-slate-200 p-4.5 rounded-2xl flex flex-col gap-1.5">
          <span className="text-[10px] text-slate-450 font-bold uppercase tracking-wider flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
            Total Tagihan Terbayar
          </span>
          <div className="flex items-baseline justify-between mt-1 gap-2">
            <span className="text-2xl font-black text-slate-800 tracking-tight">{paidAmount}</span>
            <span className="text-[11px] font-bold text-slate-500 bg-slate-100 px-2 py-0.5 rounded border border-slate-200">
              {paidCount} Tagihan Lunas
            </span>
          </div>
        </div>

      </div>

      <div className="flex flex-col sm:flex-row gap-3 items-center">
        
        <div className="relative w-full sm:grow">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Cari tagihan berdasarkan ID, bulan sewa, tipe tagihan..."
            className="w-full text-xs font-semibold text-slate-700 placeholder:text-slate-400 border border-slate-250 hover:border-slate-355 rounded-xl pl-10 pr-4 py-3 focus:outline-none focus:border-brand-green focus:ring-1 focus:ring-brand-green/20 bg-white"
          />
        </div>

        <div className="w-full sm:w-44 shrink-0">
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="w-full text-xs font-semibold text-slate-700 border border-slate-250 rounded-xl p-3 focus:outline-none focus:border-brand-green focus:ring-1 focus:ring-brand-green/20 bg-white cursor-pointer"
          >
            <option value="semua">Semua Status</option>
            <option value="belum_bayar">Belum Dibayar</option>
            <option value="lunas">Lunas</option>
          </select>
        </div>

      </div>

      <div className="flex flex-col gap-4">
        {filteredBills.length === 0 ? (
          <div className="flex flex-col items-center justify-center text-center p-12 border border-dashed border-slate-200 rounded-2xl bg-slate-50 gap-3">
            <AlertCircle className="w-8 h-8 text-slate-400" />
            <span className="text-xs text-slate-400 font-medium">Tagihan tidak ditemukan.</span>
          </div>
        ) : (
          filteredBills.map((bill: BillItem) => (
            <div 
              key={bill.id}
              className="bg-white border border-slate-200 rounded-2xl p-5 flex flex-col md:flex-row items-start md:items-center justify-between gap-5 transition-all hover:shadow-sm"
            >
              <div className="flex-1 flex flex-col gap-2">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="text-[8px] font-black text-brand-green bg-brand-green-light px-1.5 py-0.5 rounded border border-brand-green/10 uppercase tracking-wider">
                    {bill.id}
                  </span>
                  <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider bg-slate-50 border border-slate-200 px-2 py-0.5 rounded">
                    Bulan: {bill.month}
                  </span>
                </div>

                <div className="flex flex-col gap-0.5">
                  <h4 className="font-extrabold text-slate-800 text-sm md:text-base leading-snug">
                    {bill.type}
                  </h4>
                  <div className="flex items-center gap-1.5 text-slate-500 text-xs font-semibold mt-0.5">
                    <Building className="w-3.5 h-3.5 text-slate-350" />
                    <span>{bill.propertyName} &bull; {bill.roomName}</span>
                  </div>
                </div>

                <div className="flex items-center gap-1 text-[11px] text-slate-450 font-bold uppercase tracking-wider">
                  <Calendar className="w-3.5 h-3.5 text-slate-350" />
                  <span className="text-slate-400">Jatuh Tempo:</span>
                  <span className={`${bill.status === "belum_bayar" ? "text-amber-700 font-extrabold" : "text-slate-650"}`}>
                    {bill.dueDate}
                  </span>
                </div>
              </div>

              <div className="flex flex-col items-end justify-between self-stretch md:self-auto gap-4 shrink-0 border-t border-slate-100 md:border-t-0 pt-4 md:pt-0">
                
                <div className="flex md:flex-col items-center md:items-end justify-between w-full md:w-auto gap-2">
                  
                  {bill.status === "belum_bayar" && (
                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 bg-amber-50 text-amber-700 border border-amber-200 rounded text-[9px] font-bold">
                      <AlertCircle className="w-3.5 h-3.5 text-amber-600 animate-pulse" />
                      Belum Dibayar
                    </span>
                  )}
                  {bill.status === "lunas" && (
                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 bg-emerald-50 text-emerald-700 border border-emerald-250 rounded text-[9px] font-bold">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                      Lunas
                    </span>
                  )}

                  <span className="text-sm md:text-base font-extrabold text-slate-800">
                    {bill.amount}
                  </span>

                </div>

                <div className="flex gap-2 w-full justify-end">
                  {bill.status === "belum_bayar" ? (
                    <button
                      onClick={() => handlePayBill(bill.id)}
                      className="bg-brand-green hover:bg-brand-green-hover text-white text-xs font-bold py-2 px-4 rounded-lg flex items-center gap-1.5 transition-colors cursor-pointer border border-brand-green shadow-sm"
                    >
                      <CreditCard className="w-3.5 h-3.5" />
                      <span>Bayar Sekarang</span>
                    </button>
                  ) : (
                    <>
                      <button
                        onClick={() => handleDownloadInvoice(bill.id)}
                        className="bg-slate-50 hover:bg-slate-100 text-slate-700 border border-slate-200 text-xs font-bold py-2 px-3.5 rounded-lg flex items-center gap-1.5 transition-colors cursor-pointer"
                      >
                        <Download className="w-3.5 h-3.5 text-slate-400" />
                        <span>Unduh Invoice</span>
                      </button>
                    </>
                  )}
                </div>

              </div>

            </div>
          ))
        )}
      </div>

    </div>
  );
}
