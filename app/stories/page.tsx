import { getStoryCatalogState } from "@/lib/stories";
import { StoryCard } from "@/components/story/StoryCard";
import { StoryCatalogUnavailable } from "@/components/story/StoryCatalogUnavailable";
import { FadeIn } from "@/components/motion/FadeIn";
import { StaggerContainer } from "@/components/motion/StaggerContainer";
import { StaggerItem } from "@/components/motion/StaggerItem";

export const dynamic = "force-dynamic";

export default async function StoriesPage() {
  const { stories, unavailable } = await getStoryCatalogState();

  return (
    <main className="story-page px-6 py-20">
      <section className="mx-auto max-w-5xl">
        <FadeIn>
          <p className="text-sm uppercase tracking-[0.35em] text-[#8A2A45]">
            Historias
          </p>

          <h1 className="codex-serif mt-3 text-4xl font-bold text-[#F1E9E0] md:text-6xl">
            Biblioteca de mundos
          </h1>

          <p className="mt-5 max-w-2xl text-[#A99CA3]">
            Cada historia abre una sala distinta dentro del archivo: otro tono,
            otra atmósfera y otra forma de leer.
          </p>
        </FadeIn>

        <div className="mt-12">
          {unavailable ? (
            <StoryCatalogUnavailable />
          ) : (
            <StaggerContainer className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
              {stories.map((story) => (
                <StaggerItem key={story.slug}>
                  <StoryCard story={story} />
                </StaggerItem>
              ))}
            </StaggerContainer>
          )}
        </div>
      </section>
    </main>
  );
}
