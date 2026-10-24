export type StoryPresentationId = "default" | "fossil";
export type StoryChapterLayoutId = "default" | "fossil";

export type ThemeVisuals = {
  bg: string;
  panel: string;
  text: string;
  muted: string;
  accent: string;
  accentSoft: string;
};

export type ThemeDefinition = {
  pageClass: string;
  readerClass: string;
  presentation: StoryPresentationId;
  chapterLayout: StoryChapterLayoutId;
  visuals: ThemeVisuals;
};

export const DEFAULT_STORY_THEME_KEY = "codex" as const;

const DEFAULT_TEXT = "#F1E9E0";
const DEFAULT_MUTED = "#A99CA3";

export const themeRegistry = {
  codex: {
    pageClass: "theme-codex",
    readerClass: "theme-codex",
    presentation: "default",
    chapterLayout: "default",
    visuals: {
      bg: "#07070A",
      panel: "#141017",
      text: DEFAULT_TEXT,
      muted: DEFAULT_MUTED,
      accent: "#8A2A45",
      accentSoft: "#D8D5CF",
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
      text: "#EEE8DC",
      muted: "#A7A08F",
      accent: "#718C5A",
      accentSoft: "#C9B27C",
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
      text: DEFAULT_TEXT,
      muted: DEFAULT_MUTED,
      accent: "#7A1F2B",
      accentSoft: "#D8D5CF",
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
      text: DEFAULT_TEXT,
      muted: "#A6AFBA",
      accent: "#2F6F9F",
      accentSoft: "#D13B3B",
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
      text: "#E7F0F2",
      muted: "#A1B1B7",
      accent: "#8FB8C8",
      accentSoft: "#7F9C6A",
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
      text: "#EEF3FA",
      muted: "#A8B0C4",
      accent: "#7BBCE8",
      accentSoft: "#B24A5B",
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
      text: "#F0F0F0",
      muted: "#A9A9A9",
      accent: "#B52D2D",
      accentSoft: "#2D6FB5",
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
