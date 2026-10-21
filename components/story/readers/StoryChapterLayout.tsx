import type { Story } from "@/lib/stories";
import { DefaultChapterLayout } from "./DefaultChapterLayout";
import { FossilChapterLayout } from "./FossilChapterLayout";


type Chapter = Story["chapters"][number];

type StoryChapterLayoutProps = {
  story: Story;
  chapter: Chapter;
  children: React.ReactNode;
};

export function StoryChapterLayout({
  story,
  chapter,
  children,
}: StoryChapterLayoutProps) {
  const layout = story.theme?.layout ?? story.theme?.id ?? "default";

  switch (layout) {
    case "museum":
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