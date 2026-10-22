"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import {
  DEFAULT_STORY_THEME_KEY,
  getThemeDefinition,
  resolveStoryThemeKey,
  type StoryThemeKey,
  type ThemeDefinition,
} from "@/lib/theme-registry";

type ThemeRuntimeContextValue = {
  themeKey: StoryThemeKey;
  theme: ThemeDefinition;
  setThemeKey: (themeKey?: string) => void;
};

const ThemeRuntimeContext = createContext<ThemeRuntimeContextValue | null>(null);

export function ThemeRuntimeProvider({ children }: { children: React.ReactNode }) {
  const [themeKey, setThemeKeyState] = useState<StoryThemeKey>(
    DEFAULT_STORY_THEME_KEY,
  );

  const setThemeKey = useCallback((nextThemeKey?: string) => {
    setThemeKeyState(resolveStoryThemeKey(nextThemeKey));
  }, []);

  const theme = useMemo(() => getThemeDefinition(themeKey), [themeKey]);

  const value = useMemo(
    () => ({ themeKey, theme, setThemeKey }),
    [themeKey, theme, setThemeKey],
  );

  return (
    <ThemeRuntimeContext.Provider value={value}>
      {children}
    </ThemeRuntimeContext.Provider>
  );
}

export function useThemeRuntime() {
  const context = useContext(ThemeRuntimeContext);

  if (!context) {
    throw new Error("useThemeRuntime must be used inside ThemeRuntimeProvider");
  }

  return context;
}

export function StoryThemeScope({ themeKey }: { themeKey?: string }) {
  const { setThemeKey } = useThemeRuntime();
  const resolvedThemeKey = resolveStoryThemeKey(themeKey);

  useEffect(() => {
    setThemeKey(resolvedThemeKey);

    return () => {
      setThemeKey(DEFAULT_STORY_THEME_KEY);
    };
  }, [resolvedThemeKey, setThemeKey]);

  return null;
}
