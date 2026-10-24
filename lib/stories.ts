import "server-only";

import {
  PublicCodexApiError,
  PublicCodexConfigError,
  PublicCodexNetworkError,
  getChapterBySlug as getPublicChapterBySlug,
  getStories as getPublicStories,
  getStoryBySlug as getPublicStoryBySlug,
} from "@/data/codex/client";

import type {
  PublicChapter,
  PublicChapterSummary,
  PublicStory,
  PublicStorySummary,
} from "@/data/codex/types";

import {
  normalizeStoryAssets,
  normalizeStoryProfile,
  normalizeStoryVisuals,
} from "@/lib/story-profile";

import type {
  StoryAssets,
  StoryProfile,
  StoryVisuals,
} from "@/lib/story-profile";

export interface StoryTheme {
  id: string;
}

export interface StoryChapter {
  slug: string;
  title: string;
  number: number;
  publishedAt: string;
  updatedAt: string;
}

export interface StoryChapterContent extends StoryChapter {
  content: string;
}

export interface StorySummary {
  slug: string;
  title: string;
  description: string;
  theme: StoryTheme;
  profile: StoryProfile;
  assets: StoryAssets;
  visuals: StoryVisuals;
  chapterCount: number;
  publishedAt: string;
  updatedAt: string;
}

export interface Story extends StorySummary {
  chapters: StoryChapter[];
}

export interface StoryCatalogState {
  stories: StorySummary[];
  unavailable: boolean;
}

function mapStorySummary(story: PublicStorySummary): StorySummary {
  return {
    slug: story.slug,
    title: story.title,
    description: story.description,
    theme: {
      id: story.themeKey,
    },
    profile: normalizeStoryProfile(story.profile),
    assets: normalizeStoryAssets(story.assets),
    visuals: normalizeStoryVisuals(story.visuals),
    chapterCount:
      typeof story.chapterCount === "number"
        ? story.chapterCount
        : 0,
    publishedAt: story.publishedAt,
    updatedAt: story.updatedAt,
  };
}

function mapChapterSummary(chapter: PublicChapterSummary): StoryChapter {
  return {
    slug: chapter.slug,
    title: chapter.title,
    number: chapter.order,
    publishedAt: chapter.publishedAt,
    updatedAt: chapter.updatedAt,
  };
}

function mapChapter(chapter: PublicChapter): StoryChapterContent {
  return {
    ...mapChapterSummary(chapter),
    content: chapter.content,
  };
}

function mapStory(story: PublicStory): Story {
  return {
    ...mapStorySummary(story),
    chapterCount: story.chapters.length,
    chapters: story.chapters.map(mapChapterSummary),
  };
}

function isStorySourceUnavailable(error: unknown) {
  return (
    error instanceof PublicCodexConfigError ||
    error instanceof PublicCodexNetworkError ||
    error instanceof PublicCodexApiError
  );
}

export async function getStories(): Promise<StorySummary[]> {
  const stories = await getPublicStories();
  return stories.map(mapStorySummary);
}

export async function getStoryCatalogState(): Promise<StoryCatalogState> {
  try {
    return {
      stories: await getStories(),
      unavailable: false,
    };
  } catch (error) {
    if (!isStorySourceUnavailable(error)) {
      throw error;
    }

    console.error("[codex] Public story catalog unavailable.", error);

    return {
      stories: [],
      unavailable: true,
    };
  }
}

export async function getStoryBySlug(slug: string): Promise<Story | null> {
  const story = await getPublicStoryBySlug(slug);
  return story ? mapStory(story) : null;
}

export async function getChapterBySlug(
  storySlug: string,
  chapterSlug: string,
): Promise<{
  story: StorySummary;
  chapter: StoryChapterContent;
} | null> {
  const result = await getPublicChapterBySlug(storySlug, chapterSlug);

  if (!result) {
    return null;
  }

  return {
    story: mapStorySummary(result.story),
    chapter: mapChapter(result.chapter),
  };
}
