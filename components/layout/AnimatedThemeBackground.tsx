"use client";

import { motion } from "framer-motion";
import { usePathname } from "next/navigation";
import {
  getThemeVisualIdFromPathname,
  themeVisuals,
} from "../../lib/theme-visuals";

export function AnimatedThemeBackground() {
  const pathname = usePathname();
  const themeId = getThemeVisualIdFromPathname(pathname);
  const theme = themeVisuals[themeId];

  return (
    <div className="pointer-events-none fixed inset-0 -z-20 overflow-hidden">
      <motion.div
        className="absolute inset-0"
        animate={{
          backgroundColor: theme.bg,
        }}
        transition={{
          duration: 1.45,
          ease: [0.22, 1, 0.36, 1],
        }}
      />

      <motion.div
        className="absolute -left-40 -top-40 h-[42rem] w-[42rem] rounded-full blur-3xl"
        animate={{
          backgroundColor: theme.glow,
          opacity: 0.18,
          scale: [1, 1.03, 1],
        }}
        transition={{
          backgroundColor: {
            duration: 1.45,
            ease: [0.22, 1, 0.36, 1],
          },
          opacity: {
            duration: 1.1,
          },
          scale: {
            duration: 7,
            repeat: Infinity,
            ease: "easeInOut",
          },
        }}
      />

      <motion.div
        className="absolute -bottom-44 -right-44 h-[38rem] w-[38rem] rounded-full blur-3xl"
        animate={{
          backgroundColor: theme.glowSoft,
          opacity: 0.08,
          scale: [1, 1.04, 1],
        }}
        transition={{
          backgroundColor: {
            duration: 2.45,
            ease: [0.22, 1, 0.36, 1],
          },
          opacity: {
            duration: 2.1,
          },
          scale: {
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          },
        }}
      />

      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.018)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.018)_1px,transparent_1px)] bg-[size:48px_48px] opacity-35" />

      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.42)_78%)]" />
    </div>
  );
}