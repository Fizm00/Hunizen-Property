import { useState, useEffect } from "react";
import { propertyService } from "../services/propertyService";
import type { FeatureCard, KostCard } from "../types";

/**
 * Custom hook to load landing page properties asynchronously from the service layer.
 */
export function useProperties() {
  const [featured, setFeatured] = useState<FeatureCard[]>([]);
  const [promo, setPromo] = useState<KostCard[]>([]);
  const [recommended, setRecommended] = useState<KostCard[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;

    async function loadAllProperties() {
      try {
        setLoading(true);
        setError(null);

        // Fetch concurrently
        const [featData, promoData, recomData] = await Promise.all([
          propertyService.getFeaturedProperties(),
          propertyService.getPromoProperties(),
          propertyService.getRecommendedProperties(),
        ]);

        if (isMounted) {
          setFeatured(featData);
          setPromo(promoData);
          setRecommended(recomData);
        }
      } catch (err) {
        console.error("Failed to load properties:", err);
        if (isMounted) {
          setError("Gagal memuat data properti. Silakan coba lagi.");
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    }

    loadAllProperties();

    return () => {
      isMounted = false;
    };
  }, []);

  return {
    featured,
    promo,
    recommended,
    loading,
    error,
  };
}
