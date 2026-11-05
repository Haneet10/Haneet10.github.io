"use client";

import { motion, useReducedMotion } from "motion/react";

type Props = { children: React.ReactNode; delay?: number; className?: string; as?: "div" | "li" | "section" | "article" };

/** Fades content up as it enters the viewport. Once only; respects reduced motion. */
export function Reveal({ children, delay = 0, className, as = "div" }: Props) {
  const reduce = useReducedMotion();
  const Tag = motion[as];
  return (
    <Tag
      className={className}
      initial={reduce ? false : { opacity: 0, y: 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -8% 0px" }}
      transition={{ duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </Tag>
  );
}
