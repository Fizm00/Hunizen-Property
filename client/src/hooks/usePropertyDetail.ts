import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { propertyService } from "../services/propertyService";
import { useFavorites } from "./useFavorites";
import type { PropertyDetail, SearchKostCard, RoomType } from "../types";
import { showToast, showAlert } from "../utils/alerts";
import Swal from "sweetalert2";

export function usePropertyDetail(id: string | undefined) {
  const navigate = useNavigate();
  const [property, setProperty] = useState<PropertyDetail | null>(null);
  const [similarProperties, setSimilarProperties] = useState<SearchKostCard[]>([]);
  const [loading, setLoading] = useState(true);

  const [showAllPhotos, setShowAllPhotos] = useState(false);
  const [activePhotoIdx, setActivePhotoIdx] = useState(0);
  const [isDescExpanded, setIsDescExpanded] = useState(false);
  const [showAllReviews, setShowAllReviews] = useState(false);

  const [checkInDate, setCheckInDate] = useState("");
  const [duration, setDuration] = useState("Per Bulan");
  const [selectedRoomType, setSelectedRoomType] = useState<RoomType | null>(null);

  const { isFavorited, toggleFavorite } = useFavorites();
  const favorited = id ? isFavorited(id) : false;

  useEffect(() => {
    if (!id) return;
    
    let isMounted = true;
    async function loadData() {
      try {
        setLoading(true);
        window.scrollTo(0, 0);

        const data = await propertyService.getPropertyById(id as string);
        const searchList = await propertyService.getSearchProperties();

        if (isMounted && data) {
          setProperty(data);
          const cityWords = (data.location || "").split(",").map((s) => s.trim());
          const targetCity = cityWords.length > 1 ? cityWords[cityWords.length - 2] : (cityWords[0] || "");
          
          let similar = searchList.filter(
            (p) => p.id !== id && p.location.toLowerCase().includes(targetCity.toLowerCase())
          );
          if (similar.length === 0) {
            similar = searchList.filter((p) => p.id !== id);
          }
          setSimilarProperties(similar.slice(0, 3));
          if (data.roomTypes && data.roomTypes.length > 0) {
            setSelectedRoomType(data.roomTypes[0]);
          } else {
            setSelectedRoomType(null);
          }
        }
      } catch (err) {
        console.error("Error loading details:", err);
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    }
    loadData();

    return () => {
      isMounted = false;
    };
  }, [id]);

  const handleShare = useCallback(() => {
    navigator.clipboard.writeText(window.location.href);
    showToast("success", "Link halaman telah disalin ke clipboard!");
  }, []);

  const handleToggleFavorite = useCallback(() => {
    if (id) {
      toggleFavorite(id);
    }
  }, [id, toggleFavorite]);

  const handleBooking = useCallback(() => {
    if (!property) return;
    
    const userSession = localStorage.getItem("user");
    if (!userSession) {
      Swal.fire({
        icon: "warning",
        title: "Perlu Login",
        text: "Anda harus masuk ke akun Hunizen terlebih dahulu untuk melanjutkan pemesanan sewa kost.",
        confirmButtonText: "Login Sekarang",
        showCancelButton: true,
        cancelButtonText: "Batal",
        background: "#18181B",
        color: "#F4F3EC",
        buttonsStyling: false,
        customClass: {
          popup: "rounded-3xl border border-zinc-800 p-8 shadow-2xl font-sans",
          title: "text-lg font-black tracking-tight mb-2 text-[#F4F3EC] block",
          htmlContainer: "text-xs text-slate-400 font-medium leading-relaxed mb-6 block",
          confirmButton: "bg-[#F4F3EC] hover:bg-white text-[#09090B] text-xs font-black px-6 py-3 rounded-full transition-all shadow-md active:scale-95 cursor-pointer border-0 outline-none block mx-auto mb-2",
          cancelButton: "bg-zinc-800 hover:bg-zinc-700 text-white text-xs font-bold px-6 py-3 rounded-full transition-all active:scale-95 cursor-pointer border-0 outline-none block mx-auto"
        }
      }).then((result) => {
        if (result.isConfirmed) {
          navigate("/login");
        }
      });
      return;
    }

    if (!checkInDate) {
      showAlert("warning", "Tanggal Belum Dipilih", "Silakan pilih tanggal mulai ngekos terlebih dahulu!");
      return;
    }
    navigate(`/booking/${property.id}`, {
      state: {
        checkInDate,
        duration,
        roomType: selectedRoomType?.name || "Standard Room"
      }
    });
  }, [navigate, property, checkInDate, duration, selectedRoomType]);

  const handleSelectRoomTypeAndBook = useCallback((roomType: RoomType) => {
    setSelectedRoomType(roomType);
    if (!property) return;

    const userSession = localStorage.getItem("user");
    if (!userSession) {
      Swal.fire({
        icon: "warning",
        title: "Perlu Login",
        text: "Anda harus masuk ke akun Hunizen terlebih dahulu untuk melanjutkan pemesanan sewa kost.",
        confirmButtonText: "Login Sekarang",
        showCancelButton: true,
        cancelButtonText: "Batal",
        background: "#18181B",
        color: "#F4F3EC",
        buttonsStyling: false,
        customClass: {
          popup: "rounded-3xl border border-zinc-800 p-8 shadow-2xl font-sans",
          title: "text-lg font-black tracking-tight mb-2 text-[#F4F3EC] block",
          htmlContainer: "text-xs text-slate-400 font-medium leading-relaxed mb-6 block",
          confirmButton: "bg-[#F4F3EC] hover:bg-white text-[#09090B] text-xs font-black px-6 py-3 rounded-full transition-all shadow-md active:scale-95 cursor-pointer border-0 outline-none block mx-auto mb-2",
          cancelButton: "bg-zinc-800 hover:bg-zinc-700 text-white text-xs font-bold px-6 py-3 rounded-full transition-all active:scale-95 cursor-pointer border-0 outline-none block mx-auto"
        }
      }).then((result) => {
        if (result.isConfirmed) {
          navigate("/login");
        }
      });
      return;
    }

    if (!checkInDate) {
      showAlert("warning", "Tanggal Belum Dipilih", "Silakan pilih tanggal mulai ngekos terlebih dahulu!");
      return;
    }
    navigate(`/booking/${property.id}`, {
      state: {
        checkInDate,
        duration,
        roomType: roomType.name
      }
    });
  }, [navigate, property, checkInDate, duration]);

  return {
    property,
    similarProperties,
    loading,
    
    showAllPhotos,
    setShowAllPhotos,
    activePhotoIdx,
    setActivePhotoIdx,
    isDescExpanded,
    setIsDescExpanded,
    showAllReviews,
    setShowAllReviews,
    
    checkInDate,
    setCheckInDate,
    duration,
    setDuration,
    selectedRoomType,
    setSelectedRoomType,
    
    isFavorited: favorited,
    toggleFavorite: handleToggleFavorite,
    
    handleShare,
    handleBooking,
    handleSelectRoomTypeAndBook
  };
}
