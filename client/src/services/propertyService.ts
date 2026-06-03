import { api } from "./api";
import type { FeatureCard, KostCard, SearchKostCard, PropertyDetail, ReviewItem } from "../types";
import { FEATURE_CARDS } from "../constants";

// Definisikan antarmuka (interface) data dari API Backend Express untuk validasi tipe yang aman
export interface ApiHost {
  _id: string;
  name: string;
  phone?: string;
  email?: string;
  avatarUrl?: string;
  isVerified?: boolean;
  createdAt?: string;
}

export interface ApiRoomType {
  name: string;
  price: string;
  specs: {
    bed: number;
    bath: number;
    ac: number;
    wifi: number;
  };
  img?: string;
  facilities?: string[];
}

export interface ApiNearbyPlace {
  name: string;
  distance: string;
  rating: number;
}

export interface ApiProperty {
  _id: string;
  title: string;
  location: string;
  type: "Campur" | "Putra" | "Putri";
  period: "Harian" | "Mingguan" | "Bulanan" | "3 Bulan" | "6 Bulan" | "Tahunan";
  priceVal: number;
  price: string;
  originalPrice?: string;
  roomLeft: number;
  latLng: [number, number];
  facilities: string[];
  rules: string[];
  gallery: string[];
  host?: ApiHost;
  highlights?: string[];
  roomSpecs?: string[];
  bathroomFacilities?: string[];
  rulesDetails?: string[];
  roomTypes?: ApiRoomType[];
  nearbyPlaces?: ApiNearbyPlace[];
  rentalTerms?: {
    min: string;
    max: string;
  };
  rating?: number;
  createdAt?: string;
}

export interface ApiReviewTenant {
  _id: string;
  name: string;
  avatarUrl?: string;
  gender?: string;
}

export interface ApiReview {
  _id: string;
  tenant?: ApiReviewTenant;
  property: string;
  rating: number;
  comment: string;
  landlordReply?: string;
  createdAt?: string;
}

/**
 * Pemetaan helper dari objek ApiProperty (MongoDB) ke bentuk SearchKostCard (Frontend).
 */
function mapPropertyToSearchKost(p: ApiProperty): SearchKostCard {
  const specs = p.roomTypes && p.roomTypes[0] 
    ? p.roomTypes[0].specs 
    : { bed: 1, bath: 1, ac: 1, wifi: 1 };
    
  return {
    id: p._id,
    img: p.gallery && p.gallery[0] ? p.gallery[0] : "",
    price: p.price,
    originalPrice: p.originalPrice,
    priceVal: p.priceVal,
    title: p.title,
    location: p.location,
    type: p.type || "Campur",
    period: p.period || "Bulanan",
    rating: p.rating || 4.8,
    roomLeft: p.roomLeft || 3,
    specs: specs,
    coordinates: { x: p.latLng?.[1] || 0, y: p.latLng?.[0] || 0 },
    latLng: p.latLng || [-7.7715, 110.3855],
    facilities: p.facilities || [],
    rules: p.rules || [],
  };
}

/**
 * PropertyService handles property data fetching and search operations.
 * It interacts with backend REST API endpoints.
 */
class PropertyService {
  /**
   * Mengambil data kartu fitur statis di Landing Page.
   */
  public async getFeaturedProperties(): Promise<FeatureCard[]> {
    return FEATURE_CARDS;
  }

  /**
   * Mengambil properti promo dari database.
   */
  public async getPromoProperties(): Promise<KostCard[]> {
    try {
      const response = await api.get<{ success: boolean; properties: ApiProperty[] }>("/properties");
      const list = response.data.properties || [];
      // Filter properti yang memiliki harga asli (originalPrice) untuk promo
      const promoList = list.filter((p) => p.originalPrice);
      const selected = promoList.length > 0 ? promoList : list.slice(0, 3);
      return selected.map(mapPropertyToSearchKost);
    } catch (error) {
      console.error("Gagal memuat properti promo dari API:", error);
      return [];
    }
  }

  /**
   * Mengambil properti rekomendasi dari database.
   */
  public async getRecommendedProperties(): Promise<KostCard[]> {
    try {
      const response = await api.get<{ success: boolean; properties: ApiProperty[] }>("/properties");
      const list = response.data.properties || [];
      // Urutkan berdasarkan rating tertinggi
      const sorted = [...list].sort((a, b) => (b.rating || 4.8) - (a.rating || 4.8));
      return sorted.slice(0, 3).map(mapPropertyToSearchKost);
    } catch (error) {
      console.error("Gagal memuat properti rekomendasi dari API:", error);
      return [];
    }
  }

