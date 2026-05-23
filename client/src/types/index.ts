import type { ReactNode } from "react";

export interface FeatureCard {
  img: string;
  badge: string;
  title: string;
  desc: string;
  specs: string[];
}

export interface KostSpecs {
  bed: number;
  bath: number;
  ac: number;
  wifi: number;
}

export interface KostCard {
  id: string;
  img: string;
  price: string;
  title: string;
  location: string;
  specs: KostSpecs;
}

export interface SearchKostCard extends KostCard {
  rating: number;
  type: "Campur" | "Putra" | "Putri";
  period: "Harian" | "Mingguan" | "Bulanan" | "3 Bulan" | "6 Bulan" | "Tahunan";
  priceVal: number;
  originalPrice?: string;
  roomLeft: number;
  coordinates: { x: number; y: number };
  latLng: [number, number];
  facilities: string[];
  rules: string[];
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


export interface WhyChooseUsItem {
  id: string;
  img: string;
  title: string;
  desc: string;
  icon: ReactNode;
}

export interface VideoCard {
  img: string;
  handle: string;
}

export interface SearchFilter {
  label: string;
  placeholder: string;
  minWidth: string;
}

export interface FooterColumn {
  title: string;
  links: string[];
}
