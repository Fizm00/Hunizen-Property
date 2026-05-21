import { useParams, Link } from "react-router-dom";
import { Heart, Share2, Star, MapPin, ChevronRight, Info } from "lucide-react";

import { usePropertyDetail } from "../hooks/usePropertyDetail";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";

// Modular UI sub-components
import PropertyGallery from "../components/property/PropertyGallery";
import PropertyHighlights from "../components/property/PropertyHighlights";
import PropertyHostInfo from "../components/property/PropertyHostInfo";
import PropertyDescription from "../components/property/PropertyDescription";
import PropertySpecs from "../components/property/PropertySpecs";
import PropertyFacilities from "../components/property/PropertyFacilities";
import PropertyRules from "../components/property/PropertyRules";
import PropertyRoomTypes from "../components/property/PropertyRoomTypes";
import PropertyLocationMap from "../components/property/PropertyLocationMap";
import PropertyRentalTerms from "../components/property/PropertyRentalTerms";
import PropertyReviews from "../components/property/PropertyReviews";
import PropertyBookingCard from "../components/property/PropertyBookingCard";
import PropertyMobileStickyBar from "../components/property/PropertyMobileStickyBar";
import PropertySimilarList from "../components/property/PropertySimilarList";
import PropertyDetailSkeleton from "../components/property/PropertyDetailSkeleton";

