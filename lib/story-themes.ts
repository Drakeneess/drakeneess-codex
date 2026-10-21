export const storyThemes = {
  codex: {
    pageClass: "theme-codex",
    readerClass: "theme-codex",
  },

  fossil: {
    pageClass: "theme-fossil",
    readerClass: "theme-fossil",
  },
} as const;

export type StoryThemeId = keyof typeof storyThemes;

export function getStoryTheme(themeId?: string) {
  if (!themeId || !(themeId in storyThemes)) {
    return storyThemes.codex;
  }

  return storyThemes[themeId as StoryThemeId];
}