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
          <div className="codex-ceremonial-hero px-6 py-14 md:px-12 md:py-18 lg:px-16 lg:py-20">
            <div className="codex-hero-corner codex-hero-corner-tl" aria-hidden="true" />
            <div className="codex-hero-corner codex-hero-corner-br" aria-hidden="true" />

            <div className="relative z-10 mx-auto max-w-5xl text-center">
              <div className="codex-hero-sigil mx-auto" aria-hidden="true">
                <span>D</span>
              </div>

              <p className="codex-ceremonial-kicker mt-7">
                Archivo interactivo de historias
              </p>

              <h1 className="codex-serif platinum-title mx-auto mt-6 max-w-[11ch] text-5xl font-bold leading-[0.92] tracking-[-0.045em] sm:text-6xl md:text-7xl lg:text-[6.3rem]">
                The Drakeneess Codex
              </h1>

              <div className="codex-ritual-divider mx-auto mt-9 max-w-3xl">
                <span>Archivo</span>
              </div>

              <p className="codex-ceremonial-lede mx-auto mt-8 max-w-3xl">
                Un códice digital para relatos, mundos y archivos que esperan ser abiertos
                con más curiosidad que prudencia. Cada obra conserva aquí su propia voz,
                atmósfera y forma de lectura.
              </p>

              <div className="mt-10 flex flex-wrap justify-center gap-4">
                <Link href="/stories" className="codex-ritual-action codex-ritual-action-primary">
                  Explorar historias
                </Link>

                <Link href="/archive" className="codex-ritual-action codex-ritual-action-secondary">
                  Entrar al archivo
                </Link>
              </div>

              <div className="codex-hero-ledger mx-auto mt-12 max-w-4xl">
                <span>Índice / raíz</span>
                <span>Colección pública</span>
                <span>Historias registradas · {storyCount}</span>
              </div>
            </div>
          </div>
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
