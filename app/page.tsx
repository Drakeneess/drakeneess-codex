import Link from "next/link";
import { getStoryCatalogState } from "../lib/stories";
import { StoryCard } from "../components/story/StoryCard";
import { StoryCatalogUnavailable } from "../components/story/StoryCatalogUnavailable";
import { FadeIn } from "../components/motion/FadeIn";
import { StaggerContainer } from "../components/motion/StaggerContainer";
import { StaggerItem } from "../components/motion/StaggerItem";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const { stories, unavailable } = await getStoryCatalogState();
  const storyCount = unavailable ? "—" : String(stories.length).padStart(2, "0");

  return (
    <main className="px-4 pb-24 sm:px-6">
      <section className="mx-auto max-w-7xl pt-10 md:pt-16">
        <FadeIn>
          <div className="codex-home-hero px-6 py-12 md:px-12 md:py-16 lg:px-16 lg:py-20">
            <div className="relative z-10 grid items-center gap-14 lg:grid-cols-[1.25fr_0.75fr] lg:gap-20">
              <div>
                <p className="codex-home-kicker">Archivo narrativo</p>

                <h1 className="codex-home-title codex-serif platinum-title mt-6 text-5xl font-bold leading-[0.94] tracking-[-0.04em] sm:text-6xl md:text-7xl lg:text-[5.7rem]">
                  The Drakeneess Codex
                </h1>

                <p className="codex-home-lede mt-8">
                  Un archivo vivo para historias, mundos y documentos que no están hechos
                  para dormirse en una carpeta. Aquí cada obra conserva su propia voz,
                  atmósfera y forma de lectura.
                </p>

                <div className="mt-10 flex flex-wrap gap-3">
                  <Link href="/stories" className="codex-action-primary">
                    Explorar historias
                  </Link>

                  <Link href="/archive" className="codex-action-secondary">
                    Entrar al archivo
                  </Link>
                </div>
              </div>

              <div className="codex-index-plate flex flex-col items-center justify-between p-8 md:p-10">
                <div className="codex-index-meta">
                  <p className="codex-index-rule">Índice / raíz</p>
                  <p className="codex-index-rule">Colección pública</p>
                </div>

                <div className="codex-index-seal" aria-hidden="true">
                  <span className="codex-index-seal-mark">D</span>
                </div>

                <div className="codex-index-meta">
                  <p className="codex-index-rule">Historias registradas · {storyCount}</p>
                  <p className="codex-index-rule">Lectura / archivo / códice</p>
                </div>
              </div>
            </div>
          </div>
        </FadeIn>
      </section>

      <section className="mx-auto mt-20 max-w-7xl md:mt-28">
        <FadeIn>
          <div className="codex-library-heading mb-10 text-center">
            <div>
              <p className="text-[0.66rem] font-semibold uppercase tracking-[0.36em] text-[#8A2A45]">
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