export default function PropertyDetailPage() {
  const { id } = useParams<{ id: string }>();
  const {
    property,
    similarProperties,
    loading,
    
    // UI Interactive States & Setters
    showAllPhotos,
    setShowAllPhotos,
    activePhotoIdx,
    setActivePhotoIdx,
    isDescExpanded,
    setIsDescExpanded,
    showAllReviews,
    setShowAllReviews,
    
    // Booking Form States & Setters
    checkInDate,
    setCheckInDate,
    duration,
    setDuration,
    
    // Favorites
    isFavorited,
    toggleFavorite,
    
    // Handlers
    handleShare,
    handleBooking,
    handleSelectRoomTypeAndBook
  } = usePropertyDetail(id);

  if (loading) {
    return <PropertyDetailSkeleton />;
  }

  if (!property) {
    return (
      <div className="w-full min-h-screen bg-slate-50 flex flex-col justify-between">
        <div className="h-20 w-full bg-[#09090B]" />
        <div className="grow flex flex-col items-center justify-center p-8 gap-4 text-center">
          <Info className="w-12 h-12 text-slate-400" />
          <h2 className="text-xl font-bold text-slate-800">Properti Tidak Ditemukan</h2>
          <p className="text-xs text-slate-500 max-w-sm">Detail kost yang Anda cari tidak tersedia atau telah dihapus.</p>
          <Link to="/search" className="px-6 py-2.5 bg-[#09090B] text-white text-xs font-bold rounded-full">
            Kembali ke Pencarian
          </Link>
        </div>
        <div className="h-20 w-full bg-[#09090B]" />
      </div>
    );
  }

  return (
    <div className="relative min-h-screen w-full bg-slate-50/60 font-sans text-slate-800 selection:bg-zinc-200 selection:text-zinc-900">
      
      {/* 1. Header Container (Dark Spacer behind transparent Navbar) */}
      <div className="w-full bg-[#09090B] h-20 relative z-50">
        <Navbar />
      </div>

      {/* 2. Breadcrumbs Bar */}
      <div className="w-full bg-white border-b border-slate-100 py-3.5 px-6 md:px-12">
        <div className="max-w-7xl mx-auto flex items-center gap-2 text-sm font-semibold text-slate-400">
          <Link to="/" className="hover:text-slate-600 transition-colors">Home</Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <Link to="/search" className="hover:text-slate-600 transition-colors">Kost Yogyakarta</Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <span className="text-slate-600 truncate">{property.title}</span>
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-4 md:px-8 py-8 flex flex-col gap-8 pb-32 md:pb-16">
        
        {/* 3. Grid Gallery Container */}
        <PropertyGallery
          property={property}
          showAllPhotos={showAllPhotos}
          setShowAllPhotos={setShowAllPhotos}
          activePhotoIdx={activePhotoIdx}
          setActivePhotoIdx={setActivePhotoIdx}
        />

        {/* 4. Split Layout Details & Checkout Card */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start w-full">
          
          {/* Left Column (Main details list) */}
          <div className="lg:col-span-2 flex flex-col gap-0">
            
            {/* Header info block */}
            <div className="pb-8 border-b border-slate-200/80 flex flex-col gap-4">
              <div className="flex justify-between items-start gap-4">
                <div>
                  <h1 className="text-2xl md:text-3xl font-black text-slate-800 tracking-tight leading-tight">
                    {property.title}
                  </h1>
                  
                  <div className="flex items-center gap-2 mt-2">
                    <span className="flex items-center gap-0.5 text-sm font-extrabold text-amber-500 bg-amber-500/10 px-2 py-0.5 rounded">
                      <Star className="w-3.5 h-3.5 fill-amber-500 stroke-amber-500" />
                      {property.rating.toFixed(1)}
                    </span>
                    <span className="text-slate-300">•</span>
                    <p className="text-sm text-slate-400 font-medium flex items-center gap-0.5">
                      <MapPin className="w-3.5 h-3.5 text-slate-400" />
                      {property.location}
                    </p>
                  </div>
                </div>

                {/* Share & Heart Action Buttons */}
                <div className="flex items-center gap-2 shrink-0">
                  <button 
                    onClick={handleShare}
                    className="w-10 h-10 border border-slate-200 rounded-full flex items-center justify-center text-slate-500 hover:text-slate-800 hover:border-slate-800 transition-all cursor-pointer bg-white"
                    title="Bagikan"
                  >
                    <Share2 className="w-4 h-4" />
                  </button>
                  <button 
                    onClick={toggleFavorite}
                    className="w-10 h-10 border border-slate-200 rounded-full flex items-center justify-center transition-all cursor-pointer bg-white"
                    title="Favorit"
                  >
                    <Heart className={`w-4 h-4 ${isFavorited ? "fill-red-500 stroke-red-500 text-red-500 animate-pulse" : "text-slate-500"}`} />
                  </button>
                </div>
              </div>

              {/* Urgencies alert bar */}
              <div className="flex items-center gap-2 text-sm font-bold text-red-600 bg-red-50 border border-red-100 px-4 py-2.5 rounded-2xl w-fit">
                <span className="w-1.5 h-1.5 bg-red-600 rounded-full animate-ping" />
                <span>{property.roomLeft} Kamar tersisa</span>
              </div>
            </div>

            {/* Highlights Section */}
            <PropertyHighlights highlights={property.highlights} />

            {/* Host Section */}
            <PropertyHostInfo host={property.host} />

            {/* Description Section */}
            <PropertyDescription 
              isDescExpanded={isDescExpanded}
              setIsDescExpanded={setIsDescExpanded}
            />

            {/* Specifications Section */}
            <PropertySpecs roomSpecs={property.roomSpecs} />

            {/* Facilities Detail List Section */}
            <PropertyFacilities 
              facilities={property.facilities}
              bathroomFacilities={property.bathroomFacilities}
            />

            {/* House Rules Section */}
            <PropertyRules rulesDetails={property.rulesDetails} />

            {/* Alternative Room Types */}
            <PropertyRoomTypes 
              roomTypes={property.roomTypes}
              onSelectRoomTypeAndBook={handleSelectRoomTypeAndBook}
            />

            {/* Location & Interactive Map Section */}
            <PropertyLocationMap 
              title={property.title}
              location={property.location}
              latLng={property.latLng}
              nearbyPlaces={property.nearbyPlaces}
            />

            {/* Rental Terms */}
            <PropertyRentalTerms rentalTerms={property.rentalTerms} />

            {/* Reviews Section */}
            <PropertyReviews 
              rating={property.rating}
              reviewsList={property.reviewsList}
              showAllReviews={showAllReviews}
              setShowAllReviews={setShowAllReviews}
            />

          </div>

          {/* Right Column (Sticky Booking Card on Desktop) */}
          <div className="lg:col-span-1">
            <PropertyBookingCard 
              property={property}
              checkInDate={checkInDate}
              setCheckInDate={setCheckInDate}
              duration={duration}
              setDuration={setDuration}
              handleBooking={handleBooking}
            />
          </div>

        </div>

        {/* 5. Recommended Properties Carousel */}
        <PropertySimilarList similarProperties={similarProperties} />

      </main>

      {/* 6. Mobile floating checkout sticky bar */}
      <PropertyMobileStickyBar 
        property={property}
        handleBooking={handleBooking}
      />

      {/* 7. Footer Component */}
      <Footer />

    </div>
  );
}
