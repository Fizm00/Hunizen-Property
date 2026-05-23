import { useState, useMemo, useCallback, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { propertyService } from "../services/propertyService";
import type { SearchKostCard } from "../types";

export type GenderFilter = "Semua Tipe" | "Campur" | "Putra" | "Putri";
export type PeriodFilter = "Semua Periode" | "Harian" | "Mingguan" | "Bulanan" | "3 Bulan" | "6 Bulan" | "Tahunan";
export type SortFilter = "rekomendasi" | "terendah" | "tertinggi";
export type MobileLayoutView = "list" | "map";

export function usePropertySearch() {
  const [properties, setProperties] = useState<SearchKostCard[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const location = useLocation();

  const searchParams = useMemo(() => new URLSearchParams(location.search), [location.search]);

  const [searchQuery, setSearchQuery] = useState<string>(() => {
    return searchParams.get("query") || searchParams.get("location") || "";
  });
  const [urlLocation, setUrlLocation] = useState<string>(() => {
    return searchParams.get("query") ? (searchParams.get("location") || "") : "";
  });
  const [activeGender, setActiveGender] = useState<GenderFilter>(() => {
    const type = searchParams.get("type");
    if (type === "Putra" || type === "Putri" || type === "Campur") return type;
    return "Semua Tipe";
  });
  const [activePeriod, setActivePeriod] = useState<PeriodFilter>("Semua Periode");
  const [activeFacilities, setActiveFacilities] = useState<string[]>(() => {
    const facilities = searchParams.get("facilities");
    return facilities ? [facilities] : [];
  });
  const [minPrice, setMinPrice] = useState<number>(() => {
    const min = searchParams.get("minPrice");
    return min ? Number(min) : 0;
  });
  const [maxPrice, setMaxPrice] = useState<number>(() => {
    const max = searchParams.get("maxPrice");
    return max ? Number(max) : 20000000;
  });
  const [activeRules, setActiveRules] = useState<string[]>(() => {
    const rules = searchParams.get("rules");
    return rules ? [rules] : [];
  });
  const [activeSort, setActiveSort] = useState<SortFilter>("rekomendasi");
  const [isFilterModalOpen, setIsFilterModalOpen] = useState<boolean>(false);
  const [mobileView, setMobileView] = useState<MobileLayoutView>("list");
  const [hoveredPropertyId, setHoveredPropertyId] = useState<string | null>(null);
  const [selectedPropertyId, setSelectedPropertyId] = useState<string | null>(null);

  const [prevSearch, setPrevSearch] = useState(location.search);

  if (location.search !== prevSearch) {
    setPrevSearch(location.search);
    const params = new URLSearchParams(location.search);
    
    const q = params.get("query");
    const loc = params.get("location");
    if (q !== null) {
      setSearchQuery(q);
      setUrlLocation(loc || "");
    } else if (loc !== null) {
      setSearchQuery(loc);
      setUrlLocation("");
    }
    
    const type = params.get("type");
    if (type === "Putra" || type === "Putri" || type === "Campur") {
      setActiveGender(type);
    } else if (type === "") {
      setActiveGender("Semua Tipe");
    }
    
    const facilities = params.get("facilities");
    if (facilities !== null) {
      setActiveFacilities(facilities ? [facilities] : []);
    }
    
    const rules = params.get("rules");
    if (rules !== null) {
      setActiveRules(rules ? [rules] : []);
    }
    
    const minPrice = params.get("minPrice");
    if (minPrice !== null) {
      setMinPrice(Number(minPrice));
    }
    
    const maxPrice = params.get("maxPrice");
    if (maxPrice !== null) {
      setMaxPrice(Number(maxPrice));
    }
  }

  useEffect(() => {
    let isMounted = true;
    async function fetchSearchProperties() {
      try {
        setLoading(true);
        const data = await propertyService.getSearchProperties();
        if (isMounted) {
          setProperties(data);
        }
      } catch (error) {
        console.error("Failed to load search properties:", error);
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    }
    fetchSearchProperties();
    return () => {
      isMounted = false;
    };
  }, []);

  const filteredProperties = useMemo<SearchKostCard[]>(() => {
    const filtered = properties.filter((item) => {
      if (searchQuery.trim() !== "") {
        const query = searchQuery.toLowerCase();
        const matchesTitle = item.title.toLowerCase().includes(query);
        const matchesLocation = item.location.toLowerCase().includes(query);
        if (!matchesTitle && !matchesLocation) return false;
      }

      if (urlLocation.trim() !== "") {
        const locFilter = urlLocation.toLowerCase();
        if (!item.location.toLowerCase().includes(locFilter)) {
          return false;
        }
      }

      if (activeGender !== "Semua Tipe" && item.type !== activeGender) {
        return false;
      }
      if (activePeriod !== "Semua Periode" && item.period !== activePeriod) {
        return false;
      }

      if (item.priceVal < minPrice || item.priceVal > maxPrice) {
        return false;
      }
      if (activeRules.length > 0) {
        const hasAllRules = activeRules.every((rule) =>
          item.rules?.includes(rule)
        );
        if (!hasAllRules) return false;
      }

      if (activeFacilities.length > 0) {
        const hasAllFacilities = activeFacilities.every((facility) =>
          item.facilities.includes(facility)
        );
        if (!hasAllFacilities) return false;
      }

      return true;
    });

    if (activeSort === "terendah") {
      return [...filtered].sort((a, b) => a.priceVal - b.priceVal);
    } else if (activeSort === "tertinggi") {
      return [...filtered].sort((a, b) => b.priceVal - a.priceVal);
    } else {
      return [...filtered].sort((a, b) => b.rating - a.rating);
    }
  }, [properties, searchQuery, urlLocation, activeGender, activePeriod, activeFacilities, minPrice, maxPrice, activeRules, activeSort]);

  const selectedProperty = useMemo<SearchKostCard | null>(() => {
    if (!selectedPropertyId) return null;
    return properties.find((item) => item.id === selectedPropertyId) || null;
  }, [properties, selectedPropertyId]);

  const handleFacilityToggle = useCallback((facility: string) => {
    setActiveFacilities((prev) =>
      prev.includes(facility)
        ? prev.filter((f) => f !== facility)
        : [...prev, facility]
    );
  }, []);

  const handleRuleToggle = useCallback((rule: string) => {
    setActiveRules((prev) =>
      prev.includes(rule)
        ? prev.filter((r) => r !== rule)
        : [...prev, rule]
    );
  }, []);

  const activeFiltersCount = useMemo(() => {
    let count = activeFacilities.length + activeRules.length;
    if (activeGender !== "Semua Tipe") count++;
    if (activePeriod !== "Semua Periode") count++;
    if (minPrice > 0) count++;
    if (maxPrice < 20000000) count++;
    if (activeSort !== "rekomendasi") count++;
    return count;
  }, [activeFacilities, activeRules, activeGender, activePeriod, minPrice, maxPrice, activeSort]);

  const resetFilters = useCallback(() => {
    setActiveGender("Semua Tipe");
    setActivePeriod("Semua Periode");
    setActiveFacilities([]);
    setMinPrice(0);
    setMaxPrice(20000000);
    setActiveRules([]);
    setActiveSort("rekomendasi");
    setSearchQuery("");
    setUrlLocation("");
  }, []);

  return {
    loading,
    searchQuery,
    setSearchQuery,
    activeGender,
    setActiveGender,
    activePeriod,
    setActivePeriod,
    activeFacilities,
    minPrice,
    setMinPrice,
    maxPrice,
    setMaxPrice,
    activeRules,
    handleRuleToggle,
    activeSort,
    setActiveSort,
    activeFiltersCount,
    isFilterModalOpen,
    setIsFilterModalOpen,
    mobileView,
    setMobileView,
    hoveredPropertyId,
    setHoveredPropertyId,
    selectedPropertyId,
    setSelectedPropertyId,
    filteredProperties,
    selectedProperty,
    handleFacilityToggle,
    resetFilters,
  };
}
