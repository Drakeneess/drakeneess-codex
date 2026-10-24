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
    <article className="reader-shell mx-auto flex w-full max-w-6xl flex-col overflow-hidden rounded-3xl">
      <header className="reader-shell-header shrink-0 px-6 py-4 md:px-10 md:py-5">
        <div className="reader-prose-column mx-auto w-full">
          <Link
            href={`/stories/${story.slug}`}
            className="story-accent text-sm transition-colors duration-200 hover:text-[var(--story-text)]"
          >
            ← Volver a {story.title}
          </Link>

          <p className="story-muted mt-3 text-sm uppercase tracking-[0.35em]">
            {story.title} / Capítulo {chapter.number}
          </p>
        </div>
      </header>

      <div className="story-reader reader-scroll min-h-0 flex-1 overflow-y-auto px-6 md:px-10">
        <div className="reader-prose-column mx-auto w-full pb-10 pt-7 md:pb-12 md:pt-8">
          {children}
        </div>
      </div>
    </article>
  );
}
