"use client";

import { useMemo, useState } from "react";
import type { StorySummary } from "@/lib/stories";
import type { StoryStatus } from "@/lib/story-profile";
import { getStoryStatusLabel } from "@/lib/story-profile";
import { StoryCard } from "@/components/story/StoryCard";

type StoryCatalogProps = {
  stories: StorySummary[];
};

type StatusFilter = "all" | StoryStatus;

function uniqueSorted(values: string[]) {
  return Array.from(new Set(values)).sort((left, right) =>
    left.localeCompare(right, "es", {
      sensitivity: "base",
    }),
  );
}

export function StoryCatalog({ stories }: StoryCatalogProps) {
  const [status, setStatus] = useState<StatusFilter>("all");
  const [genre, setGenre] = useState("all");
  const [tag, setTag] = useState("all");

  const genres = useMemo(
    () => uniqueSorted(stories.flatMap((story) => story.profile.genres)),
    [stories],
  );

  const tags = useMemo(
    () => uniqueSorted(stories.flatMap((story) => story.profile.tags)),
    [stories],
  );

  const statuses = useMemo(
    () =>
      Array.from(new Set(stories.map((story) => story.profile.status))) as StoryStatus[],
    [stories],
  );

  const filteredStories = useMemo(
    () =>
      stories.filter((story) => {
        if (status !== "all" && story.profile.status !== status) {
          return false;
        }

        if (genre !== "all" && !story.profile.genres.includes(genre)) {
          return false;
        }

        if (tag !== "all" && !story.profile.tags.includes(tag)) {
          return false;
        }

        return true;
      }),
    [stories, status, genre, tag],
  );

  const hasFilters = status !== "all" || genre !== "all" || tag !== "all";

  function clearFilters() {
    setStatus("all");
    setGenre("all");
    setTag("all");
  }

  return (
    <div>
      <div className="story-catalog-toolbar">
        <div className="story-catalog-filter-grid">
          <label>
            <span>Estado</span>
            <select
              value={status}
              onChange={(event) => {
                setStatus(event.target.value as StatusFilter);
              }}
            >
              <option value="all">Todos</option>
              {statuses.map((value) => (
                <option key={value} value={value}>
                  {getStoryStatusLabel(value)}
                </option>
              ))}
            </select>
          </label>

          <label>
            <span>Género</span>
            <select
              value={genre}
              onChange={(event) => {
                setGenre(event.target.value);
              }}
              disabled={genres.length === 0}
            >
              <option value="all">Todos</option>
              {genres.map((value) => (
                <option key={value} value={value}>
                  {value}
                </option>
              ))}
            </select>
          </label>

          <label>
            <span>Etiqueta</span>
            <select
              value={tag}
              onChange={(event) => {
                setTag(event.target.value);
              }}
              disabled={tags.length === 0}
            >
              <option value="all">Todas</option>
              {tags.map((value) => (
                <option key={value} value={value}>
                  {value}
                </option>
              ))}
            </select>
          </label>
        </div>

        <div className="story-catalog-toolbar-meta">
          <span>
            {filteredStories.length} de {stories.length} obras
          </span>

          {hasFilters && (
            <button type="button" onClick={clearFilters}>
              Limpiar filtros
            </button>
          )}
        </div>
      </div>

      {filteredStories.length === 0 ? (
        <div className="story-catalog-empty">
          <p>No hay obras publicadas que coincidan con esta combinación.</p>
          <button type="button" onClick={clearFilters}>
            Mostrar todas
          </button>
        </div>
      ) : (
        <div className="story-catalog-grid">
          {filteredStories.map((story) => (
            <StoryCard key={story.slug} story={story} />
          ))}
        </div>
      )}
    </div>
  );
}
