import { useState, useEffect, useCallback } from "react";

/**
 * Custom hook to manage property favorites with localStorage persistence.
 */
export function useFavorites() {
  const [favorites, setFavorites] = useState<Record<string, boolean>>(() => {
    try {
      const saved = localStorage.getItem("hunizen_favorites");
      return saved ? JSON.parse(saved) : {};
    } catch (error) {
      console.error("Error reading favorites from localStorage:", error);
      return {};
    }
  });

  // Persist to localStorage whenever favorites state changes
  useEffect(() => {
    try {
      localStorage.setItem("hunizen_favorites", JSON.stringify(favorites));
    } catch (error) {
      console.error("Error writing favorites to localStorage:", error);
    }
  }, [favorites]);

  const toggleFavorite = useCallback((id: string) => {
    setFavorites((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  }, []);

  const isFavorited = useCallback(
    (id: string): boolean => {
      return !!favorites[id];
    },
    [favorites]
  );

  return {
    favorites,
    toggleFavorite,
    isFavorited,
  };
}
