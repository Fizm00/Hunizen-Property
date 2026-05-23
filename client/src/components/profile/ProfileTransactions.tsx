import { useState } from "react";
import { 
  CreditCard, 
  Search, 
  CheckCircle2, 
  XCircle, 
  Clock, 
  Calendar, 
  Building,
  Download,
  AlertCircle
} from "lucide-react";
import { MOCK_TRANSACTIONS_DATA } from "../../constants/profile";
import type { TransactionItem } from "../../types/profile";

export function ProfileTransactions() {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("semua");

  const handleDownloadReceipt = (id: string) => {
    window.open(`/invoice/${id}`, "_blank");
  };

  const filteredTransactions = MOCK_TRANSACTIONS_DATA.filter((txn: TransactionItem) => {
    const matchesSearch = txn.propertyName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      txn.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      txn.type.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === "semua" || txn.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  const totalCount = MOCK_TRANSACTIONS_DATA.length;
  const failedCount = MOCK_TRANSACTIONS_DATA.filter((t) => t.status === "gagal").length;
  
  const successAmountVal = MOCK_TRANSACTIONS_DATA
    .filter((t) => t.status === "berhasil")
    .reduce((acc, t) => {
      const numeric = parseInt(t.amount.replace(/[^0-9]/g, ""));
      return acc + numeric;
    }, 0);

  const successAmount = new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0
  }).format(successAmountVal);

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-1.5">
        <h3 className="font-extrabold text-slate-800 text-lg md:text-xl flex items-center gap-2">
          <CreditCard className="w-5 h-5 text-brand-green" />
          <span>Riwayat Transaksi</span>
        </h3>
        <p className="text-xs text-slate-400 font-light leading-relaxed">
          Lihat seluruh catatan pembayaran sewa, deposit, serta pembayaran tagihan kost Anda secara rinci.
        </p>
      </div>

      <div className="w-full h-px bg-slate-100" />

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        
        <div className="bg-slate-50 border border-slate-200 p-4.5 rounded-2xl flex flex-col gap-1.5">
          <span className="text-[10px] text-slate-450 font-bold uppercase tracking-wider">Total Transaksi</span>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-black text-slate-800 tracking-tight">{totalCount}</span>
            <span className="text-xs font-semibold text-slate-400">kali</span>
          </div>
        </div>

        <div className="bg-slate-50 border border-slate-200 p-4.5 rounded-2xl flex flex-col gap-1.5">
          <span className="text-[10px] text-slate-455 font-bold uppercase tracking-wider flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
            Total Pengeluaran Sukses
          </span>
          <div className="flex items-baseline gap-1 text-emerald-700">
            <span className="text-2xl font-black tracking-tight">{successAmount}</span>
          </div>
        </div>

        <div className="bg-slate-50 border border-slate-200 p-4.5 rounded-2xl flex flex-col gap-1.5">
          <span className="text-[10px] text-slate-450 font-bold uppercase tracking-wider flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-red-500" />
            Pembayaran Gagal
          </span>
          <div className="flex items-baseline gap-2 text-red-650">
            <span className="text-2xl font-black tracking-tight">{failedCount}</span>
            <span className="text-xs font-semibold text-slate-400">kali</span>
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
            placeholder="Cari transaksi berdasarkan ID, nama kost..."
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
            <option value="berhasil">Berhasil</option>
            <option value="proses">Dalam Proses</option>
            <option value="gagal">Gagal</option>
          </select>
        </div>

      </div>

      <div className="flex flex-col gap-4">
        {filteredTransactions.length === 0 ? (
          <div className="flex flex-col items-center justify-center text-center p-12 border border-dashed border-slate-200 rounded-2xl bg-slate-50 gap-3">
            <AlertCircle className="w-8 h-8 text-slate-400" />
            <span className="text-xs text-slate-400 font-medium">Transaksi tidak ditemukan.</span>
          </div>
        ) : (
          filteredTransactions.map((txn: TransactionItem) => (
            <div 
              key={txn.id}
              className="bg-white border border-slate-200 rounded-2xl p-5 flex flex-col md:flex-row items-start md:items-center justify-between gap-5 transition-all hover:shadow-sm"
            >
              
              <div className="flex-1 flex flex-col gap-2">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="text-[8px] font-black text-brand-green bg-brand-green-light px-1.5 py-0.5 rounded border border-brand-green/10 uppercase tracking-wider">
                    {txn.id}
                  </span>
                  <span className="text-[10px] text-slate-400 font-bold flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5 text-slate-350" />
                    {txn.date}
                  </span>
                </div>

                <div className="flex flex-col gap-0.5">
                  <h4 className="font-extrabold text-slate-800 text-sm md:text-base leading-snug">
                    {txn.type}
                  </h4>
                  <div className="flex items-center gap-1.5 text-slate-500 text-xs font-semibold mt-0.5">
                    <Building className="w-3.5 h-3.5 text-slate-350" />
                    <span>{txn.propertyName} &bull; {txn.roomName}</span>
                  </div>
                </div>

                <div className="flex items-center gap-1 text-[11px] text-slate-450 font-bold uppercase tracking-wider">
                  <span className="text-slate-400">Metode:</span>
                  <span className="text-slate-600">{txn.method}</span>
                </div>
              </div>

              <div className="flex flex-col items-end justify-between self-stretch md:self-auto gap-4 shrink-0 border-t border-slate-100 md:border-t-0 pt-4 md:pt-0">
                
                <div className="flex md:flex-col items-center md:items-end justify-between w-full md:w-auto gap-2">
                  
                  {txn.status === "berhasil" && (
                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 bg-emerald-50 text-emerald-700 border border-emerald-250 rounded text-[9px] font-bold">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                      Berhasil
                    </span>
                  )}
                  {txn.status === "proses" && (
                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 bg-amber-50 text-amber-700 border border-amber-250 rounded text-[9px] font-bold">
                      <Clock className="w-3.5 h-3.5 text-amber-600 animate-spin" style={{ animationDuration: '3s' }} />
                      Proses
                    </span>
                  )}
                  {txn.status === "gagal" && (
                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 bg-red-50 text-red-700 border border-red-250 rounded text-[9px] font-bold">
                      <XCircle className="w-3.5 h-3.5 text-red-655" />
                      Gagal
                    </span>
                  )}

                  <span className="text-sm md:text-base font-extrabold text-slate-800">
                    {txn.amount}
                  </span>

                </div>

                {txn.status === "berhasil" ? (
                  <button
                    onClick={() => handleDownloadReceipt(txn.id)}
                    className="bg-brand-green hover:bg-brand-green-hover text-white text-xs font-bold py-2 px-3.5 rounded-lg flex items-center gap-1.5 transition-colors cursor-pointer border border-brand-green shadow-sm self-end"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Unduh Resi</span>
                  </button>
                ) : (
                  <div className="h-8 md:block hidden" />
                )}

              </div>

            </div>
          ))
        )}
      </div>

    </div>
  );
}
