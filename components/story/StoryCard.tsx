"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import type { PointerEvent } from "react";
import type { StorySummary } from "../../lib/stories";
import {
  getStoryOrnament,
  getStoryStatusLabel,
  getStoryTextureClass,
  getStoryVisualStyle,
} from "@/lib/story-profile";

type StoryCardProps = {
  story: StorySummary;
};

export function StoryCard({ story }: StoryCardProps) {
  const publishedYear = story.publishedAt.slice(0, 4);
  const reduceMotion = useReducedMotion();
  const ornament = getStoryOrnament(story.visuals.ornamentKey);
  const textureClass = getStoryTextureClass(story.visuals.textureKey);
  const visualStyle = getStoryVisualStyle(story.theme.id, story.visuals);
  const statusLabel = getStoryStatusLabel(story.profile.status);

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
        className={`group codex-folio-card story-visual-scope ${textureClass} flex h-full flex-col p-6 md:p-7`}
        style={visualStyle}
        onPointerMove={handlePointerMove}
        onPointerLeave={handlePointerLeave}
      >
        {story.assets.coverImageUrl && (
          <div className="codex-folio-cover" aria-hidden="true">
            <img src={story.assets.coverImageUrl} alt="" />
          </div>
        )}

        <div className="relative z-10 flex h-full flex-col">
          <div className="flex items-start justify-between gap-4">
            <div>
              <span className="codex-folio-label">{statusLabel}</span>

              {story.profile.authorName && (
                <span className="codex-folio-author">{story.profile.authorName}</span>
              )}
            </div>

            {ornament && (
              <span className="codex-folio-ornament" aria-hidden="true">
                {ornament}
              </span>
            )}
          </div>

          <div className="mt-10 flex-1">
            {story.assets.logoImageUrl && (
              <img
                src={story.assets.logoImageUrl}
                alt=""
                className="codex-folio-logo"
              />
            )}

            <h2 className="story-display-font max-w-[14ch] text-3xl font-semibold leading-tight text-[var(--story-text)] transition duration-300 group-hover:text-[var(--story-accent-soft)]">
              {story.title}
            </h2>

            {story.profile.subtitle && (
              <p className="codex-folio-subtitle mt-2">
                {story.profile.subtitle}
              </p>
            )}

            <div className="codex-folio-rule mt-4 h-px w-16" />

            <p className="story-body-font mt-5 line-clamp-4 max-w-[34rem] text-sm leading-7 text-[var(--story-muted)]">
              {story.description}
            </p>

            {story.profile.genres.length > 0 && (
              <div className="codex-folio-genres mt-5">
                {story.profile.genres.slice(0, 3).map((genre) => (
                  <span key={genre}>{genre}</span>
                ))}
              </div>
            )}
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
