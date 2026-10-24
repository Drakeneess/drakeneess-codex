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
    <article className="reader-shell mx-auto grid w-full max-w-7xl overflow-hidden">
      <aside className="reader-rail px-6 py-5 md:px-8 md:py-7">
        <Link
          href={`/stories/${story.slug}`}
          className="story-accent text-sm transition-colors duration-200 hover:text-[var(--story-text)]"
        >
          ← Volver a {story.title}
        </Link>

        <div className="reader-rail-meta mt-8">
          <p className="story-muted text-xs uppercase tracking-[0.42em]">
            Historia
          </p>
          <p className="codex-serif mt-2 text-xl text-[var(--story-text)]">
            {story.title}
          </p>

          <div className="reader-rail-rule my-6" />

          <p className="story-muted text-xs uppercase tracking-[0.42em]">
            Capítulo
          </p>
          <p className="mt-2 text-sm uppercase tracking-[0.3em] text-[var(--story-accent-soft)]">
            {chapter.number}
          </p>
        </div>
      </aside>

      <section className="reader-reading-area min-h-0">
        <header className="reader-shell-header px-6 py-4 md:px-10 md:py-5">
          <div className="reader-prose-column w-full">
            <p className="story-muted text-xs uppercase tracking-[0.38em]">
              {story.title} / Capítulo {chapter.number}
            </p>
          </div>
        </header>

        <div className="story-reader reader-scroll min-h-0 overflow-y-auto px-6 md:px-10">
          <div className="reader-prose-column w-full pb-10 pt-7 md:pb-12 md:pt-8">
            {children}
          </div>
        </div>
      </section>
    </article>
  );
}
