import Navbar from "../layout/Navbar";
import Footer from "../layout/Footer";

export default function ProfileSkeleton() {
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans text-slate-800">
      
      <header className="relative w-full h-[220px] flex items-center bg-brand-green overflow-hidden shrink-0">
        <Navbar />
        
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#fff_1px,transparent_1px)] bg-size-[16px_16px] pointer-events-none" />
        
        <div className="relative z-10 w-full max-w-[1680px] mx-auto px-4 md:px-8 flex flex-col justify-end h-full pb-8">
          <div className="flex flex-col gap-3">
            
            <div className="flex items-center gap-1.5">
              <div className="h-3 w-10 bg-white/20 animate-pulse rounded" />
              <div className="h-2.5 w-2.5 bg-white/20 animate-pulse rounded-full" />
              <div className="h-3 w-16 bg-white/25 animate-pulse rounded" />
            </div>

            <div className="h-7 w-64 md:h-8 md:w-80 bg-white/20 animate-pulse rounded-lg" />

          </div>
        </div>
      </header>

      <main className="grow w-full max-w-[1680px] mx-auto px-4 md:px-8 py-12 md:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          <div className="lg:col-span-4 w-full flex flex-col gap-6">
            <div className="bg-white border border-slate-200/70 rounded-3xl p-6 flex items-center gap-4 shadow-sm">
              <div className="w-14 h-14 rounded-full bg-slate-200 animate-pulse shrink-0" />
              <div className="flex flex-col gap-1.5 grow">
                <div className="h-4.5 w-32 bg-slate-200 animate-pulse rounded" />
                <div className="h-3.5 w-24 bg-slate-100 animate-pulse rounded" />
              </div>
            </div>

            <div className="bg-white border border-slate-200/70 rounded-3xl overflow-hidden shadow-sm py-4">
              <div className="flex flex-col gap-1.5 px-4">
                {Array.from({ length: 6 }).map((_, i) => (
                  <div 
                    key={i} 
                    className="h-10 w-full bg-slate-50 animate-pulse rounded-xl flex items-center px-4"
                  >
                    <div className="w-4 h-4 bg-slate-200 rounded shrink-0 mr-3.5" />
                    <div className="h-3 w-28 bg-slate-200 rounded" />
                  </div>
                ))}
                
                <div className="w-full h-px bg-slate-100 my-2" />
                
                <div className="h-10 w-full bg-slate-50 animate-pulse rounded-xl flex items-center px-4">
                  <div className="w-4 h-4 bg-red-100 rounded shrink-0 mr-3.5" />
                  <div className="h-3 w-24 bg-red-100 rounded" />
                </div>
              </div>
            </div>

            <div className="bg-brand-green-light/40 border border-brand-green-accent/10 rounded-3xl p-6 flex flex-col gap-4 text-center shadow-sm">
              <div className="flex flex-col gap-1.5 items-center">
                <div className="h-4 w-28 bg-brand-green-accent/15 animate-pulse rounded" />
                <div className="h-3 w-48 bg-slate-200 animate-pulse rounded" />
                <div className="h-3 w-40 bg-slate-200 animate-pulse rounded" />
              </div>
              <div className="w-full h-9 bg-brand-green-accent/20 animate-pulse rounded-xl" />
            </div>

          </div>

          <div className="lg:col-span-8 w-full bg-white border border-slate-200/70 rounded-3xl p-6 md:p-8 shadow-sm">
            <div className="flex flex-col">
              
              <div className="flex gap-6 border-b border-slate-100 pb-3">
                <div className="h-4 w-20 bg-slate-200 animate-pulse rounded pb-2" />
                <div className="h-4 w-24 bg-slate-200 animate-pulse rounded pb-2" />
              </div>

              <div className="mt-8 flex flex-col md:flex-row gap-8 items-start">
                
                <div className="flex flex-col items-center gap-4 w-full md:w-1/3 shrink-0">
                  <div className="w-32 h-32 md:w-40 md:h-40 rounded-3xl bg-slate-200 animate-pulse" />
                  <div className="h-9 w-28 bg-slate-200 animate-pulse rounded-xl" />
                  <div className="flex flex-col gap-1 items-center">
                    <div className="h-3 w-36 bg-slate-100 animate-pulse rounded" />
                    <div className="h-3 w-28 bg-slate-100 animate-pulse rounded" />
                  </div>
                </div>

                <div className="grow w-full grid grid-cols-1 md:grid-cols-2 gap-4">
                  {Array.from({ length: 8 }).map((_, i) => (
                    <div key={i} className="flex flex-col gap-1.5">
                      <div className="h-3.5 w-24 bg-slate-200 animate-pulse rounded" />
                      <div className="h-10 w-full bg-slate-50 animate-pulse rounded-xl" />
                    </div>
                  ))}
                  
                  <div className="col-span-1 md:col-span-2 flex justify-end mt-4">
                    <div className="h-11 w-32 bg-slate-200 animate-pulse rounded-xl" />
                  </div>
                </div>

              </div>

            </div>
          </div>

        </div>
      </main>

      {/* 3. Global Footer */}
      <Footer />
      
    </div>
  );
}
