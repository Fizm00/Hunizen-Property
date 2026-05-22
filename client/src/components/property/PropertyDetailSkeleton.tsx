import Navbar from "../layout/Navbar";
import Footer from "../layout/Footer";

export default function PropertyDetailSkeleton() {
  return (
    <div className="relative min-h-screen w-full bg-slate-50/60 font-sans text-slate-800">
      {/* 1. Header Container */}
      <div className="w-full bg-[#09090B] h-20 relative z-50">
        <Navbar />
      </div>

      {/* 2. Breadcrumbs Bar Skeleton */}
      <div className="w-full bg-white border-b border-slate-100 py-3.5 px-6 md:px-12">
        <div className="max-w-7xl mx-auto flex items-center gap-2">
          <div className="h-4 w-12 bg-slate-200 rounded animate-pulse" />
          <div className="h-3 w-3 bg-slate-200 rounded-full animate-pulse" />
          <div className="h-4 w-24 bg-slate-200 rounded animate-pulse" />
          <div className="h-3 w-3 bg-slate-200 rounded-full animate-pulse" />
          <div className="h-4 w-40 bg-slate-200 rounded animate-pulse" />
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-4 md:px-8 py-8 flex flex-col gap-8 pb-32 md:pb-16">
        
        {/* 3. Gallery Skeleton */}
        <div className="w-full h-[320px] md:h-[480px] grid grid-cols-1 md:grid-cols-3 gap-3.5 rounded-[1.75rem] overflow-hidden bg-slate-100 p-1">
          <div className="md:col-span-2 h-full bg-slate-200 animate-pulse rounded-2xl" />
          <div className="hidden md:grid grid-rows-2 gap-3.5 h-full">
            <div className="grid grid-cols-2 gap-3.5">
              <div className="bg-slate-200 animate-pulse rounded-2xl" />
              <div className="bg-slate-200 animate-pulse rounded-2xl" />
            </div>
            <div className="grid grid-cols-2 gap-3.5">
              <div className="bg-slate-200 animate-pulse rounded-2xl" />
              <div className="bg-slate-200 animate-pulse rounded-2xl" />
            </div>
          </div>
        </div>

        {/* 4. Split Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start w-full">
          {/* Left Column */}
          <div className="lg:col-span-2 flex flex-col gap-0">
            {/* Header info block */}
            <div className="pb-8 border-b border-slate-200/80 flex flex-col gap-4">
              <div className="flex justify-between items-start gap-4">
                <div className="grow">
                  <div className="h-8 bg-slate-200 rounded-lg w-3/4 animate-pulse mb-3" />
                  <div className="flex items-center gap-2">
                    <div className="h-5 bg-slate-200 rounded w-12 animate-pulse" />
                    <div className="h-3 bg-slate-200 rounded w-3 animate-pulse" />
                    <div className="h-5 bg-slate-200 rounded w-36 animate-pulse" />
                  </div>
                </div>
                <div className="flex gap-2 shrink-0">
                  <div className="w-10 h-10 bg-slate-200 rounded-full animate-pulse" />
                  <div className="w-10 h-10 bg-slate-200 rounded-full animate-pulse" />
                </div>
              </div>
              <div className="h-8 bg-slate-200 rounded-full w-32 animate-pulse" />
            </div>

            {/* Highlights Section */}
            <div className="py-8 border-b border-slate-200/80">
              <div className="h-5 bg-slate-200 rounded w-28 animate-pulse mb-5" />
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {Array.from({ length: 4 }).map((_, i) => (
                  <div key={i} className="flex flex-col items-center justify-center p-4 bg-slate-50 border border-slate-100 rounded-2xl gap-3">
                    <div className="w-10 h-10 bg-slate-200 rounded-full animate-pulse" />
                    <div className="h-4 bg-slate-200 rounded w-16 animate-pulse" />
                  </div>
                ))}
              </div>
            </div>

            {/* Host Section */}
            <div className="py-8 border-b border-slate-200/80 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-slate-200 rounded-full animate-pulse" />
                <div>
                  <div className="h-3 bg-slate-200 rounded w-16 animate-pulse mb-1.5" />
                  <div className="h-4 bg-slate-200 rounded w-28 animate-pulse mb-1.5" />
                  <div className="h-3 bg-slate-200 rounded w-36 animate-pulse" />
                </div>
              </div>
              <div className="w-24 h-8 bg-slate-200 rounded-full animate-pulse" />
            </div>

            {/* Description Section */}
            <div className="py-8 border-b border-slate-200/80">
              <div className="h-5 bg-slate-200 rounded w-40 animate-pulse mb-4" />
              <div className="flex flex-col gap-2">
                <div className="h-4 bg-slate-200 rounded w-full animate-pulse animate-duration-1000" />
                <div className="h-4 bg-slate-200 rounded w-11/12 animate-pulse" />
                <div className="h-4 bg-slate-200 rounded w-4/5 animate-pulse" />
              </div>
            </div>

            {/* Specs Section */}
            <div className="py-8 border-b border-slate-200/80">
              <div className="h-5 bg-slate-200 rounded w-36 animate-pulse mb-4" />
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {Array.from({ length: 4 }).map((_, i) => (
                  <div key={i} className="flex items-center gap-2.5">
                    <div className="w-2.5 h-2.5 bg-slate-200 rounded-full animate-pulse" />
                    <div className="h-4 bg-slate-200 rounded w-32 animate-pulse" />
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column (Booking Card) */}
          <div className="lg:col-span-1">
            <div className="hidden lg:block sticky top-28 bg-white border border-slate-100 rounded-3xl p-6 shadow-md flex-col gap-6">
              <div className="flex justify-between items-end">
                <div>
                  <div className="h-3 bg-slate-200 rounded w-16 animate-pulse mb-1.5" />
                  <div className="h-6 bg-slate-200 rounded w-24 animate-pulse" />
                </div>
                <div className="w-16 h-8 bg-slate-200 rounded-full animate-pulse" />
              </div>
              <div className="h-px bg-slate-100 w-full" />
              <div className="flex flex-col gap-4">
                <div className="flex flex-col gap-1.5">
                  <div className="h-3 bg-slate-200 rounded w-16 animate-pulse" />
                  <div className="h-10 bg-slate-200 rounded-xl animate-pulse" />
                </div>
                <div className="flex flex-col gap-1.5">
                  <div className="h-3 bg-slate-200 rounded w-20 animate-pulse" />
                  <div className="h-10 bg-slate-200 rounded-xl animate-pulse" />
                </div>
              </div>
              <div className="flex flex-col gap-3 mt-2">
                <div className="w-full h-12 bg-slate-200 rounded-full animate-pulse" />
                <div className="w-full h-12 bg-slate-200 rounded-full animate-pulse" />
              </div>
            </div>
          </div>
        </div>

      </main>

      <Footer />
    </div>
  );
}
