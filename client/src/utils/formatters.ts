/**
 * Generates an anchor-friendly slug from a label.
 * E.g., "Tentang Kami" -> "#tentang-kami"
 */
export const toSlug = (label: string): string => {
  return `#${label.toLowerCase().replace(/\s+/g, "-")}`;
};

/**
 * Formats a raw property price string for map marker labeling.
 * E.g., "Rp 650.000 / bln" -> "650"
 * E.g., "Rp 150.000 / hari" -> "150/h"
 */
export const formatPriceLabel = (price: string): string => {
  return price
    .replace("Rp ", "")
    .replace(".000", "")
    .replace(" / bln", "")
    .replace(" / hari", "/h");
};