  /**
   * Mengambil semua properti untuk halaman pencarian.
   */
  public async getSearchProperties(): Promise<SearchKostCard[]> {
    try {
      const response = await api.get<{ success: boolean; properties: ApiProperty[] }>("/properties");
      const list = response.data.properties || [];
      return list.map(mapPropertyToSearchKost);
    } catch (error) {
      console.error("Gagal memuat semua properti dari API:", error);
      return [];
    }
  }

  /**
   * Mengambil data detail lengkap suatu properti beserta daftar ulasannya.
   */
  public async getPropertyById(id: string): Promise<PropertyDetail | null> {
    try {
      // Ambil detail properti dan ulasan secara paralel
      const [propRes, reviewRes] = await Promise.all([
        api.get<{ success: boolean; property: ApiProperty }>(`/properties/${id}`),
        api.get<{ success: boolean; reviews: ApiReview[] }>(`/reviews/property/${id}`).catch(() => ({ data: { reviews: [] as ApiReview[] } })),
      ]);

      const p = propRes.data.property;
      if (!p) return null;

      const base = mapPropertyToSearchKost(p);

      // Konversi ulasan dari database ke format frontend
      const reviewsList: ReviewItem[] = (reviewRes.data.reviews || []).map((r) => ({
        avatar: r.tenant?.avatarUrl || "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=200",
        name: r.tenant?.name || "Penyewa Terverifikasi",
        date: r.createdAt ? new Date(r.createdAt).toLocaleDateString("id-ID", { day: "numeric", month: "short", year: "numeric" }) : "Apr 20 2026",
        content: r.comment || "",
        rating: r.rating || 5,
      }));

      const defaultHost = {
        name: p.host?.name || "Pak Joko Widodo",
        avatar: p.host?.avatarUrl || "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=200",
        joined: p.host?.createdAt 
          ? new Date(p.host.createdAt).toLocaleDateString("id-ID", { month: "short", year: "numeric" }) 
          : "Nov 2023",
        phone: p.host?.phone,
      };

      const defaultRoomTypes = p.roomTypes && p.roomTypes.length > 0
        ? p.roomTypes.map((rt) => ({
            name: rt.name,
            price: rt.price,
            specs: rt.specs || { bed: 1, bath: 1, ac: 1, wifi: 1 },
            img: rt.img || base.img,
            facilities: rt.facilities || [],
          }))
        : [
            {
              name: "Standard Room",
              price: p.price ? p.price.split(" / ")[0] : "Rp 0",
              specs: base.specs,
              img: base.img,
              facilities: base.facilities.slice(0, 5),
            },
          ];

      return {
        ...base,
        gallery: p.gallery && p.gallery.length > 0 ? p.gallery : [base.img],
        host: defaultHost,
        highlights: p.highlights && p.highlights.length > 0 ? p.highlights : base.facilities.slice(0, 4),
        roomSpecs: p.roomSpecs && p.roomSpecs.length > 0 ? p.roomSpecs : [`Luas Kamar 3x4 m`, `Daya Listrik 1300 Watt`],
        bathroomFacilities: p.bathroomFacilities && p.bathroomFacilities.length > 0 ? p.bathroomFacilities : ["Shower", "Kloset Duduk"],
        rulesDetails: p.rulesDetails && p.rulesDetails.length > 0 ? p.rulesDetails : (base.rules.length > 0 ? base.rules : ["Akses 24 jam"]),
        roomTypes: defaultRoomTypes,
        nearbyPlaces: p.nearbyPlaces && p.nearbyPlaces.length > 0 ? p.nearbyPlaces : [
          { name: "Minimarket Terdekat", distance: "350 m", rating: 4.5 },
          { name: "Warung Makan", distance: "500 m", rating: 4.4 },
        ],
        rentalTerms: p.rentalTerms || {
          min: "Bisa di hari H setelah pengajuan.",
          max: "1 bulan setelah pengajuan sewa.",
        },
        reviewsList: reviewsList.length > 0 ? reviewsList : [
          {
            avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=200",
            name: "Penyewa Terverifikasi",
            date: "Apr 20 2026",
            content: "Lokasi strategis, fasilitas lengkap sesuai dengan deskripsi iklan. Owner responsif.",
            rating: 5,
          },
        ],
      };
    } catch (error) {
      console.error(`Gagal memuat properti ID ${id}:`, error);
      return null;
    }
  }
}

export const propertyService = new PropertyService();
