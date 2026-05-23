import { useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import type { SearchOption } from "../constants/hero";
import {
  LOCATION_OPTIONS,
  TYPE_OPTIONS,
  PRICE_OPTIONS,
  FACILITY_OPTIONS,
  RULE_OPTIONS,
} from "../constants/hero";

export function useHeroSearch() {
  const navigate = useNavigate();

  const [selections, setSelections] = useState<{
    location: SearchOption | null;
    type: SearchOption | null;
    price: SearchOption | null;
    facility: SearchOption | null;
    rule: SearchOption | null;
  }>({
    location: null,
    type: null,
    price: null,
    facility: null,
    rule: null,
  });

  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [keyword, setKeyword] = useState<string>("");

  const getOptionsFor = useCallback((label: string): SearchOption[] => {
    switch (label) {
      case "Location":
        return LOCATION_OPTIONS;
      case "Tipe":
        return TYPE_OPTIONS;
      case "Harga":
        return PRICE_OPTIONS;
      case "Fasilitas":
        return FACILITY_OPTIONS;
      case "Aturan":
        return RULE_OPTIONS;
      default:
        return [];
    }
  }, []);

  const getSelectedDisplay = useCallback((label: string) => {
    switch (label) {
      case "Location":
        return selections.location
          ? { text: selections.location.label, isCustom: true }
          : { text: "Dimana?", isCustom: false };
      case "Tipe":
        return selections.type
          ? { text: selections.type.label, isCustom: true }
          : { text: "Tipe Kost", isCustom: false };
      case "Harga":
        return selections.price
          ? { text: selections.price.label, isCustom: true }
          : { text: "Range Harga", isCustom: false };
      case "Fasilitas":
        return selections.facility
          ? { text: selections.facility.label, isCustom: true }
          : { text: "Fasilitas Kost", isCustom: false };
      case "Aturan":
        return selections.rule
          ? { text: selections.rule.label, isCustom: true }
          : { text: "Aturan Kost", isCustom: false };
      default:
        return { text: "", isCustom: false };
    }
  }, [selections]);

  const handleSelect = useCallback((label: string, option: SearchOption) => {
    setSelections((prev) => {
      let key: keyof typeof prev;
      if (label === "Location") key = "location";
      else if (label === "Tipe") key = "type";
      else if (label === "Harga") key = "price";
      else if (label === "Fasilitas") key = "facility";
      else key = "rule";

      return {
        ...prev,
        [key]: option.value === "" ? null : option,
      };
    });
    setActiveDropdown(null);
  }, []);

  const handleSearch = useCallback((e?: React.MouseEvent) => {
    if (e) e.stopPropagation();

    const params = new URLSearchParams();
    if (keyword.trim() !== "") {
      params.set("query", keyword);
    }
    if (selections.location && selections.location.value) {
      params.set("location", selections.location.value);
    }
    if (selections.type && selections.type.value) {
      params.set("type", selections.type.value);
    }
    if (selections.price && selections.price.value) {
      const [min, max] = selections.price.value.split("-");
      params.set("minPrice", min);
      params.set("maxPrice", max);
    }
    if (selections.facility && selections.facility.value) {
      params.set("facilities", selections.facility.value);
    }
    if (selections.rule && selections.rule.value) {
      params.set("rules", selections.rule.value);
    }

    const queryStr = params.toString();
    navigate(queryStr ? `/search?${queryStr}` : "/search");
  }, [selections, keyword, navigate]);

  return {
    selections,
    keyword,
    setKeyword,
    activeDropdown,
    setActiveDropdown,
    getOptionsFor,
    getSelectedDisplay,
    handleSelect,
    handleSearch,
  };
}
