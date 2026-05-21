import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { propertyService } from "../services/propertyService";
import { useFavorites } from "./useFavorites";
import type { PropertyDetail, SearchKostCard, RoomType } from "../types";

export function usePropertyDetail(id: string | undefined) {
  const navigate = useNavigate();
  const [property, setProperty] = useState<PropertyDetail | null>(null);
  const [similarProperties, setSimilarProperties] = useState<SearchKostCard[]>([]);
  const [loading, setLoading] = useState(true);

  // UI Interactive States
  const [showAllPhotos, setShowAllPhotos] = useState(false);
  const [activePhotoIdx, setActivePhotoIdx] = useState(0);
  const [isDescExpanded, setIsDescExpanded] = useState(false);
  const [showAllReviews, setShowAllReviews] = useState(false);

  // Booking Card States
  const [checkInDate, setCheckInDate] = useState("");
  const [duration, setDuration] = useState("Per Bulan");
  const [selectedRoomType, setSelectedRoomType] = useState<RoomType | null>(null);

  const { isFavorited, toggleFavorite } = useFavorites();
  const favorited = id ? isFavorited(id) : false;

  // Load details and recommended items
  useEffect(() => {
    if (!id) return;
    
    let isMounted = true;
    async function loadData() {
      try {
        setLoading(true);
        // Scroll back to top
        window.scrollTo(0, 0);

        const data = await propertyService.getPropertyById(id as string);
        const searchList = await propertyService.getSearchProperties();

        if (isMounted && data) {
          setProperty(data);
          // Pick similar items (excluding current)
          const similar = searchList
            .filter((p) => p.id !== id && p.location.includes("Yogyakarta"))
            .slice(0, 3);
          setSimilarProperties(similar);
          // Set default selected room type if available
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
    alert("Link halaman telah disalin ke clipboard!");
  }, []);

  const handleToggleFavorite = useCallback(() => {
    if (id) {
      toggleFavorite(id);
    }
  }, [id, toggleFavorite]);

  const handleBooking = useCallback(() => {
    if (!property) return;
    if (!checkInDate) {
      alert("Silakan pilih tanggal mulai ngekos terlebih dahulu!");
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
      alert("Silakan pilih tanggal mulai ngekos terlebih dahulu!");
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
    selectedRoomType,
    setSelectedRoomType,
    
    // Favorites
    isFavorited: favorited,
    toggleFavorite: handleToggleFavorite,
    
    // Handlers
    handleShare,
    handleBooking,
    handleSelectRoomTypeAndBook
  };
}
