import { useEffect, useState } from "react";
import { useParams, useLocation, useNavigate, Link } from "react-router-dom";
import { ArrowLeft, Sparkles } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { propertyService } from "../services/propertyService";
import type { PropertyDetail } from "../types";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";

// Hooks
import { useBookingForm } from "../hooks/useBookingForm";

// Components
import BookingSteps from "../components/booking/BookingSteps";
import TenantInfoForm from "../components/booking/TenantInfoForm";
import RentParameters from "../components/booking/RentParameters";
import InvoiceSummary from "../components/booking/InvoiceSummary";
import SuccessReceipt from "../components/booking/SuccessReceipt";

export default function BookingPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const location = useLocation();

  // Get initial values passed from the property detail page
  const routeState = location.state as {
    checkInDate?: string;
    duration?: string;
    roomType?: string;
  } | null;

  const [property, setProperty] = useState<PropertyDetail | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;
    async function fetchProperty() {
      try {
        setLoading(true);
        const data = await propertyService.getPropertyById(id as string);
        if (data) {
          setProperty(data);
        }
      } catch (err) {
        console.error("Error fetching property for booking:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchProperty();
  }, [id]);

  // Hook initialization (only runs when property is loaded)
  const hookOptions = {
    priceVal: property?.priceVal || 0,
    initialCheckInDate: routeState?.checkInDate,
    initialDuration: routeState?.duration,
    initialRoomType: routeState?.roomType
  };

  const { formState, actions, pricing, status } = useBookingForm(hookOptions);

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col justify-between">
        <div className="h-20 w-full bg-[#09090B]" />
        <div className="grow flex items-center justify-center p-8">
          <div className="flex flex-col items-center gap-3">
            <div className="w-10 h-10 border-4 border-zinc-300 border-t-[#09090B] rounded-full animate-spin" />
            <span className="text-sm font-semibold text-slate-500">Mempersiapkan formulir sewa...</span>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (!property) {
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col justify-between">
        <div className="h-20 w-full bg-[#09090B]" />
        <div className="grow flex flex-col items-center justify-center p-8 gap-4 text-center">
          <h2 className="text-xl font-bold text-slate-800">Properti Tidak Ditemukan</h2>
          <Link to="/" className="px-6 py-2.5 bg-[#09090B] text-white text-xs font-bold rounded-full">
            Kembali ke Beranda
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full bg-slate-50/60 font-sans text-slate-800">
      <div className="w-full bg-[#09090B] h-20 relative z-50">
        <Navbar />
      </div>

      <AnimatePresence mode="wait">
        {!status.isSubmitted ? (
          <motion.div
            key="booking-form"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.4 }}
            className="max-w-7xl mx-auto px-4 md:px-8 py-8 flex flex-col gap-6"
          >
            {/* Step & Breadcrumbs Row */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-200/80 pb-6">
              <div className="flex items-center gap-3">
                <button
                  onClick={() => navigate(-1)}
                  className="w-10 h-10 border border-slate-200 rounded-full flex items-center justify-center text-slate-500 hover:text-slate-800 hover:border-slate-800 transition-all cursor-pointer bg-white"
                >
                  <ArrowLeft className="w-5 h-5" />
                </button>
                <div>
                  <h1 className="text-xl md:text-2xl font-black text-slate-800 tracking-tight flex items-center gap-2">
                    Pengajuan Sewa
                    <Sparkles className="w-5 h-5 text-amber-500 fill-amber-100" />
                  </h1>
                  <p className="text-xs text-slate-400 font-semibold mt-0.5">
                    Lengkapi dokumen pengajuan sewa untuk unit impian Anda
                  </p>
                </div>
              </div>

              {/* Progress Steps */}
              <BookingSteps />
            </div>

            {/* Split Screen Layout */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start w-full">
              
              {/* Form Section (Left Column) */}
              <form onSubmit={actions.handleSubmit} className="lg:col-span-2 flex flex-col gap-6">
                
                {/* 1. Tenant Info Form */}
                <TenantInfoForm
                  name={formState.name}
                  setName={formState.setName}
                  phone={formState.phone}
                  setPhone={formState.setPhone}
                  gender={formState.gender}
                  setGender={formState.setGender}
                  occupation={formState.occupation}
                  setOccupation={formState.setOccupation}
                  errors={status.errors}
                />

                {/* 2. Room & Rent Parameters */}
                <RentParameters
                  occupantsCount={formState.occupantsCount}
                  incrementOccupants={actions.incrementOccupants}
                  decrementOccupants={actions.decrementOccupants}
                  durationMonths={formState.durationMonths}
                  incrementDuration={actions.incrementDuration}
                  decrementDuration={actions.decrementDuration}
                  startDate={formState.startDate}
                  setStartDate={formState.setStartDate}
                  selectedRoomType={formState.selectedRoomType}
                  setSelectedRoomType={formState.setSelectedRoomType}
                  property={property}
                />

                {/* 3. Additional Notes Card */}
                <div className="bg-white border border-slate-200/60 rounded-3xl p-6 md:p-8 shadow-sm flex flex-col gap-4">
                  <div>
                    <h2 className="text-sm font-black text-slate-800">Catatan Tambahan (Opsional)</h2>
                    <p className="text-xs text-slate-400 mt-0.5">Tulis pesan atau kebutuhan khusus kepada pemilik kost</p>
                  </div>
                  <textarea
                    rows={4}
                    value={formState.additionalNotes}
                    onChange={(e) => formState.setAdditionalNotes(e.target.value)}
                    placeholder="Contoh: Saya berencana membawa laptop berdaya tinggi atau menaruh kendaraan mobil."
                    className="w-full p-4 border border-slate-200 rounded-2xl bg-slate-50/30 text-sm text-slate-700 focus:outline-none focus:border-slate-800 focus:bg-white transition-all resize-none"
                  />
                </div>

                {/* Ajukan Sewa Trigger Button */}
                <button
                  type="submit"
                  disabled={status.isSubmitting}
                  className="w-full py-4 bg-[#09090B] hover:bg-zinc-800 disabled:bg-zinc-600 text-white text-sm font-bold rounded-full transition-all shadow-md active:scale-98 cursor-pointer border-0 mt-2 flex items-center justify-center gap-2"
                >
                  {status.isSubmitting ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      Memproses Pengajuan...
                    </>
                  ) : (
                    "Ajukan Sewa Unit"
                  )}
                </button>
              </form>

              {/* Booking Summary Card (Right Column) */}
              <div className="lg:col-span-1">
                <InvoiceSummary
                  property={property}
                  durationMonths={formState.durationMonths}
                  subtotal={pricing.subtotal}
                  serviceFee={pricing.serviceFee}
                  totalPayment={pricing.totalPayment}
                />
              </div>

            </div>
          </motion.div>
        ) : (
          /* SUCCESS SUBMITTED RECEIPT COMPONENT */
          <SuccessReceipt
            bookingId={status.bookingId}
            property={property}
            name={formState.name}
            phone={formState.phone}
            startDate={formState.startDate}
            durationMonths={formState.durationMonths}
            occupantsCount={formState.occupantsCount}
            subtotal={pricing.subtotal}
            serviceFee={pricing.serviceFee}
            totalPayment={pricing.totalPayment}
          />
        )}
      </AnimatePresence>

      <Footer />
    </div>
  );
}
