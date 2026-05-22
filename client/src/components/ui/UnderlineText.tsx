interface UnderlineTextProps {
  children: string;
}

/**
 * Renders text with the signature wavy SVG underline decoration.
 * Used consistently across section headers.
 */
export default function UnderlineText({ children }: UnderlineTextProps) {
  return (
    <span className="relative inline-block text-brand-green">
      {children}
      <svg
        className="absolute w-full h-2.5 -bottom-0.5 left-0 text-brand-green-accent"
        viewBox="0 0 100 10"
        preserveAspectRatio="none"
        fill="currentColor"
      >
        <path d="M0 5 Q 50 10 100 5 L 100 8 Q 50 13 0 8 Z" />
      </svg>
    </span>
  );
}
