"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import type { StorySummary } from "../../lib/stories";

type StoryCardProps = {
  story: StorySummary;
};

export function StoryCard({ story }: StoryCardProps) {
  const publishedYear = story.publishedAt.slice(0, 4);

  return (
    <motion.article
      whileTap={{ scale: 0.99 }}
      transition={{ duration: 0.18, ease: "easeOut" }}
      className="h-full"
    >
      <Link
        href={`/stories/${story.slug}`}
        className="group codex-folio-card flex h-full flex-col p-6 md:p-7"
      >
        <div className="relative z-10 flex h-full flex-col">
          <div className="flex items-start justify-between gap-4">
            <span className="codex-folio-label">Registro publicado</span>
            <span
              className="codex-serif text-4xl leading-none text-[#D8D5CF]/10 transition duration-300 group-hover:text-[#8A2A45]/35"
              aria-hidden="true"
            >
              §
            </span>
          </div>

          <div className="mt-10 flex-1">
            <h2 className="codex-serif max-w-[14ch] text-3xl font-semibold leading-tight text-[#F1E9E0] transition duration-300 group-hover:text-[#E5D9D2]">
              {story.title}
            </h2>

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
