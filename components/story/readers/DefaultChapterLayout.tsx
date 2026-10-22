import Link from "next/link";
import type {
  StoryChapter,
  StorySummary,
} from "@/lib/stories";

type DefaultChapterLayoutProps = {
  story: StorySummary;
  chapter: StoryChapter;
  children: React.ReactNode;
};

export function DefaultChapterLayout({
  story,
  chapter,
  children,
}: DefaultChapterLayoutProps) {
  return (
    <article className="mx-auto max-w-3xl">
      <div className="mb-10">
        <Link
          href={`/stories/${story.slug}`}
          className="story-accent text-sm transition hover:text-[var(--story-text)]"
        >
          ← Volver a {story.title}
        </Link>

        <p className="story-muted mt-6 text-sm uppercase tracking-[0.35em]">
          {story.title} / Capítulo {chapter.number}
        </p>
      </div>

      <div className="story-reader rounded-3xl p-6 shadow-2xl shadow-black/30 md:p-10">
        {children}
      </div>
    </article>
  );
}
