import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { 
  Printer, 
  ArrowLeft, 
  CheckCircle2, 
  AlertCircle, 
  XCircle, 
  Building,
  CreditCard,
  Calendar,
  User
} from "lucide-react";
import { MOCK_BILLS_DATA, MOCK_TRANSACTIONS_DATA, RENT_HISTORY_DATA, MOCK_ACTIVE_RENT } from "../constants/profile";

export default function InvoicePage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Retrieve user session info for the invoice
  const savedUser = localStorage.getItem("user");
  const user = savedUser ? JSON.parse(savedUser) : { name: "Budi Santoso", email: "budi.santoso@email.com", phone: "+6281234567890" };

  // Attempt to find the invoice details from mock datasets
  let invoiceTitle = "Invoice Pembayaran";
  let propertyName = MOCK_ACTIVE_RENT.propertyName;
  let roomName = MOCK_ACTIVE_RENT.roomName;
  let amount = MOCK_ACTIVE_RENT.price;
  let date = MOCK_ACTIVE_RENT.startDate;
  let dueDate = MOCK_ACTIVE_RENT.nextPaymentDate;
  let status: "lunas" | "belum_bayar" | "gagal" = "lunas";
  let paymentMethod = "Auto-Debet Bank";
  let itemDescription = "Sewa Bulanan Kost";

  // Check in Bills
  const billMatch = MOCK_BILLS_DATA.find((b) => b.id === id);
  if (billMatch) {
    invoiceTitle = `Invoice ${billMatch.type}`;
    propertyName = billMatch.propertyName;
    roomName = billMatch.roomName;
    amount = billMatch.amount;
    date = "1 Mei 2026"; // Mock billing date
    dueDate = billMatch.dueDate;
    status = billMatch.status === "belum_bayar" ? "belum_bayar" : "lunas";
    paymentMethod = billMatch.status === "lunas" ? "Transfer Bank (Auto-Debet)" : "Menunggu Pembayaran";
    itemDescription = billMatch.type;
  } else {
    // Check in Transactions
    const txnMatch = MOCK_TRANSACTIONS_DATA.find((t) => t.id === id);
    if (txnMatch) {
      invoiceTitle = `Kuitansi Pembayaran ${txnMatch.type}`;
      propertyName = txnMatch.propertyName;
      roomName = txnMatch.roomName;
      amount = txnMatch.amount;
      date = txnMatch.date;
      dueDate = txnMatch.date;
      status = txnMatch.status === "berhasil" ? "lunas" : txnMatch.status === "gagal" ? "gagal" : "belum_bayar";
      paymentMethod = txnMatch.method;
      itemDescription = txnMatch.type;
    } else {
      // Check in Rent History requests
      const rentMatch = RENT_HISTORY_DATA.find((r) => r.id === id);
      if (rentMatch) {
        invoiceTitle = "Invoice Booking Sewa Kost";
        propertyName = rentMatch.propertyName;
        roomName = rentMatch.roomType;
        amount = rentMatch.price;
        date = rentMatch.applyDate;
        dueDate = rentMatch.startDate;
        status = rentMatch.status === "disetujui" ? "lunas" : rentMatch.status === "pending" ? "belum_bayar" : "gagal";
        paymentMethod = "GoPay";
        itemDescription = "Booking DP Sewa Kost";
      }
    }
  }

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 font-sans antialiased py-8 px-4 sm:px-6">
      
      {/* Print-specific style layout overrides */}
      <style dangerouslySetInnerHTML={{__html: `
        @media print {
          body {
            background-color: white !important;
            color: black !important;
          }
          .no-print {
            display: none !important;
          }
          .print-container {
            border: none !important;
            box-shadow: none !important;
            padding: 0 !important;
            margin: 0 !important;
            max-width: 100% !important;
          }
        }
      `}} />

      <div className="max-w-3xl mx-auto flex flex-col gap-6">
        
        {/* Navigation & Action Bar (Hidden in Print) */}
        <div className="no-print flex items-center justify-between bg-white border border-slate-200 rounded-2xl p-4 shadow-sm">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-1.5 text-xs font-bold text-slate-600 hover:text-slate-850 cursor-pointer transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Kembali</span>
          </button>
          
          <button
            onClick={handlePrint}
            className="bg-brand-green hover:bg-brand-green-hover text-white text-xs font-bold py-2.5 px-5 rounded-xl flex items-center gap-2 cursor-pointer transition-colors border border-brand-green shadow-sm"
          >
            <Printer className="w-4 h-4" />
            <span>Cetak & Unduh PDF</span>
          </button>
        </div>

        {/* Invoice Main Sheet Container */}
        <div className="print-container bg-white border border-slate-300 rounded-[2rem] p-8 md:p-12 shadow-sm flex flex-col gap-8">
          
          {/* Header Section: Logo & Status Tag */}
          <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-6 border-b border-slate-100 pb-8">
            <div className="flex flex-col gap-1">
              <span className="text-xl font-black text-brand-green tracking-tight">HUNIZEN</span>
              <h2 className="text-xs font-black text-slate-800 uppercase tracking-wider mt-1 bg-slate-50 border border-slate-200 px-2 py-1 rounded w-max">
                {invoiceTitle}
              </h2>
              <p className="text-[10px] text-slate-400 font-medium mt-1">
                Hunian Kost Nyaman & Transaksi Aman
              </p>
            </div>
            
            <div className="flex flex-col sm:items-end gap-2.5">
              <div className="flex flex-col sm:items-end">
                <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">No. Dokumen</span>
                <span className="text-sm font-black text-slate-800">{id}</span>
              </div>
              
              {/* Status Badge */}
              {status === "lunas" && (
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-emerald-50 text-emerald-800 border border-emerald-250 text-xs font-bold rounded-lg uppercase tracking-wider">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  LUNAS
                </span>
              )}
              {status === "belum_bayar" && (
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-amber-50 text-amber-800 border border-amber-250 text-xs font-bold rounded-lg uppercase tracking-wider">
                  <AlertCircle className="w-4 h-4 text-amber-600 animate-pulse" />
                  BELUM DIBAYAR
                </span>
              )}
              {status === "gagal" && (
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-red-50 text-red-800 border border-red-250 text-xs font-bold rounded-lg uppercase tracking-wider">
                  <XCircle className="w-4 h-4 text-red-600" />
                  GAGAL
                </span>
              )}
            </div>
          </div>

          {/* Details Section: From / To */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-xs font-semibold text-slate-600">
            
            {/* Left: Supplier info */}
            <div className="flex flex-col gap-2 bg-slate-50 border border-slate-200 p-5 rounded-2xl">
              <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Penerbit Tagihan</span>
              <div className="flex flex-col gap-1 text-slate-700">
                <span className="font-extrabold text-sm text-slate-850 flex items-center gap-1.5">
                  <Building className="w-4 h-4 text-brand-green" />
                  Hunizen Property Management
                </span>
                <span>Duren Sawit, Jakarta Timur</span>
                <span>DKI Jakarta, Indonesia</span>
                <span>Hubungi: +62 812-3456-7890</span>
              </div>
            </div>

            {/* Right: Tenant info */}
            <div className="flex flex-col gap-2 bg-slate-50 border border-slate-200 p-5 rounded-2xl">
              <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Penerima Tagihan (Penyewa)</span>
              <div className="flex flex-col gap-1 text-slate-700">
                <span className="font-extrabold text-sm text-slate-850 flex items-center gap-1.5">
                  <User className="w-4 h-4 text-brand-green" />
                  {user.name}
                </span>
                <span>Telepon: {user.phone}</span>
                <span>Email: {user.email}</span>
                <span>Status: Terverifikasi Hunizen</span>
              </div>
            </div>

          </div>

          {/* Dates & Payments Stats Table */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs font-semibold border-y border-slate-100 py-6 text-slate-600">
            <div className="flex flex-col gap-0.5">
              <span className="text-[9px] text-slate-400 font-bold uppercase">Tanggal Terbit</span>
              <span className="text-slate-800 font-extrabold flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5 text-slate-400" />
                {date}
              </span>
            </div>
            <div className="flex flex-col gap-0.5">
              <span className="text-[9px] text-slate-400 font-bold uppercase">Jatuh Tempo</span>
              <span className="text-slate-800 font-extrabold flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5 text-slate-400" />
                {dueDate}
              </span>
            </div>
            <div className="flex flex-col gap-0.5">
              <span className="text-[9px] text-slate-400 font-bold uppercase">Metode Pembayaran</span>
              <span className="text-slate-800 font-extrabold flex items-center gap-1">
                <CreditCard className="w-3.5 h-3.5 text-slate-400" />
                {paymentMethod}
              </span>
            </div>
            <div className="flex flex-col gap-0.5">
              <span className="text-[9px] text-slate-400 font-bold uppercase">Kategori Hunian</span>
              <span className="text-slate-800 font-extrabold">Kost Putra</span>
            </div>
          </div>

          {/* Itemized Table */}
          <div className="flex flex-col gap-2 mt-2">
            <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Rincian Tagihan</span>
            
            {/* Table Header */}
            <div className="bg-slate-50 border border-slate-200 rounded-t-xl px-4 py-3 grid grid-cols-12 text-xs font-bold text-slate-500">
              <span className="col-span-8 sm:col-span-9">Item / Deskripsi Tagihan</span>
              <span className="col-span-4 sm:col-span-3 text-right">Jumlah (Rupiah)</span>
            </div>

            {/* Table Body Row */}
            <div className="border-x border-b border-slate-200 rounded-b-xl px-4 py-5 grid grid-cols-12 text-xs font-semibold text-slate-700 gap-y-3">
              <div className="col-span-8 sm:col-span-9 flex flex-col gap-1.5">
                <span className="text-sm font-extrabold text-slate-850">{itemDescription}</span>
                <span className="text-xs text-slate-450 leading-relaxed font-normal">
                  Properti: <b>{propertyName}</b><br />
                  Unit Kamar: <b>{roomName}</b>
                </span>
              </div>
              <span className="col-span-4 sm:col-span-3 text-right font-extrabold text-sm text-slate-850 self-center">
                {amount}
              </span>
            </div>

            {/* Total Row */}
            <div className="bg-slate-50 border border-slate-200 rounded-xl px-4 py-4.5 grid grid-cols-12 text-xs font-black text-slate-800 mt-2">
              <span className="col-span-8 sm:col-span-9 text-base font-extrabold text-slate-850">Total Pembayaran</span>
              <span className="col-span-4 sm:col-span-3 text-right text-base font-black text-brand-green">
                {amount}
              </span>
            </div>
          </div>

          {/* Footer Terms & Legal Notes */}
          <div className="border-t border-slate-100 pt-6 flex flex-col gap-3 text-[10px] text-slate-450 font-normal leading-relaxed">
            <span className="font-bold text-slate-500 uppercase tracking-wide">Ketentuan & Kebijakan Hunizen:</span>
            <ul className="list-disc pl-4 flex flex-col gap-1">
              <li>Pembayaran tagihan kost dilakukan paling lambat pada tanggal jatuh tempo yang tertera di atas.</li>
              <li>Bukti transfer bank / resi pembayaran ini adalah sah dan diakui oleh pihak pengelola Hunizen Property.</li>
              <li>Jika Anda memiliki pertanyaan mengenai rincian tagihan ini, silakan hubungi Customer Support Hunizen atau pihak pengelola kost secara langsung.</li>
            </ul>
          </div>

        </div>

      </div>

    </div>
  );
}
