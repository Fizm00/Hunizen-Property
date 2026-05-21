import type { Variants } from "framer-motion";

/* ─── Premium Easing Curves ─── */

/**
 * Custom cubic-bezier curves for a refined, premium feel.
 * - `smooth`: gentle deceleration — great for entrance reveals
 * - `spring`: slight overshoot bounce — feels alive on cards/buttons
 * - `expo`:  aggressive slow-down — dramatic hero-level reveals
 */
export const ease = {
  smooth: [0.25, 0.1, 0.25, 1.0] as [number, number, number, number],
  spring: [0.34, 1.56, 0.64, 1.0] as [number, number, number, number],
  expo:   [0.16, 1.0,  0.3,  1.0] as [number, number, number, number],
};

/* ─── Shared Animation Variants ─── */

/** Stagger container — wraps children that use child variants */
export const staggerContainer = (staggerDelay = 0.12): Variants => ({
  hidden: {},
  visible: {
    transition: {
      staggerChildren: staggerDelay,
      delayChildren: 0.05,
    },
  },
});

/** Child variant — fades + slides up into view with premium curve */
export const itemFadeUp = (y = 60, duration = 1): Variants => ({
  hidden: { y, opacity: 0, filter: "blur(8px)" },
  visible: {
    y: 0,
    opacity: 1,
    filter: "blur(0px)",
    transition: { duration, ease: ease.expo },
  },
});

/** Child variant — scales up from slightly small with subtle blur */
export const itemScaleUp = (duration = 1): Variants => ({
  hidden: { scale: 0.92, opacity: 0, filter: "blur(6px)" },
  visible: {
    scale: 1,
    opacity: 1,
    filter: "blur(0px)",
    transition: { duration, ease: ease.expo },
  },
});

/** Slide in from the left */
export const slideInLeft = (x = -60, duration = 1.1): Variants => ({
  hidden: { x, opacity: 0, filter: "blur(6px)" },
  visible: {
    x: 0,
    opacity: 1,
    filter: "blur(0px)",
    transition: { duration, ease: ease.expo },
  },
});

/** Slide in from the right */
export const slideInRight = (x = 60, duration = 1.1): Variants => ({
  hidden: { x, opacity: 0, filter: "blur(6px)" },
  visible: {
    x: 0,
    opacity: 1,
    filter: "blur(0px)",
    transition: { duration, ease: ease.expo },
  },
});

/* ─── Shared Scroll Trigger Props ─── */

/** Reusable viewport config for `whileInView` triggers */
export const scrollViewport = { once: true, margin: "-80px" } as const;

/* ─── Inline Transition Presets ─── */

/** For hero-level entrance animations (initial → animate, not variants) */
export const heroTransition = (delay = 0) => ({
  duration: 1.2,
  delay,
  ease: ease.expo,
});

/** For section headers entering on scroll */
export const sectionTransition = (delay = 0) => ({
  duration: 1,
  delay,
  ease: ease.expo,
});
