import { useState } from "react";
import { 
  MapPin, 
  User, 
  MessageSquare, 
  AlertCircle,
  CheckCircle2,
  FileText,
  Wrench,
  Clock,
  Check,
  ExternalLink,
  Home,
  Hourglass,
  AlertTriangle,
  Send
} from "lucide-react";
import { MOCK_ACTIVE_RENT, MOCK_COMPLAINTS_DATA } from "../../constants/profile";
import type { ComplaintItem } from "../../types/profile";
import { showAlert, showToast } from "../../utils/alerts";

export function ProfileMyKost() {
  const [complaints, setComplaints] = useState<ComplaintItem[]>(MOCK_COMPLAINTS_DATA);

  const [formCategory, setFormCategory] = useState("Fasilitas Kamar");
  const [formTitle, setFormTitle] = useState("");
  const [formDesc, setFormDesc] = useState("");

  const handleContactLandlord = () => {
    const text = `Halo, saya penyewa kamar ${MOCK_ACTIVE_RENT.roomName} ingin menanyakan perihal operasional kost.`;
    const url = `https://wa.me/${MOCK_ACTIVE_RENT.landlordPhone.replace(/[^0-9]/g, "")}?text=${encodeURIComponent(text)}`;
    window.open(url, "_blank");
  };

  const handleDownloadContract = () => {
    window.open(`/invoice/${MOCK_ACTIVE_RENT.id}`, "_blank");
  };

  const handleShowInvoiceDetails = () => {
    window.open(`/invoice/${MOCK_ACTIVE_RENT.id}`, "_blank");
  };

  const handleSubmitComplaint = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formTitle.trim() || !formDesc.trim()) {
      showToast("warning", "Harap isi semua kolom laporan pengaduan!");
      return;
    }

    const newId = `REP-${Math.floor(1000 + Math.random() * 9000)}`;
    const today = new Date();
    const dateFormatted = today.toLocaleDateString("id-ID", {
      day: "numeric",
      month: "long",
      year: "numeric"
    });

    const newComplaint: ComplaintItem = {
      id: newId,
      category: formCategory,
      title: formTitle.trim(),
      description: formDesc.trim(),
      date: dateFormatted,
      status: "baru"
    };

    setComplaints([newComplaint, ...complaints]);
    setFormTitle("");
    setFormDesc("");

    showAlert(
      "success",
      "Pengaduan Terkirim",
      `Laporan keluhan Anda dengan ID ${newId} berhasil dikirim ke pengelola. Kami akan segera menghubungi Anda untuk perbaikan.`
    );
  };

  return (
    <div className="flex flex-col gap-6">
      
      {/* 1. Header Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex flex-col gap-1.5">
          <h3 className="font-extrabold text-slate-800 text-lg md:text-xl flex items-center gap-2">
            <Home className="w-5 h-5 text-brand-green" />
            <span>Kos Saya</span>
          </h3>
          <p className="text-xs text-slate-400 font-light">
            Pantau status kontrak aktif, rincian kamar, tata tertib, serta hubungi pengelola jika ada keluhan kamar.
          </p>
        </div>
        <div className="flex items-center gap-2 self-start sm:self-auto">
          <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-emerald-50 text-emerald-700 border border-emerald-200 text-xs font-bold rounded-lg">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            Kontrak Aktif
          </span>
        </div>
      </div>

      <div className="w-full h-px bg-slate-100" />

      {/* 2. Lease Timeline Tracker */}
      <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5 flex flex-col gap-4">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
          <div>
            <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Masa Kontrak Sewa</span>
            <h4 className="font-extrabold text-slate-800 text-sm mt-0.5">Timeline Sewa Berjalan</h4>
          </div>
          <span className="text-xs font-extrabold text-brand-green bg-brand-green-light px-2.5 py-1 rounded-md border border-brand-green/10">
            Sisa Sewa: <b className="font-black text-brand-green">69 Hari Lagi</b> (2 Bulan Lebih)
          </span>
        </div>
        
        {/* Flat Progress Bar */}
        <div className="relative w-full h-3 bg-slate-200 rounded-md overflow-hidden border border-slate-350">
          <div 
            className="absolute top-0 left-0 h-full bg-brand-green rounded-md transition-all duration-500"
            style={{ width: "25%" }}
          />
        </div>

        <div className="flex justify-between items-center text-xs font-semibold text-slate-500">
          <div className="flex flex-col">
            <span className="text-slate-400 text-[10px] uppercase font-bold">Mulai Masuk</span>
            <span className="text-slate-700 font-bold">{MOCK_ACTIVE_RENT.startDate}</span>
          </div>
          <div className="flex flex-col items-center">
            <span className="text-slate-400 text-[10px] uppercase font-bold">Progress</span>
            <span className="text-brand-green font-black">Hari Ke-23 (25%)</span>
          </div>
          <div className="flex flex-col items-end">
            <span className="text-slate-400 text-[10px] uppercase font-bold">Selesai Kontrak</span>
            <span className="text-slate-700 font-bold">{MOCK_ACTIVE_RENT.endDate}</span>
          </div>
        </div>
      </div>

      {/* 3. Main Details Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* Left Side: Property Specs & Landlord Info (lg:col-span-5) */}
        <div className="lg:col-span-5 flex flex-col gap-6">
          
          {/* Property Visual Card */}
          <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm p-3 flex flex-col gap-4">
            <div className="relative rounded-xl overflow-hidden">
              <img 
                src={MOCK_ACTIVE_RENT.propertyImage} 
                alt={MOCK_ACTIVE_RENT.propertyName} 
                className="w-full h-44 object-cover bg-slate-50"
              />
              <div className="absolute top-3 left-3 bg-brand-green text-white text-[10px] font-black uppercase tracking-wider px-3 py-1 rounded">
                {MOCK_ACTIVE_RENT.roomName}
              </div>
            </div>
            
            <div className="px-1.5 pb-1 flex flex-col gap-3">
              <div>
                <h4 className="font-extrabold text-slate-800 text-sm sm:text-base leading-snug">
                  {MOCK_ACTIVE_RENT.propertyName}
                </h4>
                <div className="flex items-center gap-1 text-slate-400 text-xs font-semibold mt-1">
                  <MapPin className="w-3.5 h-3.5 shrink-0" />
                  <span>{MOCK_ACTIVE_RENT.location}</span>
                </div>
              </div>

              <div className="h-px bg-slate-100" />

              {/* Room Specifications Table */}
              <div className="grid grid-cols-2 gap-2 text-[11px] font-bold text-slate-655">
                <div className="bg-slate-50 border border-slate-200 p-2 rounded-lg flex flex-col gap-0.5">
                  <span className="text-[9px] text-slate-400 font-bold uppercase tracking-wider">Ukuran Kamar</span>
                  <span className="text-slate-800 font-extrabold">3 x 4 Meter</span>
                </div>
                <div className="bg-slate-50 border border-slate-200 p-2 rounded-lg flex flex-col gap-0.5">
                  <span className="text-[9px] text-slate-400 font-bold uppercase tracking-wider">Daya Listrik</span>
                  <span className="text-slate-800 font-extrabold">Token (900 VA)</span>
                </div>
                <div className="bg-slate-50 border border-slate-200 p-2 rounded-lg flex flex-col gap-0.5">
                  <span className="text-[9px] text-slate-400 font-bold uppercase tracking-wider">Tipe Air</span>
                  <span className="text-slate-800 font-extrabold">Sumur Bor</span>
                </div>
                <div className="bg-slate-50 border border-slate-200 p-2 rounded-lg flex flex-col gap-0.5">
                  <span className="text-[9px] text-slate-400 font-bold uppercase tracking-wider">Kamar Mandi</span>
                  <span className="text-slate-800 font-extrabold">Dalam (Shower)</span>
                </div>
              </div>

              <div className="h-px bg-slate-100" />

              {/* Room Facilities Tag List */}
              <div>
                <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block mb-1.5">Fasilitas Kamar</span>
                <div className="flex flex-wrap gap-1">
                  {["AC Split 1 PK", "Kasur Springbed", "Lemari Pakaian", "Meja Kerja", "WiFi 50 Mbps", "Kamar Mandi Dalam"].map((facility, idx) => (
                    <span 
                      key={idx} 
                      className="inline-flex items-center gap-1 px-2 py-0.5 bg-slate-50 text-slate-700 border border-slate-200 text-[10px] font-bold rounded"
                    >
                      <Check className="w-3 h-3 text-brand-green font-black" />
                      {facility}
                    </span>
                  ))}
                </div>
              </div>

            </div>
          </div>

          {/* Landlord Contact Box */}
          <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5 flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-brand-green text-white flex items-center justify-center font-extrabold shrink-0 border border-brand-green-accent">
                <User className="w-5 h-5" />
              </div>
              <div className="flex flex-col">
                <span className="text-[9px] text-slate-400 font-bold uppercase tracking-wider">Pemilik / Pengelola</span>
                <span className="text-xs font-black text-slate-850">{MOCK_ACTIVE_RENT.landlordName}</span>
                <span className="text-[10px] text-slate-500 font-semibold">{MOCK_ACTIVE_RENT.landlordPhone}</span>
              </div>
            </div>
            <button
              onClick={handleContactLandlord}
              className="bg-brand-green hover:bg-brand-green-hover text-white text-xs font-bold px-4 py-2 rounded-lg flex items-center gap-1.5 transition-colors cursor-pointer border border-brand-green shadow-sm"
            >
              <MessageSquare className="w-3.5 h-3.5" />
              <span>Hubungi</span>
            </button>
          </div>

        </div>

        {/* Right Side: Contract Info & Rules (lg:col-span-7) */}
        <div className="lg:col-span-7 flex flex-col gap-6">
          
          {/* Contract Details Card */}
          <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm flex flex-col gap-4">
            <h5 className="font-extrabold text-slate-800 text-xs sm:text-sm flex items-center gap-2">
              <FileText className="w-4 h-4 text-brand-green" />
              <span>Rincian Kontrak Sewa & Keuangan</span>
            </h5>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 border-y border-slate-100 py-4 text-xs font-semibold text-slate-600">
              <div className="flex flex-col gap-0.5">
                <span className="text-slate-400 text-[10px] font-bold uppercase">ID Kontrak Sewa</span>
                <span className="text-brand-green font-extrabold text-sm">{MOCK_ACTIVE_RENT.id}</span>
              </div>
              <div className="flex flex-col gap-0.5">
                <span className="text-slate-400 text-[10px] font-bold uppercase">Harga Sewa Bulanan</span>
                <span className="text-slate-800 font-extrabold text-sm">{MOCK_ACTIVE_RENT.price}</span>
              </div>
              <div className="flex flex-col gap-0.5">
                <span className="text-slate-400 text-[10px] font-bold uppercase">Jatuh Tempo Pembayaran</span>
                <span className="text-slate-800 font-bold">{MOCK_ACTIVE_RENT.nextPaymentDate}</span>
              </div>
              <div className="flex flex-col gap-0.5">
                <span className="text-slate-400 text-[10px] font-bold uppercase">Status Pembayaran Bulan Ini</span>
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 bg-emerald-50 text-emerald-700 border border-emerald-200 rounded text-[10px] font-bold w-max">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  Lunas Terbayar
                </span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-2 mt-1">
              <button 
                onClick={handleDownloadContract}
                className="flex-1 bg-slate-50 hover:bg-slate-100 text-slate-700 border border-slate-200 text-xs font-bold py-2.5 px-4 rounded-lg flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
              >
                <FileText className="w-3.5 h-3.5 text-slate-400" />
                <span>Unduh Bukti Sewa</span>
              </button>
              <button 
                onClick={handleShowInvoiceDetails}
                className="flex-1 bg-brand-green hover:bg-brand-green-hover text-white text-xs font-bold py-2.5 px-4 rounded-lg flex items-center justify-center gap-1.5 transition-colors cursor-pointer border border-brand-green shadow-sm"
              >
                <ExternalLink className="w-3.5 h-3.5" />
                <span>Lihat Invoice</span>
              </button>
            </div>
          </div>

          {/* Rules Card */}
          <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm flex flex-col gap-4">
            <h5 className="font-extrabold text-slate-800 text-xs sm:text-sm flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-brand-green" />
              <span>Tata Tertib & Peraturan Kost</span>
            </h5>
            
            <ul className="flex flex-col gap-2.5 text-xs text-slate-655 font-semibold">
              {MOCK_ACTIVE_RENT.kostRules.map((rule, idx) => (
                <li key={idx} className="flex items-start gap-2 leading-relaxed">
                  <span className="w-5 h-5 rounded-full bg-slate-100 text-slate-700 border border-slate-200 flex items-center justify-center text-[10px] font-black shrink-0 mt-0.5">
                    {idx + 1}
                  </span>
                  <span className="text-slate-700 pt-0.5">{rule}</span>
                </li>
              ))}
            </ul>
            <div className="bg-amber-50 border border-amber-200 text-amber-800 text-[11px] rounded-lg p-3.5 flex gap-2.5 font-medium">
              <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0" />
              <span>Pelanggaran tata tertib kost secara berulang dapat dikenakan sanksi teguran hingga pemutusan kontrak sepihak. Mohon kerja samanya.</span>
            </div>
          </div>

        </div>

      </div>

      {/* 4. Interactive Complaint / Maintenance Center */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm flex flex-col gap-6">
        
        <div className="flex flex-col gap-1">
          <h4 className="font-extrabold text-slate-800 text-sm sm:text-base flex items-center gap-2">
            <Wrench className="w-4.5 h-4.5 text-brand-green" />
            <span>Layanan Pengaduan & Kerusakan Kamar</span>
          </h4>
          <p className="text-xs text-slate-400 font-light">
            Mengalami kerusakan fasilitas atau masalah teknis? Laporkan secara tertib ke pemilik kost melalui formulir di bawah.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start border-t border-slate-100 pt-6">
          
          {/* Left: Report Form (lg:col-span-5) */}
          <form onSubmit={handleSubmitComplaint} className="lg:col-span-5 flex flex-col gap-4">
            <h5 className="font-extrabold text-slate-800 text-xs sm:text-sm">
              Formulir Laporan Baru
            </h5>

            <div className="flex flex-col gap-1.5">
              <label htmlFor="complaint-category" className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">
                Kategori Masalah
              </label>
              <select
                id="complaint-category"
                value={formCategory}
                onChange={(e) => setFormCategory(e.target.value)}
                className="w-full text-xs font-semibold text-slate-700 border border-slate-250 rounded-xl p-3 focus:outline-none focus:border-brand-green focus:ring-1 focus:ring-brand-green/20 bg-white"
              >
                <option value="Fasilitas Kamar">Fasilitas Kamar (AC, Kasur, Lemari, dll)</option>
                <option value="WiFi & Internet">WiFi & Internet</option>
                <option value="Air & Listrik">Air & Listrik</option>
                <option value="Kebersihan">Kebersihan Kamar/Koridor</option>
                <option value="Keamanan & Ketertiban">Keamanan & Ketertiban</option>
                <option value="Lainnya">Kebutuhan Lainnya</option>
              </select>
            </div>

            <div className="flex flex-col gap-1.5">
              <label htmlFor="complaint-title" className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">
                Judul Laporan
              </label>
              <input
                type="text"
                id="complaint-title"
                value={formTitle}
                onChange={(e) => setFormTitle(e.target.value)}
                placeholder="Contoh: Kran Kamar Mandi Bocor"
                required
                className="w-full text-xs font-semibold text-slate-700 placeholder:text-slate-400 border border-slate-250 rounded-xl p-3 focus:outline-none focus:border-brand-green focus:ring-1 focus:ring-brand-green/20 bg-white"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label htmlFor="complaint-description" className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">
                Detail Masalah
              </label>
              <textarea
                id="complaint-description"
                value={formDesc}
                onChange={(e) => setFormDesc(e.target.value)}
                placeholder="Tuliskan keterangan detail perihal kerusakan atau keluhan yang dialami..."
                required
                rows={4}
                className="w-full text-xs font-semibold text-slate-700 placeholder:text-slate-400 border border-slate-250 rounded-xl p-3 focus:outline-none focus:border-brand-green focus:ring-1 focus:ring-brand-green/20 bg-white resize-none"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-brand-green hover:bg-brand-green-hover text-white text-xs font-bold py-3 px-4 rounded-xl flex items-center justify-center gap-1.5 transition-colors cursor-pointer border border-brand-green shadow-sm"
            >
              <Send className="w-3.5 h-3.5" />
              <span>Kirim Pengaduan</span>
            </button>
          </form>

          {/* Right: Complaints History List (lg:col-span-7) */}
          <div className="lg:col-span-7 flex flex-col gap-4 self-stretch">
            <h5 className="font-extrabold text-slate-800 text-xs sm:text-sm">
              Riwayat & Status Laporan Anda
            </h5>

            <div className="flex flex-col gap-3 max-h-[420px] overflow-y-auto pr-1">
              {complaints.length === 0 ? (
                <div className="flex flex-col items-center justify-center text-center p-8 border border-dashed border-slate-200 rounded-xl bg-slate-50 gap-2">
                  <span className="text-xs text-slate-400 font-medium">Belum ada pengaduan aktif.</span>
                </div>
              ) : (
                complaints.map((item) => (
                  <div 
                    key={item.id}
                    className="bg-slate-50 border border-slate-200 rounded-xl p-4 flex flex-col gap-2.5 text-xs text-slate-600"
                  >
                    <div className="flex justify-between items-start gap-2">
                      <div className="flex flex-col gap-0.5">
                        <div className="flex items-center gap-1.5 flex-wrap">
                          <span className="text-[8px] font-black text-brand-green bg-brand-green-light px-1.5 py-0.5 rounded border border-brand-green/10 uppercase tracking-wider">
                            {item.id}
                          </span>
                          <span className="text-[10px] text-slate-400 font-bold">
                            {item.date}
                          </span>
                        </div>
                        <h6 className="font-extrabold text-slate-850 text-xs sm:text-sm mt-1 leading-snug">
                          {item.title}
                        </h6>
                        <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wide">
                          Kategori: {item.category}
                        </span>
                      </div>
                      
                      {/* Status Badge */}
                      {item.status === "selesai" && (
                        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 bg-emerald-50 text-emerald-700 border border-emerald-200 rounded text-[9px] font-bold">
                          <Check className="w-3 h-3 text-emerald-600 font-black" />
                          Selesai
                        </span>
                      )}
                      {item.status === "proses" && (
                        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 bg-amber-50 text-amber-700 border border-amber-200 rounded text-[9px] font-bold">
                          <Clock className="w-3 h-3 text-amber-600 animate-spin" style={{ animationDuration: '3s' }} />
                          Diproses
                        </span>
                      )}
                      {item.status === "baru" && (
                        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 bg-blue-50 text-blue-700 border border-blue-200 rounded text-[9px] font-bold">
                          <Hourglass className="w-3 h-3 text-blue-600 animate-pulse" />
                          Baru
                        </span>
                      )}
                    </div>

                    <p className="text-slate-600 font-medium leading-relaxed bg-white border border-slate-150 rounded-lg p-2.5">
                      {item.description}
                    </p>

                    {item.notes && (
                      <div className="bg-brand-green-light/50 border border-brand-green/10 rounded-lg p-2.5 flex flex-col gap-1">
                        <span className="text-[9px] text-brand-green font-extrabold uppercase tracking-wide">Respon Pengelola Kost:</span>
                        <p className="text-slate-700 font-semibold leading-relaxed">
                          {item.notes}
                        </p>
                      </div>
                    )}
                  </div>
                ))
              )}
            </div>

          </div>

        </div>

      </div>

    </div>
  );
}
