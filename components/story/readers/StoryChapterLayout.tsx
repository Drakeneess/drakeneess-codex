import type {
  StoryChapter,
  StorySummary,
} from "@/lib/stories";
import { getThemeDefinition } from "@/lib/theme-registry";
import { DefaultChapterLayout } from "./DefaultChapterLayout";
import { FossilChapterLayout } from "./FossilChapterLayout";

type StoryChapterLayoutProps = {
  story: StorySummary;
  chapter: StoryChapter;
  children: React.ReactNode;
};

export function StoryChapterLayout({
  story,
  chapter,
  children,
}: StoryChapterLayoutProps) {
  const theme = getThemeDefinition(story.theme.id);

  switch (theme.chapterLayout) {
    case "fossil":
      return (
        <FossilChapterLayout story={story} chapter={chapter}>
          {children}
        </FossilChapterLayout>
      );

    default:
      return (
        <DefaultChapterLayout story={story} chapter={chapter}>
          {children}
        </DefaultChapterLayout>
      );
  }
}
