import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ChevronRight, AlertCircle } from "lucide-react";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import { ProfileSidebar } from "../components/profile/ProfileSidebar";
import { ProfileBiodata } from "../components/profile/ProfileBiodata";
import { ProfileVerification } from "../components/profile/ProfileVerification";
import { ProfileRentHistory } from "../components/profile/ProfileRentHistory";
import { ProfileMyKost } from "../components/profile/ProfileMyKost";
import { ProfileReviews } from "../components/profile/ProfileReviews";
import { ProfileTransactions } from "../components/profile/ProfileTransactions";
import { ProfileBills } from "../components/profile/ProfileBills";
import ProfileSkeleton from "../components/profile/ProfileSkeleton";
import { useProfile } from "../hooks/useProfile";

export default function ProfilePage() {
  const { state, actions } = useProfile();
  const [isPageLoading, setIsPageLoading] = useState(true);

  // Scroll to top on mount and manage simulated page loading
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });

    const timer = setTimeout(() => {
      setIsPageLoading(false);
    }, 600);

    return () => clearTimeout(timer);
  }, []);

  if (isPageLoading) {
    return <ProfileSkeleton />;
  }

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans text-slate-800">
      
      {/* 1. Header Banner with Navbar */}
      <header className="relative w-full h-[220px] flex items-center bg-brand-green overflow-hidden shrink-0">
        <Navbar />
        
        {/* Subtle decorative dot pattern */}
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none" />
        
        {/* Banner Content */}
        <div className="relative z-10 w-full max-w-[1680px] mx-auto px-4 md:px-8 flex flex-col justify-end h-full pb-8">
          <div className="flex flex-col gap-2">
            
            {/* Breadcrumbs */}
            <div className="flex items-center gap-1.5 text-xs text-slate-300 font-medium">
              <Link to="/" className="hover:text-white transition-colors">Home</Link>
              <ChevronRight className="w-3.5 h-3.5" />
              <span className="text-white font-semibold">Profil Saya</span>
            </div>

            {/* Title */}
            <h1 className="text-2xl md:text-3xl font-black text-white tracking-tight">
              PENGATURAN PROFIL
            </h1>

          </div>
        </div>
      </header>

      {/* 2. Main Profile Grid Container */}
      <main className="flex-grow w-full max-w-[1680px] mx-auto px-4 md:px-8 py-12 md:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Sidebar Card */}
          <div className="lg:col-span-4 w-full">
            <ProfileSidebar
              activeTab={state.activeMenuTab}
              onTabChange={actions.setActiveMenuTab}
              userName={state.name}
              avatarUrl={state.avatarUrl}
              onLogout={actions.handleLogout}
            />
          </div>

          {/* Right Column: Main Content Card */}
          <div className="lg:col-span-8 w-full bg-white border border-slate-200/70 rounded-3xl p-6 md:p-8 shadow-sm">
            {state.activeMenuTab === "pengaturan" && (
              <div className="flex flex-col">
                
                {/* Right Tabs Header */}
                <div className="flex gap-6 border-b border-slate-100 pb-3">
                  <button
                    onClick={() => actions.setActiveSubTab("biodata")}
                    className={`text-sm font-extrabold pb-2 relative transition-colors cursor-pointer ${
                      state.activeSubTab === "biodata"
                        ? "text-brand-green"
                        : "text-slate-400 hover:text-slate-600"
                    }`}
                  >
                    Biodata Diri
                    {state.activeSubTab === "biodata" && (
                      <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-brand-green rounded-full" />
                    )}
                  </button>
                  <button
                    onClick={() => actions.setActiveSubTab("verifikasi")}
                    className={`text-sm font-extrabold pb-2 relative transition-colors cursor-pointer ${
                      state.activeSubTab === "verifikasi"
                        ? "text-brand-green"
                        : "text-slate-400 hover:text-slate-600"
                    }`}
                  >
                    Verifikasi Akun
                    {state.activeSubTab === "verifikasi" && (
                      <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-brand-green rounded-full" />
                    )}
                  </button>
                </div>

                <div className="mt-8">
                  {state.activeSubTab === "biodata" ? (
                    <ProfileBiodata
                      name={state.name}
                      setName={actions.setName}
                      gender={state.gender}
                      setGender={actions.setGender}
                      birthDate={state.birthDate}
                      setBirthDate={actions.setBirthDate}
                      job={state.job}
                      setJob={actions.setJob}
                      city={state.city}
                      setCity={actions.setCity}
                      maritalStatus={state.maritalStatus}
                      setMaritalStatus={actions.setMaritalStatus}
                      education={state.education}
                      setEducation={actions.setEducation}
                      emergencyPhone={state.emergencyPhone}
                      setEmergencyPhone={actions.setEmergencyPhone}
                      avatarUrl={state.avatarUrl}
                      onAvatarUpload={actions.handleAvatarUpload}
                      onSave={actions.handleSaveProfile}
                      isLoading={state.isLoading}
                      validationError={state.validationError}
                    />
                  ) : (
                    <ProfileVerification 
                      email={state.sessionUser?.email}
                      phone={state.sessionUser?.phone}
                    />
                  )}
                </div>

              </div>
            )}

            {state.activeMenuTab === "riwayat" && (
              <ProfileRentHistory />
            )}

            {state.activeMenuTab === "kos" && (
              <ProfileMyKost />
            )}

            {state.activeMenuTab === "ulasan" && (
              <ProfileReviews />
            )}

            {state.activeMenuTab === "transaksi" && (
              <ProfileTransactions />
            )}

            {state.activeMenuTab === "tagihan" && (
              <ProfileBills />
            )}

            {state.activeMenuTab !== "pengaturan" && 
             state.activeMenuTab !== "riwayat" && 
             state.activeMenuTab !== "kos" && 
             state.activeMenuTab !== "ulasan" && 
             state.activeMenuTab !== "transaksi" && 
             state.activeMenuTab !== "tagihan" && (
              /* Other tabs placeholder under development state */
              <div className="flex flex-col items-center justify-center text-center py-16 px-4 gap-4">
                <div className="w-16 h-16 rounded-full bg-slate-50 flex items-center justify-center border border-slate-100 text-slate-400">
                  <AlertCircle className="w-8 h-8" />
                </div>
                <div className="flex flex-col gap-1.5 max-w-sm">
                  <h3 className="font-bold text-slate-800 text-base">
                    Halaman Belum Tersedia
                  </h3>
                  <p className="text-xs text-slate-400 leading-normal font-light">
                    Halaman ini sedang berada dalam tahap implementasi teknis oleh pengembang. Silakan periksa kembali bagian tab <b>Pengaturan</b>, <b>Riwayat Pengajuan Sewa</b>, atau <b>Kos Saya</b>.
                  </p>
                </div>
                <button 
                  onClick={() => actions.setActiveMenuTab("pengaturan")}
                  className="mt-2 bg-brand-green hover:bg-brand-green-hover text-white text-xs font-bold py-2.5 px-6 rounded-xl transition-all cursor-pointer shadow-sm"
                >
                  Kembali ke Pengaturan
                </button>
              </div>
            )}
          </div>

        </div>
      </main>

      {/* 3. Global Footer */}
      <Footer />
      
    </div>
  );
}
