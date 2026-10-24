import type { CSSProperties } from "react";

export type StoryStatus = "ongoing" | "completed" | "hiatus";
export type StoryReaderWidth = "narrow" | "standard" | "wide";

export interface StoryProfile {
  subtitle: string;
  authorName: string;
  status: StoryStatus;
  language: string;
  genres: string[];
  tags: string[];
  contentRating: string | null;
}

export interface StoryAssets {
  coverImageUrl: string | null;
  heroImageUrl: string | null;
  logoImageUrl: string | null;
}

export interface StoryVisuals {
  accent: string | null;
  accentSoft: string | null;
  background: string | null;
  panel: string | null;
  displayFontKey: string | null;
  bodyFontKey: string | null;
  ornamentKey: string | null;
  textureKey: string | null;
  readerWidth: StoryReaderWidth;
}

type StoryVisualStyle = CSSProperties & {
  "--story-bg"?: string;
  "--story-panel"?: string;
  "--story-accent"?: string;
  "--story-accent-soft"?: string;
  "--story-display-font"?: string;
  "--story-body-font"?: string;
  "--story-reader-width"?: string;
};

const FONT_REGISTRY = {
  serif: 'Georgia, "Times New Roman", serif',
  sans: 'ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
  mono: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", monospace',
} as const;

const TEXTURE_CLASS_REGISTRY = {
  none: "",
  grain: "story-texture-grain",
  paper: "story-texture-paper",
  scanlines: "story-texture-scanlines",
} as const;

const ORNAMENT_REGISTRY = {
  section: "§",
  diamond: "◆",
  star: "✦",
  none: "",
} as const;

const READER_WIDTH_REGISTRY: Record<StoryReaderWidth, string> = {
  narrow: "44rem",
  standard: "56rem",
  wide: "68rem",
};

const HEX_COLOR_PATTERN = /^#(?:[0-9a-f]{3,4}|[0-9a-f]{6}|[0-9a-f]{8})$/i;

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}

function normalizeText(value: unknown) {
  return typeof value === "string" ? value.trim() : "";
}

function normalizeOptionalText(value: unknown) {
  const normalized = normalizeText(value);
  return normalized ? normalized : null;
}

function normalizeStringList(value: unknown) {
  if (!Array.isArray(value)) {
    return [];
  }

  return Array.from(
    new Set(
      value
        .filter((item): item is string => typeof item === "string")
        .map((item) => item.trim())
        .filter(Boolean),
    ),
  );
}

function normalizeStoryStatus(value: unknown): StoryStatus {
  switch (value) {
    case "completed":
    case "hiatus":
    case "ongoing":
      return value;
    default:
      return "ongoing";
  }
}

function normalizeReaderWidth(value: unknown): StoryReaderWidth {
  switch (value) {
    case "narrow":
    case "wide":
    case "standard":
      return value;
    default:
      return "standard";
  }
}

export function createDefaultStoryProfile(): StoryProfile {
  return {
    subtitle: "",
    authorName: "",
    status: "ongoing",
    language: "es",
    genres: [],
    tags: [],
    contentRating: null,
  };
}

export function createDefaultStoryAssets(): StoryAssets {
  return {
    coverImageUrl: null,
    heroImageUrl: null,
    logoImageUrl: null,
  };
}

export function createDefaultStoryVisuals(): StoryVisuals {
  return {
    accent: null,
    accentSoft: null,
    background: null,
    panel: null,
    displayFontKey: null,
    bodyFontKey: null,
    ornamentKey: null,
    textureKey: null,
    readerWidth: "standard",
  };
}

export function normalizeStoryProfile(value: unknown): StoryProfile {
  if (!isRecord(value)) {
    return createDefaultStoryProfile();
  }

  return {
    subtitle: normalizeText(value.subtitle),
    authorName: normalizeText(value.authorName),
    status: normalizeStoryStatus(value.status),
    language: normalizeText(value.language) || "es",
    genres: normalizeStringList(value.genres),
    tags: normalizeStringList(value.tags),
    contentRating: normalizeOptionalText(value.contentRating),
  };
}

export function normalizeStoryAssets(value: unknown): StoryAssets {
  if (!isRecord(value)) {
    return createDefaultStoryAssets();
  }

  return {
    coverImageUrl: normalizeOptionalText(value.coverImageUrl),
    heroImageUrl: normalizeOptionalText(value.heroImageUrl),
    logoImageUrl: normalizeOptionalText(value.logoImageUrl),
  };
}

export function normalizeStoryVisuals(value: unknown): StoryVisuals {
  if (!isRecord(value)) {
    return createDefaultStoryVisuals();
  }

  return {
    accent: normalizeOptionalText(value.accent),
    accentSoft: normalizeOptionalText(value.accentSoft),
    background: normalizeOptionalText(value.background),
    panel: normalizeOptionalText(value.panel),
    displayFontKey: normalizeOptionalText(value.displayFontKey),
    bodyFontKey: normalizeOptionalText(value.bodyFontKey),
    ornamentKey: normalizeOptionalText(value.ornamentKey),
    textureKey: normalizeOptionalText(value.textureKey),
    readerWidth: normalizeReaderWidth(value.readerWidth),
  };
}

function resolveSafeHexColor(value: string | null) {
  if (!value || !HEX_COLOR_PATTERN.test(value)) {
    return undefined;
  }

  return value;
}

function resolveFontFamily(key: string | null) {
  if (!key || !(key in FONT_REGISTRY)) {
    return undefined;
  }

  return FONT_REGISTRY[key as keyof typeof FONT_REGISTRY];
}

export function getStoryVisualStyle(visuals: StoryVisuals): StoryVisualStyle {
  const style: StoryVisualStyle = {
    "--story-reader-width": READER_WIDTH_REGISTRY[visuals.readerWidth],
  };

  const background = resolveSafeHexColor(visuals.background);
  const panel = resolveSafeHexColor(visuals.panel);
  const accent = resolveSafeHexColor(visuals.accent);
  const accentSoft = resolveSafeHexColor(visuals.accentSoft);
  const displayFont = resolveFontFamily(visuals.displayFontKey);
  const bodyFont = resolveFontFamily(visuals.bodyFontKey);

  if (background) style["--story-bg"] = background;
  if (panel) style["--story-panel"] = panel;
  if (accent) style["--story-accent"] = accent;
  if (accentSoft) style["--story-accent-soft"] = accentSoft;
  if (displayFont) style["--story-display-font"] = displayFont;
  if (bodyFont) style["--story-body-font"] = bodyFont;

  return style;
}

export function getStoryTextureClass(textureKey: string | null) {
  if (!textureKey || !(textureKey in TEXTURE_CLASS_REGISTRY)) {
    return "";
  }

  return TEXTURE_CLASS_REGISTRY[
    textureKey as keyof typeof TEXTURE_CLASS_REGISTRY
  ];
}

export function getStoryOrnament(ornamentKey: string | null) {
  if (!ornamentKey || !(ornamentKey in ORNAMENT_REGISTRY)) {
    return ORNAMENT_REGISTRY.section;
  }

  return ORNAMENT_REGISTRY[ornamentKey as keyof typeof ORNAMENT_REGISTRY];
}

export function getStoryStatusLabel(status: StoryStatus) {
  switch (status) {
    case "completed":
      return "Completada";
    case "hiatus":
      return "En pausa";
    default:
      return "En publicación";
  }
}
