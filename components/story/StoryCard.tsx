"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import type { Story } from "../../lib/stories";

type StoryCardProps = {
  story: Story;
};

export function StoryCard({ story }: StoryCardProps) {
  return (
    <motion.div
      whileHover={{
        y: -6,
        scale: 1.015,
      }}
      whileTap={{
        scale: 0.985,
      }}
      transition={{
        duration: 0.25,
        ease: "easeOut",
      }}
    >
      <Link
        href={`/stories/${story.slug}`}
        className="group codex-card relative block overflow-hidden rounded-2xl p-5 transition duration-300"
      >
        <motion.div
          className="pointer-events-none absolute left-4 top-4 h-8 w-8 border-l border-t border-[#8A2A45]/45"
          animate={{
            opacity: [0.35, 0.75, 0.35],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        <motion.div
          className="pointer-events-none absolute bottom-4 right-4 h-8 w-8 border-b border-r border-[#8A2A45]/45"
          animate={{
            opacity: [0.75, 0.35, 0.75],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        <div className="relative z-10">
          <div className="mb-5 flex items-center justify-between gap-3">
            <span className="rounded-full border border-[#8A2A45]/40 bg-[#6E1F35]/15 px-3 py-1 text-xs uppercase tracking-[0.2em] text-[#D86A89]">
              {story.status}
            </span>

            <span className="text-xs text-[#A99CA3]">{story.format}</span>
          </div>

          <h2 className="codex-serif text-2xl font-semibold text-[#F1E9E0] transition group-hover:text-[#D86A89]">
            {story.title}
          </h2>

          <p className="mt-2 text-sm text-[#A99CA3]">{story.subtitle}</p>

          <p className="mt-5 line-clamp-3 text-sm leading-6 text-[#D8CBD0]">
            {story.description}
          </p>

          <div className="mt-6 flex flex-wrap gap-2">
            {story.genre.map((genre) => (
              <span
                key={genre}
                className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-xs text-[#A99CA3]"
              >
                {genre}
              </span>
            ))}
          </div>
        </div>
      </Link>
    </motion.div>
  );
}