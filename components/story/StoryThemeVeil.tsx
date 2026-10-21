"use client";

import { motion } from "framer-motion";

type StoryThemeVeilProps = {
  accent?: string;
};

export function StoryThemeVeil({ accent = "var(--story-accent)" }: StoryThemeVeilProps) {
  return (
    <motion.div
      className="pointer-events-none fixed inset-0 z-40"
      initial={{
        opacity: 1,
        background:
          `radial-gradient(circle at center, ${accent} 0%, rgba(0,0,0,0.92) 52%, rgba(0,0,0,1) 100%)`,
      }}
      animate={{
        opacity: 0,
      }}
      transition={{
        duration: 0.85,
        ease: [0.22, 1, 0.36, 1],
      }}
    />
  );
}