export const themeVisuals = {
  codex: {
    bg: "#07070A",
    panel: "#141017",
    glow: "#6E1F35",
    glowSoft: "#D8D5CF",
  },

  fossil: {
    bg: "#080908",
    panel: "#12130F",
    glow: "#718C5A",
    glowSoft: "#C9B27C",
  },

  classified: {
    bg: "#050608",
    panel: "#101116",
    glow: "#7A1F2B",
    glowSoft: "#D8D5CF",
  },

  cruxball: {
    bg: "#05070A",
    panel: "#101720",
    glow: "#2F6F9F",
    glowSoft: "#D13B3B",
  },

  tundra: {
    bg: "#061016",
    panel: "#0D1B22",
    glow: "#8FB8C8",
    glowSoft: "#7F9C6A",
  },

  sphere: {
    bg: "#070912",
    panel: "#101525",
    glow: "#7BBCE8",
    glowSoft: "#B24A5B",
  },

  incident: {
    bg: "#080808",
    panel: "#151515",
    glow: "#B52D2D",
    glowSoft: "#2D6FB5",
  },
} as const;

export type ThemeVisualId = keyof typeof themeVisuals;

const storyThemeBySlug: Record<string, ThemeVisualId> = {
  "la-criatura-que-sonaba": "fossil",
  "saga-platina": "classified",
  "steel-and-instinct": "cruxball",
  "the-howl-of-freedom": "tundra",
  "howls-of-liberty": "tundra",
  "to-my-dear-sphere": "sphere",
  "they-are-all-caught-with-me": "incident",
};

export function getThemeVisualIdFromPathname(pathname: string): ThemeVisualId {
  const segments = pathname.split("/").filter(Boolean);

  if (segments[0] === "stories" && segments[1]) {
    return storyThemeBySlug[segments[1]] ?? "codex";
  }

  return "codex";
}