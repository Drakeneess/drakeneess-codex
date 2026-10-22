import type { Story } from "@/lib/stories";
import { getThemeDefinition } from "@/lib/theme-registry";
import { DefaultStoryPresentation } from "./DefaultStoryPresentation";
import { FossilStoryPresentation } from "./FossilStoryPresentation";

type StoryPresentationProps = {
  story: Story;
};

export function StoryPresentation({ story }: StoryPresentationProps) {
  const theme = getThemeDefinition(story.theme?.id);

  switch (theme.presentation) {
    case "fossil":
      return <FossilStoryPresentation story={story} />;

    default:
      return <DefaultStoryPresentation story={story} />;
  }
}
