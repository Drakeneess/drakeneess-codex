"use client";

import { useThemeRuntime } from "./ThemeRuntime";

export function AnimatedThemeBackground() {
  const { theme } = useThemeRuntime();
  const visuals = theme.visuals;

  const background = [
    "linear-gradient(rgba(255,255,255,0.018) 1px, transparent 1px)",
    "linear-gradient(90deg, rgba(255,255,255,0.018) 1px, transparent 1px)",
    "radial-gradient(circle at center, transparent 0%, rgba(0,0,0,0.42) 78%)",
    `radial-gradient(circle at top left, color-mix(in srgb, ${visuals.accent} 18%, transparent), transparent 34rem)`,
    `radial-gradient(circle at bottom right, color-mix(in srgb, ${visuals.accentSoft} 8%, transparent), transparent 30rem)`,
    visuals.bg,
  ].join(", ");

  return (
    <div
      className="pointer-events-none fixed inset-0 -z-20"
      style={{
        background,
        backgroundSize: "48px 48px, 48px 48px, auto, auto, auto, auto",
      }}
    />
  );
}
