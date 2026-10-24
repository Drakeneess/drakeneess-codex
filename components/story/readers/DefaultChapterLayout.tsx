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
    <article className="reader-shell mx-auto flex w-full max-w-3xl flex-col overflow-hidden rounded-3xl">
      <header className="reader-shell-header shrink-0 px-6 py-5 md:px-10 md:py-6">
        <Link
          href={`/stories/${story.slug}`}
          className="story-accent text-sm transition-colors duration-200 hover:text-[var(--story-text)]"
        >
          ← Volver a {story.title}
        </Link>

        <p className="story-muted mt-4 text-sm uppercase tracking-[0.35em]">
          {story.title} / Capítulo {chapter.number}
        </p>
      </header>

      <div className="story-reader reader-scroll min-h-0 flex-1 overflow-y-auto px-6 pb-8 md:px-10 md:pb-10">
        {children}
      </div>
    </article>
  );
}
