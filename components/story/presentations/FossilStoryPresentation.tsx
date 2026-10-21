import type { Story } from "@/lib/stories";

type FossilStoryPresentationProps = {
  story: Story;
};

export function FossilStoryPresentation({
  story,
}: FossilStoryPresentationProps) {
  return (
    <div className="relative overflow-hidden rounded-[2rem] border border-[var(--story-accent)]/25 bg-[#0A0B09]/90 p-8 shadow-2xl shadow-black/50">
      {/* Fondo atmosférico */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(113,140,90,0.16),transparent_26rem)]" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_bottom_right,rgba(201,178,124,0.10),transparent_24rem)]" />
      <div className="pointer-events-none absolute inset-0 opacity-[0.07] bg-[repeating-linear-gradient(0deg,rgba(255,255,255,0.08)_0px,rgba(255,255,255,0.08)_1px,transparent_1px,transparent_4px)]" />

      {/* Mancha / desgaste */}
      <div className="pointer-events-none absolute -left-16 top-20 h-48 w-48 rounded-full bg-[#6D7F5A]/10 blur-3xl" />
      <div className="pointer-events-none absolute -right-12 bottom-12 h-40 w-40 rounded-full bg-[#C9B27C]/10 blur-3xl" />

      {/* Sello superior */}
      <div className="pointer-events-none absolute right-6 top-6 font-mono text-[10px] uppercase tracking-[0.35em] text-[#C9B27C]/45">
        Registro fósil
      </div>

      <div className="relative z-10">
        {/* Encabezado */}
        <div className="mb-8 border-b border-[var(--story-accent)]/20 pb-6">
          <p className="font-mono text-xs uppercase tracking-[0.35em] text-[var(--story-accent)]">
            {story.format}
          </p>

          <h1 className="mt-4 text-4xl font-semibold tracking-tight text-[var(--story-text)] md:text-6xl">
            {story.title}
          </h1>

          <p className="mt-4 max-w-2xl text-lg leading-8 text-[#C9B27C]/85">
            {story.subtitle}
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-[1.2fr_0.8fr]">
          {/* Columna principal */}
          <div>
            <p className="max-w-3xl leading-8 text-[var(--story-muted)]">
              {story.description}
            </p>

            <div className="mt-8 flex flex-wrap gap-2">
              {story.genre.map((genre) => (
                <span
                  key={genre}
                  className="rounded-sm border border-[#718C5A]/20 bg-[#718C5A]/8 px-3 py-1 font-mono text-[11px] uppercase tracking-[0.18em] text-[#C9B27C]/80"
                >
                  {genre}
                </span>
              ))}
            </div>

            {/* Bloque evocativo */}
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

          {/* Ficha lateral */}
          <aside className="rounded-2xl border border-[#C9B27C]/10 bg-[#0F110D]/85 p-5">
            <p className="font-mono text-xs uppercase tracking-[0.25em] text-[var(--story-accent)]">
              Ficha de exhibición
            </p>

            <dl className="mt-5 space-y-5 text-sm">
              <div className="border-b border-white/5 pb-3">
                <dt className="text-[#8E8A7D]">Clasificación</dt>
                <dd className="mt-1 text-[var(--story-text)]">
                  Reconstrucción especulativa
                </dd>
              </div>

              <div className="border-b border-white/5 pb-3">
                <dt className="text-[#8E8A7D]">Estado</dt>
                <dd className="mt-1 text-[var(--story-text)]">
                  {story.status}
                </dd>
              </div>

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