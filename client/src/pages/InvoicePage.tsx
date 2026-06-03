import { useEffect, useState } from "react";
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
import { MOCK_BILLS_DATA, MOCK_TRANSACTIONS_DATA, MOCK_ACTIVE_RENT } from "../constants/profile";
import { billService } from "../services/billService";
import { transactionService } from "../services/transactionService";

interface InvoiceData {
  invoiceTitle: string;
  propertyName: string;
  roomName: string;
  amount: string;
  date: string;
  dueDate: string;
  status: "lunas" | "belum_bayar" | "gagal";
  paymentMethod: string;
  itemDescription: string;
  tenant?: {
    name: string;
    email: string;
    phone: string;
  };
}

export default function InvoicePage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [invoiceData, setInvoiceData] = useState<InvoiceData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    let isMounted = true;

    async function fetchInvoiceDetails() {
      if (!id) return;
      setLoading(true);

      try {
        // 1. Coba dapatkan Tagihan (Bill) dari database backend
        const bill = await billService.getBillById(id);
        if (isMounted && bill) {
          setInvoiceData({
            invoiceTitle: `Invoice ${bill.type || "Tagihan"}`,
            propertyName: bill.property?.title || "Kost Hunizen",
            roomName: bill.type || "Sewa Bulanan",
            amount: `Rp ${bill.amount.toLocaleString("id-ID")}`,
            date: bill.createdAt ? new Date(bill.createdAt).toLocaleDateString("id-ID", { day: "numeric", month: "long", year: "numeric" }) : "1 Mei 2026",
            dueDate: bill.dueDate ? new Date(bill.dueDate).toLocaleDateString("id-ID", { day: "numeric", month: "long", year: "numeric" }) : "-",
            status: bill.status === "belum_bayar" ? "belum_bayar" : "lunas",
            paymentMethod: bill.status === "lunas" ? "Transfer Bank / GoPay" : "Menunggu Pembayaran",
            itemDescription: bill.type || "Tagihan Sewa",
            tenant: bill.tenant ? {
              name: bill.tenant.name,
              email: bill.tenant.email,
              phone: bill.tenant.phone
            } : undefined
          });
          setLoading(false);
          return;
        }

        // 2. Coba dapatkan Transaksi (Transaction) dari database backend
        const txn = await transactionService.getTransactionById(id);
        if (isMounted && txn) {
          setInvoiceData({
            invoiceTitle: `Kuitansi Pembayaran ${txn.transactionType || "Transaksi"}`,
            propertyName: txn.property?.title || "Kost Hunizen",
            roomName: txn.transactionType || "Sewa Bulanan",
            amount: `Rp ${txn.amount.toLocaleString("id-ID")}`,
            date: txn.createdAt ? new Date(txn.createdAt).toLocaleDateString("id-ID", { day: "numeric", month: "long", year: "numeric" }) : "-",
            dueDate: txn.createdAt ? new Date(txn.createdAt).toLocaleDateString("id-ID", { day: "numeric", month: "long", year: "numeric" }) : "-",
            status: txn.status === "berhasil" ? "lunas" : txn.status === "gagal" ? "gagal" : "belum_bayar",
            paymentMethod: txn.paymentMethod ? txn.paymentMethod.toUpperCase() : "GOPAY",
            itemDescription: txn.transactionType || "Sewa Kamar",
            tenant: txn.tenant ? {
              name: txn.tenant.name,
              email: txn.tenant.email,
              phone: txn.tenant.phone
            } : undefined
          });
          setLoading(false);
          return;
        }

        // 3. Fallback ke mockup jika ID bukan format MongoDB ObjectId
        if (isMounted) {
          const billMatch = MOCK_BILLS_DATA.find((b) => b.id === id);
          if (billMatch) {
            setInvoiceData({
              invoiceTitle: `Invoice ${billMatch.type}`,
              propertyName: billMatch.propertyName,
              roomName: billMatch.roomName,
              amount: billMatch.amount,
              date: "1 Mei 2026",
              dueDate: billMatch.dueDate,
              status: billMatch.status === "belum_bayar" ? "belum_bayar" : "lunas",
              paymentMethod: billMatch.status === "lunas" ? "Transfer Bank (Auto-Debet)" : "Menunggu Pembayaran",
              itemDescription: billMatch.type,
            });
          } else {
            const txnMatch = MOCK_TRANSACTIONS_DATA.find((t) => t.id === id);
            if (txnMatch) {
              setInvoiceData({
                invoiceTitle: `Kuitansi Pembayaran ${txnMatch.type}`,
                propertyName: txnMatch.propertyName,
                roomName: txnMatch.roomName,
                amount: txnMatch.amount,
                date: txnMatch.date,
                dueDate: txnMatch.date,
                status: txnMatch.status === "berhasil" ? "lunas" : txnMatch.status === "gagal" ? "gagal" : "belum_bayar",
                paymentMethod: txnMatch.method,
                itemDescription: txnMatch.type,
              });
            } else {
              // Default fallback
              setInvoiceData({
                invoiceTitle: "Invoice Pembayaran",
                propertyName: MOCK_ACTIVE_RENT.propertyName,
                roomName: MOCK_ACTIVE_RENT.roomName,
                amount: MOCK_ACTIVE_RENT.price,
                date: MOCK_ACTIVE_RENT.startDate,
                dueDate: MOCK_ACTIVE_RENT.nextPaymentDate,
                status: "lunas",
                paymentMethod: "Auto-Debet Bank",
                itemDescription: "Sewa Bulanan Kost",
              });
            }
          }
        }
      } catch (err) {
        console.error("Gagal mengambil detail invoice dari database:", err);
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    }

    fetchInvoiceDetails();
    return () => {
      isMounted = false;
    };
  }, [id]);

  const savedUser = localStorage.getItem("user");
  const currentUser = savedUser ? JSON.parse(savedUser) : { name: "Budi Santoso", email: "budi.santoso@email.com", phone: "+6281234567890" };
  const user = invoiceData?.tenant || currentUser;

  const handlePrint = () => {
    window.print();
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center p-8">
        <div className="flex flex-col items-center gap-3">
          <div className="w-10 h-10 border-4 border-zinc-300 border-t-brand-green rounded-full animate-spin" />
          <span className="text-sm font-semibold text-slate-500">Memuat rincian invoice...</span>
        </div>
      </div>
    );
  }

  if (!invoiceData) {
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-8 gap-4 text-center">
        <h2 className="text-xl font-bold text-slate-800">Invoice Tidak Ditemukan</h2>
        <button
          onClick={() => navigate(-1)}
          className="px-6 py-2.5 bg-brand-green hover:bg-brand-green-hover text-white text-xs font-bold rounded-full cursor-pointer"
        >
          Kembali
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 font-sans antialiased py-8 px-4 sm:px-6">
      
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

        <div className="print-container bg-white border border-slate-300 rounded-4xl p-8 md:p-12 shadow-sm flex flex-col gap-8">
          
          <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-6 border-b border-slate-100 pb-8">
            <div className="flex flex-col gap-1">
              <span className="text-xl font-black text-brand-green tracking-tight">HUNIZEN</span>
              <h2 className="text-xs font-black text-slate-800 uppercase tracking-wider mt-1 bg-slate-50 border border-slate-200 px-2 py-1 rounded w-max">
                {invoiceData.invoiceTitle}
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
              
              {invoiceData.status === "lunas" && (
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-emerald-50 text-emerald-800 border border-emerald-250 text-xs font-bold rounded-lg uppercase tracking-wider">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  LUNAS
                </span>
              )}
              {invoiceData.status === "belum_bayar" && (
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-amber-50 text-amber-800 border border-amber-250 text-xs font-bold rounded-lg uppercase tracking-wider">
                  <AlertCircle className="w-4 h-4 text-amber-600 animate-pulse" />
                  BELUM DIBAYAR
                </span>
              )}
              {invoiceData.status === "gagal" && (
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-red-50 text-red-800 border border-red-250 text-xs font-bold rounded-lg uppercase tracking-wider">
                  <XCircle className="w-4 h-4 text-red-600" />
                  GAGAL
                </span>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-xs font-semibold text-slate-600">
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

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs font-semibold border-y border-slate-100 py-6 text-slate-600">
            <div className="flex flex-col gap-0.5">
              <span className="text-[9px] text-slate-400 font-bold uppercase">Tanggal Terbit</span>
              <span className="text-slate-800 font-extrabold flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5 text-slate-400" />
                {invoiceData.date}
              </span>
            </div>
            <div className="flex flex-col gap-0.5">
              <span className="text-[9px] text-slate-400 font-bold uppercase">Jatuh Tempo</span>
              <span className="text-slate-800 font-extrabold flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5 text-slate-400" />
                {invoiceData.dueDate}
              </span>
            </div>
            <div className="flex flex-col gap-0.5">
              <span className="text-[9px] text-slate-400 font-bold uppercase">Metode Pembayaran</span>
              <span className="text-slate-800 font-extrabold flex items-center gap-1">
                <CreditCard className="w-3.5 h-3.5 text-slate-400" />
                {invoiceData.paymentMethod}
              </span>
            </div>
            <div className="flex flex-col gap-0.5">
              <span className="text-[9px] text-slate-400 font-bold uppercase">Kategori Hunian</span>
              <span className="text-slate-800 font-extrabold">Kost</span>
            </div>
          </div>

          <div className="flex flex-col gap-2 mt-2">
            <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Rincian Tagihan</span>
            
            <div className="bg-slate-50 border border-slate-200 rounded-t-xl px-4 py-3 grid grid-cols-12 text-xs font-bold text-slate-500">
              <span className="col-span-8 sm:col-span-9">Item / Deskripsi Tagihan</span>
              <span className="col-span-4 sm:col-span-3 text-right">Jumlah (Rupiah)</span>
            </div>

            <div className="border-x border-b border-slate-200 rounded-b-xl px-4 py-5 grid grid-cols-12 text-xs font-semibold text-slate-700 gap-y-3">
              <div className="col-span-8 sm:col-span-9 flex flex-col gap-1.5">
                <span className="text-sm font-extrabold text-slate-850">{invoiceData.itemDescription}</span>
                <span className="text-xs text-slate-450 leading-relaxed font-normal">
                  Properti: <b>{invoiceData.propertyName}</b><br />
                  Unit Kamar: <b>{invoiceData.roomName}</b>
                </span>
              </div>
              <span className="col-span-4 sm:col-span-3 text-right font-extrabold text-sm text-slate-850 self-center">
                {invoiceData.amount}
              </span>
            </div>

            <div className="bg-slate-50 border border-slate-200 rounded-xl px-4 py-4.5 grid grid-cols-12 text-xs font-black text-slate-800 mt-2">
              <span className="col-span-8 sm:col-span-9 text-base font-extrabold text-slate-850">Total Pembayaran</span>
              <span className="col-span-4 sm:col-span-3 text-right text-base font-black text-brand-green">
                {invoiceData.amount}
              </span>
            </div>
          </div>

          <div className="border-t border-slate-100 pt-6 flex flex-col gap-3 text-[10px] text-slate-450 font-normal leading-relaxed">
            <span className="font-bold text-slate-500 uppercase tracking-wide">Ketentuan & Kebijakan Hunizen:</span>
            <ul className="list-disc pl-4 flex flex-col gap-1">
              <li>Pembayaran tagihan sewa dilakukan paling lambat pada tanggal jatuh tempo yang tertera di atas.</li>
              <li>Bukti transfer bank / resi pembayaran ini adalah sah dan diakui oleh pihak pengelola Hunizen Property.</li>
              <li>Jika Anda memiliki pertanyaan mengenai rincian tagihan ini, silakan hubungi Customer Support Hunizen atau pihak pengelola kost secara langsung.</li>
            </ul>
          </div>

        </div>

      </div>

    </div>
  );
}
