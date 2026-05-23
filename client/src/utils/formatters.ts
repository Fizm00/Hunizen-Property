export const toSlug = (label: string): string => {
  return `#${label.toLowerCase().replace(/\s+/g, "-")}`;
};

export const formatPriceLabel = (price: string): string => {
  return price
    .replace("Rp ", "")
    .replace(".000", "")
    .replace(" / bln", "")
    .replace(" / hari", "/h");
};

export const formatIDR = (num: number): string => {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0
  }).format(num);
};

