import "server-only";

import type {
  PublicChapter,
  PublicChapterResult,
  PublicChapterSummary,
  PublicStory,
  PublicStoryAssets,
  PublicStoryProfile,
  PublicStorySummary,
  PublicStoryVisuals,
} from "./types";

export class PublicCodexConfigError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "PublicCodexConfigError";
  }
}

export class PublicCodexNetworkError extends Error {
  constructor(
    public readonly url: string,
    cause: unknown,
  ) {
    super(`No se pudo conectar con la API pública del Codex: ${url}`, {
      cause,
    });
    this.name = "PublicCodexNetworkError";
  }
}

export class PublicCodexApiError extends Error {
  constructor(
    public readonly url: string,
    public readonly status: number,
    public readonly payload: unknown,
  ) {
    super(`La API pública del Codex respondió HTTP ${status}.`);
    this.name = "PublicCodexApiError";
  }
}

export class PublicCodexResponseError extends Error {
  constructor(
    public readonly url: string,
    message: string,
  ) {
    super(message);
    this.name = "PublicCodexResponseError";
  }
}

function getApiBaseUrl() {
  const configured = process.env.CODEX_API_URL?.trim();

  if (!configured) {
    throw new PublicCodexConfigError(
      "CODEX_API_URL no está configurada para el servidor del Codex.",
    );
  }

  return configured.replace(/\/+$/, "");
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}

function isString(value: unknown): value is string {
  return typeof value === "string";
}

function isNullableString(value: unknown): value is string | null {
  return value === null || isString(value);
}

function isStringArray(value: unknown): value is string[] {
  return Array.isArray(value) && value.every(isString);
}

function isNumber(value: unknown): value is number {
  return typeof value === "number" && Number.isFinite(value);
}

function isStoryProfile(value: unknown): value is PublicStoryProfile {
  if (!isRecord(value)) {
    return false;
  }

  return (
    isString(value.subtitle) &&
    isString(value.authorName) &&
    (value.status === "ongoing" ||
      value.status === "completed" ||
      value.status === "hiatus") &&
    isString(value.language) &&
    isStringArray(value.genres) &&
    isStringArray(value.tags) &&
    isNullableString(value.contentRating)
  );
}

function isStoryAssets(value: unknown): value is PublicStoryAssets {
  if (!isRecord(value)) {
    return false;
  }

  return (
    isNullableString(value.coverImageUrl) &&
    isNullableString(value.heroImageUrl) &&
    isNullableString(value.logoImageUrl)
  );
}

function isStoryVisuals(value: unknown): value is PublicStoryVisuals {
  if (!isRecord(value)) {
    return false;
  }

  return (
    isNullableString(value.accent) &&
    isNullableString(value.accentSoft) &&
    isNullableString(value.background) &&
    isNullableString(value.panel) &&
    isNullableString(value.displayFontKey) &&
    isNullableString(value.bodyFontKey) &&
    isNullableString(value.ornamentKey) &&
    isNullableString(value.textureKey) &&
    (value.readerWidth === "narrow" ||
      value.readerWidth === "standard" ||
      value.readerWidth === "wide")
  );
}

function isStorySummary(value: unknown): value is PublicStorySummary {
  if (!isRecord(value)) {
    return false;
  }

  const profileValid =
    value.profile === undefined || isStoryProfile(value.profile);
  const assetsValid = value.assets === undefined || isStoryAssets(value.assets);
  const visualsValid =
    value.visuals === undefined || isStoryVisuals(value.visuals);

  return (
    isString(value.slug) &&
    isString(value.title) &&
    isString(value.description) &&
    isString(value.themeKey) &&
    profileValid &&
    assetsValid &&
    visualsValid &&
    isString(value.publishedAt) &&
    isString(value.updatedAt)
  );
}

function isChapterSummary(value: unknown): value is PublicChapterSummary {
  if (!isRecord(value)) {
    return false;
  }

  return (
    isString(value.slug) &&
    isString(value.title) &&
    isNumber(value.order) &&
    isString(value.publishedAt) &&
    isString(value.updatedAt)
  );
}

function isStory(value: unknown): value is PublicStory {
  if (!isStorySummary(value) || !isRecord(value)) {
    return false;
  }

  return (
    Array.isArray(value.chapters) &&
    value.chapters.every(isChapterSummary)
  );
}

function isChapter(value: unknown): value is PublicChapter {
  return (
    isChapterSummary(value) &&
    isRecord(value) &&
    isString(value.content)
  );
}

async function readJson(response: Response, url: string) {
  try {
    return (await response.json()) as unknown;
  } catch (cause) {
    throw new PublicCodexResponseError(
      url,
      `La API pública del Codex devolvió JSON inválido: ${String(cause)}`,
    );
  }
}

async function requestPublicJson(
  path: string,
  options: {
    notFoundIsNull?: boolean;
  } = {},
) {
  const url = `${getApiBaseUrl()}${path}`;

  let response: Response;

  try {
    response = await fetch(url, {
      headers: {
        Accept: "application/json",
      },
    });
  } catch (cause) {
    throw new PublicCodexNetworkError(url, cause);
  }

  if (response.status === 404 && options.notFoundIsNull) {
    return null;
  }

  if (!response.ok) {
    let payload: unknown = null;

    try {
      payload = await response.json();
    } catch {
      payload = null;
    }

    throw new PublicCodexApiError(url, response.status, payload);
  }

  return readJson(response, url);
}

export async function getStories(): Promise<PublicStorySummary[]> {
  const payload = await requestPublicJson("/api/public/stories");

  if (
    !isRecord(payload) ||
    !Array.isArray(payload.stories) ||
    !payload.stories.every(isStorySummary)
  ) {
    throw new PublicCodexResponseError(
      `${getApiBaseUrl()}/api/public/stories`,
      "La API pública devolvió un catálogo de historias con formato inválido.",
    );
  }

  return payload.stories;
}

export async function getStoryBySlug(
  slug: string,
): Promise<PublicStory | null> {
  const encodedSlug = encodeURIComponent(slug);
  const path = `/api/public/stories/${encodedSlug}`;
  const payload = await requestPublicJson(path, {
    notFoundIsNull: true,
  });

  if (payload === null) {
    return null;
  }

  if (!isRecord(payload) || !isStory(payload.story)) {
    throw new PublicCodexResponseError(
      `${getApiBaseUrl()}${path}`,
      "La API pública devolvió una historia con formato inválido.",
    );
  }

  return payload.story;
}

export async function getChapterBySlug(
  storySlug: string,
  chapterSlug: string,
): Promise<PublicChapterResult | null> {
  const encodedStorySlug = encodeURIComponent(storySlug);
  const encodedChapterSlug = encodeURIComponent(chapterSlug);
  const path =
    `/api/public/stories/${encodedStorySlug}` +
    `/chapters/${encodedChapterSlug}`;

  const payload = await requestPublicJson(path, {
    notFoundIsNull: true,
  });

  if (payload === null) {
    return null;
  }

  if (
    !isRecord(payload) ||
    !isStorySummary(payload.story) ||
    !isChapter(payload.chapter)
  ) {
    throw new PublicCodexResponseError(
      `${getApiBaseUrl()}${path}`,
      "La API pública devolvió un capítulo con formato inválido.",
    );
  }

  return {
    story: payload.story,
    chapter: payload.chapter,
  };
}
