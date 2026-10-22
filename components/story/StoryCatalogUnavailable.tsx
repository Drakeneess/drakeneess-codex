export function StoryCatalogUnavailable() {
  return (
    <div className="rounded-3xl border border-[#8A2A45]/35 bg-[#141017]/75 p-8 text-center shadow-2xl shadow-black/20">
      <p className="text-xs uppercase tracking-[0.35em] text-[#D86A89]">
        Archivo temporalmente desconectado
      </p>

      <h3 className="codex-serif mt-4 text-2xl font-semibold text-[#F1E9E0]">
        La biblioteca pública no está disponible en este momento
      </h3>

      <p className="mx-auto mt-4 max-w-2xl leading-7 text-[#A99CA3]">
        El resto del Codex sigue accesible. Las historias volverán a aparecer
        automáticamente cuando el servicio editorial recupere conexión.
      </p>
    </div>
  );
}
