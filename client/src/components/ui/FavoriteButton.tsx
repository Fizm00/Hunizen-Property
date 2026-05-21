import { Heart } from "lucide-react";

interface FavoriteButtonProps {
  isFavorited: boolean;
  onToggle: () => void;
  /** Tailwind size class — defaults to "w-11 h-11" (large) */
  size?: "sm" | "lg";
}

/**
 * Heart-shaped favourite toggle button with glassmorphic background.
 * Used in Showcase cards for both large and small variants.
 */
export default function FavoriteButton({
  isFavorited,
  onToggle,
  size = "lg",
}: FavoriteButtonProps) {
  const sizeClasses = size === "sm"
    ? "w-9 h-9 top-4 right-4"
    : "w-11 h-11 top-6 right-6";

  const iconSize = size === "sm" ? "w-4 h-4" : "w-5 h-5";

  return (
    <button
      onClick={onToggle}
      className={`absolute ${sizeClasses} rounded-full bg-white/90 backdrop-blur-md flex items-center justify-center text-slate-600 hover:text-rose-500 shadow-md transition-all z-20 cursor-pointer`}
    >
      <Heart
        className={`${iconSize} transition-all ${
          isFavorited
            ? "fill-rose-500 stroke-rose-500 scale-110"
            : "stroke-slate-600"
        }`}
      />
    </button>
  );
}
