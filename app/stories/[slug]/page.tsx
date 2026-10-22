import Link from "next/link";
import { notFound } from "next/navigation";
import { getStoryBySlug } from "@/lib/stories";
import { getThemeDefinition } from "@/lib/theme-registry";
import { StoryThemeScope } from "@/components/layout/ThemeRuntime";
import { StoryPresentation } from "@/components/story/presentations/StoryPresentation";

export const dynamic = "force-dynamic";

type StoryPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export default async function StoryPage({ params }: StoryPageProps) {
  const { slug } = await params;
  const story = await getStoryBySlug(slug);

  if (!story) {
    notFound();
  }

  const theme = getThemeDefinition(story.theme.id);

  return (
    <>
      <StoryThemeScope themeKey={story.theme.id} />

      <main className={`${theme.pageClass} story-page px-6 py-20`}>
        <section className="mx-auto max-w-5xl">
          <StoryPresentation story={story} />

          <section className="mt-12">
            <h2 className="codex-serif text-2xl font-semibold text-[var(--story-text)]">
              Capítulos
            </h2>

            {story.chapters.length === 0 ? (
              <p className="story-muted mt-4">
                Aún no hay capítulos publicados en esta sección. El archivo está
                respirando, que es una forma elegante de decir “todavía no”.
              </p>
            ) : (
              <div className="mt-5 grid gap-4">
                {story.chapters.map((chapter) => (
                  <Link
                    key={chapter.slug}
                    href={`/stories/${story.slug}/chapters/${chapter.slug}`}
                    className="block rounded-2xl border border-white/10 bg-white/[0.035] p-5 transition hover:border-[var(--story-accent)] hover:bg-white/[0.06]"
                  >
                    <p className="story-accent text-sm">
                      Capítulo {chapter.number}
                    </p>

                    <h3 className="codex-serif mt-1 text-xl font-semibold text-[var(--story-text)]">
                      {chapter.title}
                    </h3>
                  </Link>
                ))}
              </div>
            )}
          </section>
        </section>
      </main>
    </>
  );
}
