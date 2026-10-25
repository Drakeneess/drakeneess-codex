export type StoryLayoutMode =
  | "preset"
  | "custom";

export interface StoryCustomLayout {
  mode: StoryLayoutMode;
  html: string;
  css: string;
}

const STORY_LAYOUT_MAX_LENGTH = 100_000;

function isRecord(
  value: unknown,
): value is Record<string, unknown> {
  return (
    typeof value === "object" &&
    value !== null
  );
}

export function createDefaultStoryCustomLayout(): StoryCustomLayout {
  return {
    mode: "preset",
    html: "",
    css: "",
  };
}

export function normalizeStoryCustomLayout(
  value: unknown,
): StoryCustomLayout {
  if (!isRecord(value)) {
    return createDefaultStoryCustomLayout();
  }

  return {
    mode:
      value.mode === "custom"
        ? "custom"
        : "preset",
    html:
      typeof value.html === "string"
        ? value.html.slice(
            0,
            STORY_LAYOUT_MAX_LENGTH,
          )
        : "",
    css:
      typeof value.css === "string"
        ? value.css.slice(
            0,
            STORY_LAYOUT_MAX_LENGTH,
          )
        : "",
  };
}

export function hasCustomStoryLayout(
  layout: StoryCustomLayout,
) {
  return (
    layout.mode === "custom" &&
    layout.html.trim().length > 0
  );
}
