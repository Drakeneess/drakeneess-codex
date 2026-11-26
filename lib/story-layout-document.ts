import "server-only";

import type {
  Story,
} from "@/lib/stories";

import {
  getStoryStatusLabel,
  getStoryVisualStyle,
} from "@/lib/story-profile";

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function safeStyleText(value: string) {
  return value.replace(
    /<\/style/gi,
    "<\\/style",
  );
}

function cssUrl(
  value: string | null,
) {
  const normalized = value?.trim();

  if (!normalized) {
    return "none";
  }

  return `url(${JSON.stringify(normalized)})`;
}

function buildChapterMarkup(story: Story) {
  if (story.chapters.length === 0) {
    return `<p class="codex-chapters-empty">Aún no hay capítulos publicados.</p>`;
  }

  const items = story.chapters
    .map((chapter) => {
      const href =
        `/stories/${encodeURIComponent(story.slug)}` +
        `/chapters/${encodeURIComponent(chapter.slug)}`;

      return `<li class="codex-chapter-item">
  <a class="codex-chapter-link" href=${JSON.stringify(href)} target="_top">
    <span class="codex-chapter-number">${escapeHtml(String(chapter.number).padStart(2, "0"))}</span>
    <span class="codex-chapter-title">${escapeHtml(chapter.title)}</span>
  </a>
</li>`;
    })
    .join("\n");

  return `<ol class="codex-chapters">
${items}
</ol>`;
}

function expandPlaceholders(
  story: Story,
) {
  const replacements: Record<string, string> = {
    "{{story.title}}":
      escapeHtml(story.title),
    "{{story.subtitle}}":
      escapeHtml(story.profile.subtitle),
    "{{story.description}}":
      escapeHtml(story.description),
    "{{story.author}}":
      escapeHtml(story.profile.authorName),
    "{{story.status}}":
      escapeHtml(
        getStoryStatusLabel(
          story.profile.status,
        ),
      ),
    "{{story.language}}":
      escapeHtml(story.profile.language),
    "{{story.contentRating}}":
      escapeHtml(
        story.profile.contentRating ?? "",
      ),
    "{{story.slug}}":
      escapeHtml(story.slug),
    "{{story.coverUrl}}":
      escapeHtml(
        story.assets.coverImageUrl ?? "",
      ),
    "{{story.heroUrl}}":
      escapeHtml(
        story.assets.heroImageUrl ?? "",
      ),
    "{{story.logoUrl}}":
      escapeHtml(
        story.assets.logoImageUrl ?? "",
      ),
    "{{story.genres}}":
      escapeHtml(
        story.profile.genres.join(", "),
      ),
    "{{story.tags}}":
      escapeHtml(
        story.profile.tags.join(", "),
      ),
  };

  // Expand only tokens present in the original template. Story text must not
  // be interpreted as another placeholder after it has already been escaped.
  return story.layout.html.replace(/\{\{(?:story\.[a-zA-Z]+|chapters)\}\}/g, (token) =>
    token === "{{chapters}}"
      ? buildChapterMarkup(story)
      : Object.hasOwn(replacements, token) ? replacements[token] : token,
  );
}

function getResolvedVisualTokens(story: Story) {
  const resolved = getStoryVisualStyle(
    story.theme.id,
    story.visuals,
  ) as unknown as Record<
    string,
    string | number | undefined
  >;

  const text =
    typeof resolved["--story-text"] === "string"
      ? resolved["--story-text"]
      : "#f5f7fb";

  const muted =
    typeof resolved["--story-muted"] === "string"
      ? resolved["--story-muted"]
      : "#a1a8b8";

  const accent =
    typeof resolved["--story-accent"] === "string"
      ? resolved["--story-accent"]
      : "#91a8d0";

  const accentSoft =
    typeof resolved["--story-accent-soft"] === "string"
      ? resolved["--story-accent-soft"]
      : "#d3dced";

  const background =
    typeof resolved["--story-bg"] === "string"
      ? resolved["--story-bg"]
      : "#090a0e";

  const panel =
    typeof resolved["--story-panel"] === "string"
      ? resolved["--story-panel"]
      : "#111319";

  const displayFont =
    typeof resolved["--story-display-font"] === "string"
      ? resolved["--story-display-font"]
      : "Georgia, serif";

  const bodyFont =
    typeof resolved["--story-body-font"] === "string"
      ? resolved["--story-body-font"]
      : "system-ui, sans-serif";

  return `:root {
  --story-text: ${text};
  --story-muted: ${muted};
  --story-accent: ${accent};
  --story-accent-soft: ${accentSoft};
  --story-background: ${background};
  --story-bg: var(--story-background);
  --story-panel: ${panel};
  --story-display-font: ${displayFont};
  --story-body-font: ${bodyFont};
  --story-cover-image: ${cssUrl(story.assets.coverImageUrl)};
  --story-hero-image: ${cssUrl(story.assets.heroImageUrl)};
  --story-logo-image: ${cssUrl(story.assets.logoImageUrl)};
}`;
}

/**
 * Keep a single scroll root within the sandbox. The site shell and iframe
 * provide a stable viewport, so vh/dvh-based story CSS cannot create an
 * auto-resize feedback loop. Story authors still control their inner layout.
 */
const STORY_FRAME_BASE_CSS = `
*, *::before, *::after { box-sizing: border-box; }
body { margin: 0; background: var(--story-background); color: var(--story-text); font-family: var(--story-body-font); }
`;

const STORY_FRAME_SCROLL_CSS = `
html {
  height: 100% !important;
  overflow-x: hidden !important;
  overflow-y: auto !important;
}

body {
  min-height: 100% !important;
  height: auto !important;
  overflow: visible !important;
}
`;

export function buildCustomStoryLayoutDocument(
  story: Story,
) {
  const language =
    story.profile.language.trim() || "es";

  const variables =
    getResolvedVisualTokens(story);

  const content =
    expandPlaceholders(story);

  return `<!doctype html>
<html lang="${escapeHtml(language)}">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <meta http-equiv="Content-Security-Policy" content="default-src 'none'; script-src 'none'; connect-src 'none'; object-src 'none'; frame-src 'none'; form-action 'none'; base-uri 'none'; style-src 'unsafe-inline'; img-src https: http: data:; media-src https: http:; font-src https: http: data:;">
  <base target="_top">
  <style>${safeStyleText(variables)}\n${STORY_FRAME_BASE_CSS}</style>
  <style>${safeStyleText(story.layout.css)}</style>
  <style>${STORY_FRAME_SCROLL_CSS}</style>
</head>
<body>
${content}
</body>
</html>`;
}
