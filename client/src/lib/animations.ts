import type { Variants } from "framer-motion";

export const ease = {
  smooth: [0.25, 0.1, 0.25, 1.0] as [number, number, number, number],
  spring: [0.34, 1.56, 0.64, 1.0] as [number, number, number, number],
  expo:   [0.16, 1.0,  0.3,  1.0] as [number, number, number, number],
};

export const staggerContainer = (staggerDelay = 0.12): Variants => ({
  hidden: {},
  visible: {
    transition: {
      staggerChildren: staggerDelay,
      delayChildren: 0.05,
    },
  },
});

export const itemFadeUp = (y = 60, duration = 1): Variants => ({
  hidden: { y, opacity: 0, filter: "blur(8px)" },
  visible: {
    y: 0,
    opacity: 1,
    filter: "blur(0px)",
    transition: { duration, ease: ease.expo },
  },
});

export const itemScaleUp = (duration = 1): Variants => ({
  hidden: { scale: 0.92, opacity: 0, filter: "blur(6px)" },
  visible: {
    scale: 1,
    opacity: 1,
    filter: "blur(0px)",
    transition: { duration, ease: ease.expo },
  },
});

export const slideInLeft = (x = -60, duration = 1.1): Variants => ({
  hidden: { x, opacity: 0, filter: "blur(6px)" },
  visible: {
    x: 0,
    opacity: 1,
    filter: "blur(0px)",
    transition: { duration, ease: ease.expo },
  },
});

export const slideInRight = (x = 60, duration = 1.1): Variants => ({
  hidden: { x, opacity: 0, filter: "blur(6px)" },
  visible: {
    x: 0,
    opacity: 1,
    filter: "blur(0px)",
    transition: { duration, ease: ease.expo },
  },
});

export const scrollViewport = { once: true, margin: "-80px" } as const;

export const heroTransition = (delay = 0) => ({
  duration: 1.2,
  delay,
  ease: ease.expo,
});

export const sectionTransition = (delay = 0) => ({
  duration: 1,
  delay,
  ease: ease.expo,
});
