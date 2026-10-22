"use client";

import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useState, type PointerEvent } from "react";

type CodexHeroInteractiveProps = {
  storyCount: string;
  archiveAvailable: boolean;
};

export function CodexHeroInteractive({
  storyCount,
  archiveAvailable,
}: CodexHeroInteractiveProps) {
  const [unsealed, setUnsealed] = useState(false);
  const reduceMotion = useReducedMotion();

  const handlePointerMove = (event: PointerEvent<HTMLDivElement>) => {
    if (reduceMotion) return;

    const rect = event.currentTarget.getBoundingClientRect();
    const x = ((event.clientX - rect.left) / rect.width) * 100;
    const y = ((event.clientY - rect.top) / rect.height) * 100;

    event.currentTarget.style.setProperty("--codex-pointer-x", `${x}%`);
    event.currentTarget.style.setProperty("--codex-pointer-y", `${y}%`);
  };

  const handlePointerLeave = (event: PointerEvent<HTMLDivElement>) => {
    event.currentTarget.style.setProperty("--codex-pointer-x", "50%");
    event.currentTarget.style.setProperty("--codex-pointer-y", "14%");
  };

  return (
    <div
      className={`codex-ceremonial-hero ${unsealed ? "is-unsealed" : ""}`}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
    >
      <div className="codex-hero-corner codex-hero-corner-tl" aria-hidden="true" />
      <div className="codex-hero-corner codex-hero-corner-br" aria-hidden="true" />

      <div className="relative z-10 mx-auto max-w-5xl px-6 py-10 text-center md:px-12 md:py-12 lg:px-16 lg:py-14">
        <div className="codex-seal-stage">
          <span className="codex-seal-rail codex-seal-rail-left" aria-hidden="true" />

          <div className="codex-seal-control">
            <motion.button
              type="button"
              className="codex-hero-sigil codex-hero-sigil-button"
              aria-expanded={unsealed}
              aria-controls="codex-seal-revelation"
              aria-describedby="codex-seal-instruction"
              aria-label={unsealed ? "Cerrar el sello del archivo" : "Abrir el sello del archivo"}
              onClick={() => setUnsealed((value) => !value)}
              whileTap={reduceMotion ? undefined : { scale: 0.92, rotate: -2 }}
            >
              <span className="codex-sigil-orbit" aria-hidden="true" />
              <span className="codex-sigil-core-ring" aria-hidden="true" />
              <span className="codex-sigil-mark">D</span>
            </motion.button>

            <span id="codex-seal-instruction" className="codex-seal-instruction">
              <span className="codex-seal-instruction-dot" aria-hidden="true" />
              {unsealed ? "Cerrar el sello" : "Abrir el sello"}
            </span>
          </div>

          <span className="codex-seal-rail codex-seal-rail-right" aria-hidden="true" />
        </div>

        <p className="codex-ceremonial-kicker mt-5">Archivo interactivo de historias</p>

        <h1 className="codex-serif platinum-title mx-auto mt-5 max-w-[11ch] text-5xl font-bold leading-[0.92] tracking-[-0.045em] sm:text-6xl md:text-7xl lg:text-[6.3rem]">
          The Drakeneess Codex
        </h1>

        <div className="codex-ritual-divider mx-auto mt-8 max-w-3xl">
          <span>Archivo</span>
        </div>

        <AnimatePresence initial={false}>
          {unsealed ? (
            <motion.div
              id="codex-seal-revelation"
              className="codex-seal-revelation mx-auto mt-6 max-w-3xl"
              initial={reduceMotion ? false : { opacity: 0, height: 0, scaleY: 0.9 }}
              animate={{ opacity: 1, height: "auto", scaleY: 1 }}
              exit={reduceMotion ? { opacity: 0 } : { opacity: 0, height: 0, scaleY: 0.9 }}
              transition={{ duration: reduceMotion ? 0 : 0.34, ease: [0.22, 1, 0.36, 1] }}
            >
              <p className="codex-seal-whisper">El archivo reconoce al visitante.</p>
              <div className="codex-seal-grid">
                <span>
                  <small>Estado</small>
                  {archiveAvailable ? "Archivo enlazado" : "Enlace en espera"}
                </span>
                <span>
                  <small>Registros</small>
                  {storyCount}
                </span>
                <span>
                  <small>Acceso</small>
                  Colección pública
                </span>
              </div>
            </motion.div>
          ) : null}
        </AnimatePresence>

        <p className="codex-ceremonial-lede mx-auto mt-7 max-w-3xl">
          Un códice digital para relatos, mundos y archivos que esperan ser abiertos con más
          curiosidad que prudencia. Cada obra conserva aquí su propia voz, atmósfera y forma de
          lectura.
        </p>

        <div className="mt-9 flex flex-wrap justify-center gap-4">
          <Link href="/stories" className="codex-ritual-action codex-ritual-action-primary">
            Explorar historias
          </Link>

          <Link href="/archive" className="codex-ritual-action codex-ritual-action-secondary">
            Entrar al archivo
          </Link>
        </div>

        <div className="codex-hero-ledger mx-auto mt-10 max-w-4xl">
          <span>Índice / raíz</span>
          <span>Colección pública</span>
          <span>Historias registradas · {storyCount}</span>
        </div>
      </div>
    </div>
  );
}
