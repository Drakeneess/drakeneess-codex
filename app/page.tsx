import Link from "next/link";
import { getStories } from "../lib/stories";
import { StoryCard } from "../components/story/StoryCard";
import { FadeIn } from "../components/motion/FadeIn";
import { StaggerContainer } from "../components/motion/StaggerContainer";
import { StaggerItem } from "../components/motion/StaggerItem";

export default async function HomePage() {
  const stories = await getStories();

  return (
    <main className="px-6">
      <section className="mx-auto flex min-h-[78vh] max-w-7xl items-center py-20">
        <FadeIn className="w-full">
          <div className="victorian-frame relative w-full rounded-[2rem] p-8 md:p-14">
            <div className="mx-auto max-w-5xl text-center">
              <p className="mb-5 text-xs uppercase tracking-[0.55em] text-[#8A2A45]">
                Archivo interactivo de historias
              </p>

              <h1 className="codex-serif platinum-title text-5xl font-bold tracking-tight md:text-8xl">
                The Drakeneess Codex
              </h1>

              <div className="victorian-divider platinum-divider mx-auto my-8 max-w-3xl">
                <span>Archivo</span>
              </div>

              <p className="mx-auto max-w-2xl text-lg leading-8 text-[#A99CA3]">
                Un códice digital para relatos, mundos y archivos que esperan ser abiertos
                con más curiosidad que prudencia.
              </p>

              <div className="mt-10 flex flex-wrap justify-center gap-4">
                <Link
                  href="/stories"
                  className="victorian-button rounded-full px-7 py-3 text-sm font-semibold transition hover:scale-105"
                >
                  <span className="relative z-10">Explorar historias</span>
                </Link>

                <Link
                  href="/archive"
                  className="rounded-full border border-[#8A2A45]/50 bg-[#141017]/70 px-7 py-3 text-sm font-semibold text-[#F1E9E0] transition hover:border-[#D8D5CF]/35 hover:text-[#D86A89]"
                >
                  Entrar al archivo
                </Link>
              </div>
            </div>
          </div>
        </FadeIn>
      </section>

      <section className="mx-auto max-w-7xl pb-24">
        <FadeIn>
          <div className="mb-8 text-center">
            <p className="text-xs uppercase tracking-[0.42em] text-[#8A2A45]">
              Destacadas
            </p>

            <h2 className="codex-serif mt-3 text-4xl font-semibold text-[#F1E9E0]">
              Historias principales
            </h2>

            <div className="victorian-divider mx-auto mt-6 max-w-xl">
              <span>Mundos</span>
            </div>
          </div>
        </FadeIn>

        <StaggerContainer className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {stories.map((story) => (
            <StaggerItem key={story.slug}>
              <StoryCard story={story} />
            </StaggerItem>
          ))}
        </StaggerContainer>
      </section>
    </main>
  );
}