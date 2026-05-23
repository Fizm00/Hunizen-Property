import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { propertyService } from "../services/propertyService";
import { useFavorites } from "./useFavorites";
import type { PropertyDetail, SearchKostCard, RoomType } from "../types";
import { showToast, showAlert } from "../utils/alerts";

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
          const similar = searchList
            .filter((p) => p.id !== id && p.location.includes("Yogyakarta"))
            .slice(0, 3);
          setSimilarProperties(similar);
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
    if (!checkInDate) {
      showAlert("warning", "Tanggal Belum Dipilih", "Silakan pilih tanggal mulai ngekos terlebih dahulu!");
      return;
    }
    if (!property) return;
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
