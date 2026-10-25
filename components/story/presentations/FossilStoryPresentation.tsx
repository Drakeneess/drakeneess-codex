import type { Story } from "@/lib/stories";
import { getStoryStatusLabel } from "@/lib/story-profile";

type FossilStoryPresentationProps = {
  story: Story;
};

export function FossilStoryPresentation({
  story,
}: FossilStoryPresentationProps) {
  return (
    <div className="relative overflow-hidden rounded-[2rem] border border-[var(--story-accent)]/25 bg-[#0A0B09]/90 p-8 shadow-2xl shadow-black/50">
      {story.assets.heroImageUrl && (
        <img
          src={story.assets.heroImageUrl}
          alt=""
          className="pointer-events-none absolute inset-0 h-full w-full object-cover opacity-15"
        />
      )}

      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(113,140,90,0.16),transparent_26rem)]" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_bottom_right,rgba(201,178,124,0.10),transparent_24rem)]" />
      <div className="pointer-events-none absolute inset-0 opacity-[0.07] bg-[repeating-linear-gradient(0deg,rgba(255,255,255,0.08)_0px,rgba(255,255,255,0.08)_1px,transparent_1px,transparent_4px)]" />

      <div className="pointer-events-none absolute -left-16 top-20 h-48 w-48 rounded-full bg-[#6D7F5A]/10 blur-3xl" />
      <div className="pointer-events-none absolute -right-12 bottom-12 h-40 w-40 rounded-full bg-[#C9B27C]/10 blur-3xl" />

      <div className="pointer-events-none absolute right-6 top-6 font-mono text-[10px] uppercase tracking-[0.35em] text-[#C9B27C]/45">
        Registro fósil
      </div>

      <div className="relative z-10">
        <div className="mb-8 border-b border-[var(--story-accent)]/20 pb-6">
          {story.assets.logoImageUrl && (
            <img
              src={story.assets.logoImageUrl}
              alt=""
              className="mb-5 max-h-16 max-w-[20rem] object-contain object-left"
            />
          )}

          <h1 className="story-display-font text-4xl font-semibold tracking-tight text-[var(--story-text)] md:text-6xl">
            {story.title}
          </h1>

          {story.profile.subtitle && (
            <p className="story-display-font mt-3 text-lg text-[var(--story-accent-soft)]">
              {story.profile.subtitle}
            </p>
          )}
        </div>

        <div className="grid gap-8 md:grid-cols-[1.2fr_0.8fr]">
          <div>
            <p className="story-body-font max-w-3xl leading-8 text-[var(--story-muted)]">
              {story.description}
            </p>

            {story.profile.genres.length > 0 && (
              <div className="mt-6 flex flex-wrap gap-2">
                {story.profile.genres.map((genre) => (
                  <span key={genre} className="story-profile-chip">
                    {genre}
                  </span>
                ))}
              </div>
            )}

            {story.profile.tags.length > 0 && (
              <div className="story-profile-tags mt-4">
                {story.profile.tags.map((tag) => (
                  <span key={tag} className="story-profile-tag">
                    {tag}
                  </span>
                ))}
              </div>
            )}

            <div className="mt-8 rounded-2xl border border-[#C9B27C]/12 bg-[#151712]/70 p-5">
              <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-[#718C5A]">
                Observación curatorial
              </p>

              <p className="mt-3 text-sm leading-7 text-[#B9B29F]">
                Los restos no hablan, pero insisten. Cada fragmento parece
                demasiado pequeño para contener una especie entera, y aun así
                conserva algo parecido a la memoria.
              </p>
            </div>
          </div>

          <aside className="rounded-2xl border border-[#C9B27C]/10 bg-[#0F110D]/85 p-5">
            {story.assets.coverImageUrl && (
              <img
                src={story.assets.coverImageUrl}
                alt={`Portada de ${story.title}`}
                className="mb-6 aspect-[2/3] w-full rounded-xl object-cover"
              />
            )}

            <p className="font-mono text-xs uppercase tracking-[0.25em] text-[var(--story-accent)]">
              Ficha de exhibición
            </p>

            <dl className="mt-5 space-y-5 text-sm">
              {story.profile.authorName && (
                <div className="border-b border-white/5 pb-3">
                  <dt className="text-[#8E8A7D]">Autor</dt>
                  <dd className="mt-1 text-[var(--story-text)]">
                    {story.profile.authorName}
                  </dd>
                </div>
              )}

              <div className="border-b border-white/5 pb-3">
                <dt className="text-[#8E8A7D]">Estado</dt>
                <dd className="mt-1 text-[var(--story-text)]">
                  {getStoryStatusLabel(story.profile.status)}
                </dd>
              </div>

              <div className="border-b border-white/5 pb-3">
                <dt className="text-[#8E8A7D]">Idioma</dt>
                <dd className="mt-1 text-[var(--story-text)]">
                  {story.profile.language.toUpperCase()}
                </dd>
              </div>

              {story.profile.contentRating && (
                <div className="border-b border-white/5 pb-3">
                  <dt className="text-[#8E8A7D]">Clasificación</dt>
                  <dd className="mt-1 text-[var(--story-text)]">
                    {story.profile.contentRating}
                  </dd>
                </div>
              )}

              <div className="border-b border-white/5 pb-3">
                <dt className="text-[#8E8A7D]">Método de lectura</dt>
                <dd className="mt-1 text-[var(--story-text)]">
                  Evidencias, interpretaciones y contradicciones
                </dd>
              </div>
            </dl>
          </aside>
        </div>
      </div>
    </div>
  );
}
