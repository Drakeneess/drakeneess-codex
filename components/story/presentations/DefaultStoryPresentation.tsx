import type { Story } from "@/lib/stories";

type DefaultStoryPresentationProps = {
  story: Story;
};

export function DefaultStoryPresentation({ story }: DefaultStoryPresentationProps) {
  return (
    <div className="story-frame rounded-3xl p-8">
      <p className="story-accent text-sm uppercase tracking-[0.35em]">
        {story.format}
      </p>

      <h1 className="codex-serif mt-4 text-4xl font-bold text-[var(--story-text)] md:text-6xl">
        {story.title}
      </h1>

      <p className="story-muted mt-4 text-xl">{story.subtitle}</p>

      <p className="story-muted mt-8 max-w-3xl leading-8">
        {story.description}
      </p>

      <div className="mt-8 flex flex-wrap gap-2">
        {story.genre.map((genre) => (
          <span
            key={genre}
            className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-sm text-[var(--story-muted)]"
          >
            {genre}
          </span>
        ))}
      </div>
    </div>
  );
}