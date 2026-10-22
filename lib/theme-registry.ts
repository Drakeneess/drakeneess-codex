export type StoryPresentationId = "default" | "fossil";
export type StoryChapterLayoutId = "default" | "fossil";

export type ThemeVisuals = {
  bg: string;
  panel: string;
  glow: string;
  glowSoft: string;
};

export type ThemeDefinition = {
  pageClass: string;
  readerClass: string;
  presentation: StoryPresentationId;
  chapterLayout: StoryChapterLayoutId;
  visuals: ThemeVisuals;
};

export const DEFAULT_STORY_THEME_KEY = "codex" as const;

export const themeRegistry = {
  codex: {
    pageClass: "theme-codex",
    readerClass: "theme-codex",
    presentation: "default",
    chapterLayout: "default",
    visuals: {
      bg: "#07070A",
      panel: "#141017",
      glow: "#6E1F35",
      glowSoft: "#D8D5CF",
    },
  },

  fossil: {
    pageClass: "theme-fossil",
    readerClass: "theme-fossil",
    presentation: "fossil",
    chapterLayout: "fossil",
    visuals: {
      bg: "#080908",
      panel: "#12130F",
      glow: "#718C5A",
      glowSoft: "#C9B27C",
    },
  },

  classified: {
    pageClass: "theme-codex",
    readerClass: "theme-codex",
    presentation: "default",
    chapterLayout: "default",
    visuals: {
      bg: "#050608",
      panel: "#101116",
      glow: "#7A1F2B",
      glowSoft: "#D8D5CF",
    },
  },

  cruxball: {
    pageClass: "theme-codex",
    readerClass: "theme-codex",
    presentation: "default",
    chapterLayout: "default",
    visuals: {
      bg: "#05070A",
      panel: "#101720",
      glow: "#2F6F9F",
      glowSoft: "#D13B3B",
    },
  },

  tundra: {
    pageClass: "theme-codex",
    readerClass: "theme-codex",
    presentation: "default",
    chapterLayout: "default",
    visuals: {
      bg: "#061016",
      panel: "#0D1B22",
      glow: "#8FB8C8",
      glowSoft: "#7F9C6A",
    },
  },

  sphere: {
    pageClass: "theme-codex",
    readerClass: "theme-codex",
    presentation: "default",
    chapterLayout: "default",
    visuals: {
      bg: "#070912",
      panel: "#101525",
      glow: "#7BBCE8",
      glowSoft: "#B24A5B",
    },
  },

  incident: {
    pageClass: "theme-codex",
    readerClass: "theme-codex",
    presentation: "default",
    chapterLayout: "default",
    visuals: {
      bg: "#080808",
      panel: "#151515",
      glow: "#B52D2D",
      glowSoft: "#2D6FB5",
    },
  },
} as const satisfies Record<string, ThemeDefinition>;

export type StoryThemeKey = keyof typeof themeRegistry;

export function resolveStoryThemeKey(themeKey?: string): StoryThemeKey {
  if (!themeKey || !(themeKey in themeRegistry)) {
    return DEFAULT_STORY_THEME_KEY;
  }

  return themeKey as StoryThemeKey;
}

export function getThemeDefinition(themeKey?: string): ThemeDefinition {
  return themeRegistry[resolveStoryThemeKey(themeKey)];
}
