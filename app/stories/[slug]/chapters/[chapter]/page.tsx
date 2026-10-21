import { notFound } from "next/navigation";
import { getChapterBySlug } from "@/lib/stories";
import { getStoryTheme } from "@/lib/story-themes";
import { StoryChapterLayout } from "@/components/story/readers/StoryChapterLayout";

type ChapterPageProps = {
  params: Promise<{
    slug: string;
    chapter: string;
  }>;
};

export default async function ChapterPage({ params }: ChapterPageProps) {
  const { slug, chapter } = await params;
  const result = await getChapterBySlug(slug, chapter);

  if (!result) {
    notFound();
  }

  const theme = getStoryTheme(result.story.theme?.id);

  const ChapterContent = await import(
    `@/content/stories/${slug}/chapters/${chapter}.mdx`
  );

  const Chapter = ChapterContent.default;

  return (
    <main className={`${theme.readerClass} story-page px-6 py-16`}>
      <StoryChapterLayout story={result.story} chapter={result.chapter}>
        <Chapter />
      </StoryChapterLayout>
    </main>
  );
}