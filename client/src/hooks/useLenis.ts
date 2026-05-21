import { useEffect } from "react";
import Lenis from "lenis";

/**
 * Initialises Lenis smooth-scroll on mount and tears it down on unmount.
 * Call once at the app root (e.g. inside `App.tsx`).
 */
export function useLenis() {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);
}
