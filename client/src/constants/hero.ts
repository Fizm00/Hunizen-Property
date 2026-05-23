/* ─── Konstanta Filter Pencarian Hero ─── */

export interface SearchOption {
  label: string;
  value: string;
}

export const LOCATION_OPTIONS: SearchOption[] = [
  { label: "Yogyakarta", value: "Yogyakarta" },
  { label: "Jakarta", value: "Jakarta" },
  { label: "Tangerang", value: "Tangerang" },
  { label: "Semua Lokasi", value: "" },
];

export const TYPE_OPTIONS: SearchOption[] = [
  { label: "Kost Putra", value: "Putra" },
  { label: "Kost Putri", value: "Putri" },
  { label: "Kost Campur", value: "Campur" },
  { label: "Semua Tipe", value: "" },
];

export const PRICE_OPTIONS: SearchOption[] = [
  { label: "< Rp 1.000.000", value: "0-1000000" },
  { label: "Rp 1.000.000 - Rp 2.000.000", value: "1000000-2000000" },
  { label: "> Rp 2.000.000", value: "2000000-20000000" },
  { label: "Semua Harga", value: "" },
];

export const FACILITY_OPTIONS: SearchOption[] = [
  { label: "WiFi", value: "WiFi" },
  { label: "AC", value: "AC" },
  { label: "KM Dalam", value: "KM Dalam" },
  { label: "Parkir Mobil", value: "Parkir Mobil" },
  { label: "Dapur", value: "Dapur" },
  { label: "Semua Fasilitas", value: "" },
];

export const RULE_OPTIONS: SearchOption[] = [
  { label: "Akses 24 Jam", value: "Akses 24 jam" },
  { label: "Boleh Bawa Hewan", value: "Boleh bawa hewan" },
  { label: "Maks. 2 Orang", value: "Maks. 2 orang/kamar" },
  { label: "Boleh Pasutri", value: "Boleh pasutri" },
  { label: "Semua Aturan", value: "" },
];
