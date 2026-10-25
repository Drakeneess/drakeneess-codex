import type { Story } from "@/lib/stories";
import { getStoryStatusLabel } from "@/lib/story-profile";

type DefaultStoryPresentationProps = {
  story: Story;
};

export function DefaultStoryPresentation({ story }: DefaultStoryPresentationProps) {
  const hasCover = Boolean(story.assets.coverImageUrl);

  return (
    <div className="story-profile-hero">
      {story.assets.heroImageUrl && (
        <img
          className="story-profile-hero-image"
          src={story.assets.heroImageUrl}
          alt=""
        />
      )}

      <div className="story-profile-hero-shade" />

      <div
        className={`story-profile-hero-content ${hasCover ? "has-cover" : ""}`}
      >
        {story.assets.coverImageUrl && (
          <img
            className="story-profile-cover"
            src={story.assets.coverImageUrl}
            alt={`Portada de ${story.title}`}
          />
        )}

        <div className="min-w-0 self-center">
          {story.assets.logoImageUrl && (
            <img
              className="story-profile-logo"
              src={story.assets.logoImageUrl}
              alt=""
            />
          )}

          <div className="story-profile-meta mt-4">
            <span>{getStoryStatusLabel(story.profile.status)}</span>

            {story.profile.authorName && (
              <span>Por {story.profile.authorName}</span>
            )}

            <span>{story.profile.language.toUpperCase()}</span>

            {story.profile.contentRating && (
              <span>{story.profile.contentRating}</span>
            )}
          </div>

          <h1 className="story-display-font mt-5 max-w-[16ch] text-4xl font-bold text-[var(--story-text)] md:text-6xl">
            {story.title}
          </h1>

          {story.profile.subtitle && (
            <p className="story-display-font mt-3 max-w-3xl text-lg text-[var(--story-accent-soft)] md:text-xl">
              {story.profile.subtitle}
            </p>
          )}

          <p className="story-body-font story-muted mt-7 max-w-3xl leading-8">
            {story.description}
          </p>

          {story.profile.genres.length > 0 && (
            <div className="mt-7 flex flex-wrap gap-2">
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
        </div>
      </div>
    </div>
  );
}
