import Link from "next/link";
import type {
  StoryChapter,
  StorySummary,
} from "@/lib/stories";

type FossilChapterLayoutProps = {
  story: StorySummary;
  chapter: StoryChapter;
  children: React.ReactNode;
};

export function FossilChapterLayout({
  story,
  chapter,
  children,
}: FossilChapterLayoutProps) {
  return (
    <article className="fossil-reader-shell story-body-font mx-auto w-full max-w-6xl">
      <header className="fossil-reader-header">
        <Link
          href={`/stories/${story.slug}`}
          className="fossil-reader-back"
        >
          ← Volver al registro de exhibición
        </Link>

        <div className="fossil-reader-heading-row">
          <div>
            <p className="fossil-reader-story-label">
              {story.title}
            </p>

            <h1 className="story-display-font fossil-reader-title">
              Capítulo {chapter.number}: {chapter.title}
            </h1>
          </div>

          <p className="fossil-reader-record-label">
            Archivo erosionado
          </p>
        </div>
      </header>

      <div className="fossil-reader-panel">
        <div
          className="fossil-reader-watermark"
          aria-hidden="true"
        >
          Lectura curatorial
        </div>

        <div className="fossil-reader-content">
          <aside className="fossil-preservation-note">
            <p className="fossil-preservation-label">
              Nota de preservación
            </p>

            <p>
              El texto ha sido reconstruido desde fragmentos narrativos,
              hipótesis culturales y restos de intención. La certeza, como casi
              todo en este planeta, llegó tarde.
            </p>
          </aside>

          <div className="fossil-prose">{children}</div>
        </div>
      </div>
    </article>
  );
}
