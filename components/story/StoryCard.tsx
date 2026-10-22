"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import type { PointerEvent } from "react";
import type { StorySummary } from "../../lib/stories";

type StoryCardProps = {
  story: StorySummary;
};

export function StoryCard({ story }: StoryCardProps) {
  const publishedYear = story.publishedAt.slice(0, 4);
  const reduceMotion = useReducedMotion();

  const handlePointerMove = (event: PointerEvent<HTMLAnchorElement>) => {
    if (reduceMotion) return;

    const rect = event.currentTarget.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width;
    const y = (event.clientY - rect.top) / rect.height;

    event.currentTarget.style.setProperty("--folio-x", `${x * 100}%`);
    event.currentTarget.style.setProperty("--folio-y", `${y * 100}%`);
    event.currentTarget.style.setProperty("--folio-tilt-x", `${(0.5 - y) * 5}deg`);
    event.currentTarget.style.setProperty("--folio-tilt-y", `${(x - 0.5) * 7}deg`);
  };

  const handlePointerLeave = (event: PointerEvent<HTMLAnchorElement>) => {
    event.currentTarget.style.setProperty("--folio-x", "82%");
    event.currentTarget.style.setProperty("--folio-y", "10%");
    event.currentTarget.style.setProperty("--folio-tilt-x", "0deg");
    event.currentTarget.style.setProperty("--folio-tilt-y", "0deg");
  };

  return (
    <motion.article
      whileTap={reduceMotion ? undefined : { scale: 0.99 }}
      transition={{ duration: 0.18, ease: "easeOut" }}
      className="h-full"
    >
      <Link
        href={`/stories/${story.slug}`}
        className="group codex-folio-card flex h-full flex-col p-6 md:p-7"
        onPointerMove={handlePointerMove}
        onPointerLeave={handlePointerLeave}
      >
        <div className="relative z-10 flex h-full flex-col">
          <div className="flex items-start justify-between gap-4">
            <span className="codex-folio-label">Registro publicado</span>
            <span
              className="codex-serif text-4xl leading-none text-[#D8D5CF]/12 transition duration-300 group-hover:text-[#8A2A45]/45"
              aria-hidden="true"
            >
              §
            </span>
          </div>

          <div className="mt-10 flex-1">
            <h2 className="codex-serif max-w-[14ch] text-3xl font-semibold leading-tight text-[#F1E9E0] transition duration-300 group-hover:text-[#E9DDE1]">
              {story.title}
            </h2>

            <div className="mt-4 h-px w-16 bg-gradient-to-r from-[#8A2A45]/70 to-transparent" />

            <p className="mt-5 line-clamp-4 max-w-[34rem] text-sm leading-7 text-[#B8ABB1]">
              {story.description}
            </p>
          </div>

          <div className="mt-10 flex items-end justify-between gap-4 border-t border-white/[0.07] pt-4">
            <span className="text-[0.62rem] uppercase tracking-[0.2em] text-[#6F676B]">
              Publicado · {publishedYear}
            </span>
            <span className="codex-folio-arrow">
              Abrir <span aria-hidden="true">→</span>
            </span>
          </div>
        </div>
      </Link>
    </motion.article>
  );
}
