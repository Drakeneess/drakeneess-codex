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
    <article className="mx-auto max-w-4xl">
      <div className="mb-10 border-b border-[#718C5A]/20 pb-6">
        <Link
          href={`/stories/${story.slug}`}
          className="font-mono text-xs uppercase tracking-[0.22em] text-[#C9B27C]/80 transition hover:text-[#EEE8DC]"
        >
          ← Volver al registro de exhibición
        </Link>

        <div className="mt-6 flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="font-mono text-xs uppercase tracking-[0.35em] text-[#718C5A]">
              {story.title}
            </p>

            <h1 className="mt-2 text-2xl font-semibold text-[#EEE8DC] md:text-3xl">
              Capítulo {chapter.number}: {chapter.title}
            </h1>
          </div>

          <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-[#8E8A7D]">
            Archivo erosionado
          </p>
        </div>
      </div>

      <div className="relative overflow-hidden rounded-[1.75rem] border border-[#718C5A]/25 bg-[#0A0B09]/90 p-6 shadow-2xl shadow-black/50 md:p-10">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(113,140,90,0.13),transparent_24rem)]" />
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_bottom_right,rgba(201,178,124,0.08),transparent_22rem)]" />
        <div className="pointer-events-none absolute inset-0 opacity-[0.06] bg-[repeating-linear-gradient(0deg,rgba(255,255,255,0.08)_0px,rgba(255,255,255,0.08)_1px,transparent_1px,transparent_5px)]" />

        <div className="pointer-events-none absolute -left-20 top-24 h-56 w-56 rounded-full bg-[#718C5A]/10 blur-3xl" />
        <div className="pointer-events-none absolute -right-16 bottom-12 h-48 w-48 rounded-full bg-[#C9B27C]/10 blur-3xl" />

        <div className="pointer-events-none absolute right-6 top-6 font-mono text-[10px] uppercase tracking-[0.35em] text-[#C9B27C]/35">
          Lectura curatorial
        </div>

        <div className="relative z-10">
          <div className="mb-8 rounded-2xl border border-[#C9B27C]/10 bg-[#14160F]/70 p-5">
            <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-[#718C5A]">
              Nota de preservación
            </p>

            <p className="mt-3 text-sm leading-7 text-[#B9B29F]">
              El texto ha sido reconstruido desde fragmentos narrativos,
              hipótesis culturales y restos de intención. La certeza, como casi
              todo en este planeta, llegó tarde.
            </p>
          </div>

          <div className="fossil-prose">{children}</div>
        </div>
      </div>
    </article>
  );
}
