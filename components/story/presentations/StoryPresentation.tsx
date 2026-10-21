import type { Story } from "@/lib/stories";
import { DefaultStoryPresentation } from "./DefaultStoryPresentation";
import { FossilStoryPresentation } from "./FossilStoryPresentation";

type StoryPresentationProps = {
  story: Story;
};

export function StoryPresentation({ story }: StoryPresentationProps) {
  const layout = story.theme?.layout ?? story.theme?.id ?? "default";

  switch (layout) {
    case "museum":
    case "fossil":
      return <FossilStoryPresentation story={story} />;

    default:
      return <DefaultStoryPresentation story={story} />;
  }
}