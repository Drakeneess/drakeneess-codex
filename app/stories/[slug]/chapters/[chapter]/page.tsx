import { notFound } from "next/navigation";
import { getChapterBySlug } from "@/lib/stories";
import { getThemeDefinition } from "@/lib/theme-registry";
import { StoryThemeScope } from "@/components/layout/ThemeRuntime";
import { RemoteMdx } from "@/components/mdx/RemoteMdx";
import { StoryChapterLayout } from "@/components/story/readers/StoryChapterLayout";

export const dynamic = "force-dynamic";

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

  const theme = getThemeDefinition(result.story.theme.id);

  return (
    <>
      <StoryThemeScope themeKey={result.story.theme.id} />

      <main className={`${theme.readerClass} story-page px-6 py-16`}>
        <StoryChapterLayout story={result.story} chapter={result.chapter}>
          <RemoteMdx source={result.chapter.content} />
        </StoryChapterLayout>
      </main>
    </>
  );
}
