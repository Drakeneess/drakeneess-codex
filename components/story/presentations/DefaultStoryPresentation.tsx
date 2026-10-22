import type { Story } from "@/lib/stories";

type DefaultStoryPresentationProps = {
  story: Story;
};

export function DefaultStoryPresentation({ story }: DefaultStoryPresentationProps) {
  return (
    <div className="story-frame rounded-3xl p-8">
      <h1 className="codex-serif text-4xl font-bold text-[var(--story-text)] md:text-6xl">
        {story.title}
      </h1>

      <p className="story-muted mt-8 max-w-3xl leading-8">
        {story.description}
      </p>
    </div>
  );
}
