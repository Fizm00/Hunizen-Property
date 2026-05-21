import { 
  FEATURE_CARDS, 
  PROMO_KOST, 
  RECOM_KOST, 
  SEARCH_PROPERTIES,
  PROPERTY_DETAILS_DB
} from "../constants";
import type { FeatureCard, KostCard, SearchKostCard, PropertyDetail } from "../types";

/**
 * PropertyService handles property data fetching and search operations.
 * It simulates asynchronous API requests using Promises to mimic a production environment.
 */
class PropertyService {
  /**
   * Simulated delay to mimic API latency (milliseconds)
   */
  private readonly delayMs = 300;

  /**
   * Helper to wrap data in a Promise with simulated latency
   */
  private async simulateFetch<T>(data: T): Promise<T> {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(data);
      }, this.delayMs);
    });
  }

  /**
   * Fetches featured list cards for landing page
   */
  public async getFeaturedProperties(): Promise<FeatureCard[]> {
    return this.simulateFetch(FEATURE_CARDS);
  }

  /**
   * Fetches promo property listings
   */
  public async getPromoProperties(): Promise<KostCard[]> {
    return this.simulateFetch(PROMO_KOST);
  }

  /**
   * Fetches recommended property listings
   */
  public async getRecommendedProperties(): Promise<KostCard[]> {
    return this.simulateFetch(RECOM_KOST);
  }

  /**
   * Fetches all properties available for search page
   */
  public async getSearchProperties(): Promise<SearchKostCard[]> {
    return this.simulateFetch(SEARCH_PROPERTIES);
  }

  /**
   * Fetches detailed information for a single property by its ID.
   * If details are not explicitly present, it auto-generates them from basic search card fields.
   */
  public async getPropertyById(id: string): Promise<PropertyDetail | null> {
    return this.simulateFetch(this.getPropertyByIdSync(id));
  }

  private getPropertyByIdSync(id: string): PropertyDetail | null {
    // 1. Find the basic property in SEARCH_PROPERTIES
    const base = SEARCH_PROPERTIES.find((p) => p.id === id);
    if (!base) return null;

    // 2. Fetch explicit details if present
    const explicit = PROPERTY_DETAILS_DB[id];
    
    // 3. Fallback / default generator for any search properties without explicit details
    const fallbackGallery = [base.img, base.img, base.img, base.img, base.img]; // simple gallery reuse
    const defaultHost = {
      name: "John Doberman",
      avatar: "https://api.dicebear.com/7.x/adventurer/svg?seed=John",
      joined: "Nov 2023",
    };
    const defaultHighlights = base.facilities.slice(0, 4);
    const defaultRoomSpecs = [`${base.specs.bed} Bed`, `${base.specs.bath} Bath`, "Termasuk listrik"];
    const defaultBathroomFacilities = ["Shower", "Kloset Duduk"];
    const defaultRulesDetails = base.rules.length > 0 ? base.rules : ["Maks. 2 orang/kamar", "Akses 24 jam"];
    const defaultRoomTypes = [
      {
        name: "Standard Room",
        price: base.price.split(" / ")[0],
        specs: base.specs,
        img: base.img,
        facilities: base.facilities.slice(0, 5),
      },
    ];
    const defaultNearbyPlaces = [
      { name: "Minimarket Terdekat", distance: "350 m", rating: 4.5 },
      { name: "Warung Makan", distance: "500 m", rating: 4.4 },
    ];
    const defaultRentalTerms = {
      min: "Bisa di hari H setelah pengajuan.",
      max: "1 bulan setelah pengajuan sewa.",
    };
    const defaultReviewsList = [
      {
        avatar: "https://api.dicebear.com/7.x/adventurer/svg?seed=User",
        name: "Penyewa Terverifikasi",
        date: "Apr 20 2026",
        content: "Lokasi strategis, fasilitas lengkap sesuai dengan deskripsi iklan. Owner responsif.",
        rating: 5,
      },
    ];

    return {
      ...base,
      gallery: explicit?.gallery || fallbackGallery,
      host: explicit?.host || defaultHost,
      highlights: explicit?.highlights || defaultHighlights,
      roomSpecs: explicit?.roomSpecs || defaultRoomSpecs,
      bathroomFacilities: explicit?.bathroomFacilities || defaultBathroomFacilities,
      rulesDetails: explicit?.rulesDetails || defaultRulesDetails,
      roomTypes: explicit?.roomTypes || defaultRoomTypes,
      nearbyPlaces: explicit?.nearbyPlaces || defaultNearbyPlaces,
      rentalTerms: explicit?.rentalTerms || defaultRentalTerms,
      reviewsList: explicit?.reviewsList || defaultReviewsList,
    };
  }
}

export const propertyService = new PropertyService();
