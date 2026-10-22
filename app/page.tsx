import { getStoryCatalogState } from "../lib/stories";
import { StoryCard } from "../components/story/StoryCard";
import { StoryCatalogUnavailable } from "../components/story/StoryCatalogUnavailable";
import { FadeIn } from "../components/motion/FadeIn";
import { StaggerContainer } from "../components/motion/StaggerContainer";
import { StaggerItem } from "../components/motion/StaggerItem";
import { CodexHeroInteractive } from "../components/home/CodexHeroInteractive";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const { stories, unavailable } = await getStoryCatalogState();
  const storyCount = unavailable ? "—" : String(stories.length).padStart(2, "0");

  return (
    <main className="px-4 pb-24 sm:px-6">
      <section className="mx-auto max-w-7xl pt-10 md:pt-16">
        <FadeIn>
          <CodexHeroInteractive storyCount={storyCount} archiveAvailable={!unavailable} />
        </FadeIn>
      </section>

      <section className="mx-auto mt-20 max-w-7xl md:mt-28">
        <FadeIn>
          <div className="codex-library-heading mb-10 text-center">
            <div>
              <p className="text-[0.66rem] font-semibold uppercase tracking-[0.38em] text-[#8A2A45]">
                Selección del archivo
              </p>
              <h2 className="codex-serif mt-3 text-3xl font-semibold text-[#F1E9E0] md:text-4xl">
                Historias principales
              </h2>
            </div>
          </div>
        </FadeIn>

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
      </section>
    </main>
  );
}
