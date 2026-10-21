import { stories } from "@/content/stories";

export type Story = (typeof stories)[number];

export async function getStories() {
  return stories;
}

export async function getStoryBySlug(slug: string) {
  return stories.find((story) => story.slug === slug) ?? null;
}

export async function getChapterBySlug(storySlug: string, chapterSlug: string) {
  const story = await getStoryBySlug(storySlug);

  if (!story) {
    return null;
  }

  const chapter = story.chapters.find((item: { slug: string; }) => item.slug === chapterSlug);

  if (!chapter) {
    return null;
  }

  return {
    story,
    chapter,
  };
}