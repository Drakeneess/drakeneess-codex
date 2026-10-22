import "server-only";

import {
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
  publishedAt: string;
  updatedAt: string;
}

export interface Story extends StorySummary {
  chapters: StoryChapter[];
}

function mapStorySummary(story: PublicStorySummary): StorySummary {
  return {
    slug: story.slug,
    title: story.title,
    description: story.description,
    theme: {
      id: story.themeKey,
    },
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
    chapters: story.chapters.map(mapChapterSummary),
  };
}

export async function getStories(): Promise<StorySummary[]> {
  const stories = await getPublicStories();
  return stories.map(mapStorySummary);
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
