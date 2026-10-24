import { notFound } from "next/navigation";
import { getChapterBySlug } from "@/lib/stories";
import { getThemeDefinition } from "@/lib/theme-registry";
import { getStoryVisualStyle } from "@/lib/story-profile";
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
  const visualStyle = getStoryVisualStyle(result.story.visuals);
  const readerPriorityClass =
    theme.chapterLayout === "fossil" ? "" : "reader-priority-zone";

  return (
    <>
      <StoryThemeScope themeKey={result.story.theme.id} />

      <section
        className={`${theme.readerClass} story-page story-visual-scope ${readerPriorityClass} px-4 py-4 md:px-6 md:py-6`}
        style={visualStyle}
      >
        <StoryChapterLayout story={result.story} chapter={result.chapter}>
          <RemoteMdx source={result.chapter.content} />
        </StoryChapterLayout>
      </section>
    </>
  );
}
