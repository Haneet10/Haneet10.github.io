"use client";

import { motion, useReducedMotion } from "motion/react";
import { Children } from "react";

/** Staggers the hero's text in on first load. */
export function HeroIntro({ children, className }: { children: React.ReactNode; className?: string }) {
  const reduce = useReducedMotion();
  return (
    <div className={className}>
      {Children.map(children, (child, i) => (
        <motion.div
          initial={reduce ? false : { opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.08 + i * 0.09, ease: [0.22, 1, 0.36, 1] }}
        >
          {child}
        </motion.div>
      ))}
    </div>
  );
}
