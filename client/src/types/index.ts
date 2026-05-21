import type { ReactNode } from "react";

/** Feature card displayed in the Features section */
export interface FeatureCard {
  img: string;
  badge: string;
  title: string;
  desc: string;
  specs: string[];
}

/** Property listing specs (bed count, bath count, etc.) */
export interface KostSpecs {
  bed: number;
  bath: number;
  ac: number;
  wifi: number;
}

/** Property listing card displayed in Promo / Rekomendasi sections */
export interface KostCard {
  id: string;
  img: string;
  price: string;
  title: string;
  location: string;
  specs: KostSpecs;
}

/** Property card for search page with map coordinates, ratings, and rules */
export interface SearchKostCard extends KostCard {
  rating: number;
  type: "Campur" | "Putra" | "Putri";
  period: "Harian" | "Mingguan" | "Bulanan" | "3 Bulan" | "6 Bulan" | "Tahunan";
  priceVal: number; // numeric value for sorting/filtering
  originalPrice?: string;
  roomLeft: number;
  coordinates: { x: number; y: number }; // Relative coordinates on the custom vector map (0-100)
  latLng: [number, number]; // Latitude and Longitude for Leaflet map
  facilities: string[]; // e.g., ["WiFi", "AC", "Laundry", "Dapur"]
  rules: string[]; // e.g., ["Akses 24 jam", "Boleh pasutri"]
}

export interface RoomType {
  name: string;
  price: string;
  specs: { bed: number; bath: number; ac: number; wifi: number };
  img: string;
  facilities: string[];
}

export interface NearbyPlace {
  name: string;
  distance: string;
  rating: number;
}

export interface ReviewItem {
  avatar: string;
  name: string;
  date: string;
  content: string;
  rating: number;
}

export interface PropertyDetail extends SearchKostCard {
  gallery: string[];
  host: {
    name: string;
    avatar: string;
    joined: string;
  };
  highlights: string[];
  roomSpecs: string[];
  bathroomFacilities: string[];
  rulesDetails: string[];
  roomTypes: RoomType[];
  nearbyPlaces: NearbyPlace[];
  rentalTerms: {
    min: string;
    max: string;
  };
  reviewsList: ReviewItem[];
}


/** "Why choose us" item displayed in Showcase grid */
export interface WhyChooseUsItem {
  id: string;
  img: string;
  title: string;
  desc: string;
  icon: ReactNode;
}

/** CTA video preview card */
export interface VideoCard {
  img: string;
  handle: string;
}

/** Search filter field in Hero search bar */
export interface SearchFilter {
  label: string;
  placeholder: string;
  minWidth: string;
}

/** Footer link column */
export interface FooterColumn {
  title: string;
  links: string[];
}
