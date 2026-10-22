export function StoryCatalogUnavailable() {
  return (
    <div className="codex-offline-folio px-7 py-10 md:px-10 md:py-12">
      <div className="relative z-10 grid gap-8 md:grid-cols-[auto_1fr] md:items-center">
        <div
          className="codex-serif grid h-20 w-20 place-items-center border border-[#8A2A45]/45 text-3xl text-[#D8D5CF]/70"
          aria-hidden="true"
        >
          ×
        </div>

        <div>
          <p className="text-[0.66rem] font-semibold uppercase tracking-[0.3em] text-[#B03A5A]">
            Archivo temporalmente desconectado
          </p>

          <h3 className="codex-serif mt-3 text-2xl font-semibold text-[#F1E9E0] md:text-3xl">
            La biblioteca pública no está disponible en este momento
          </h3>

          <p className="mt-4 max-w-3xl leading-7 text-[#A99CA3]">
            El resto del Codex sigue accesible. Las historias volverán a aparecer
            automáticamente cuando el servicio editorial recupere conexión.
          </p>
        </div>
      </div>
    </div>
  );
}
