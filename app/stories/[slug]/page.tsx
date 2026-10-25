import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getStoryBySlug } from "@/lib/stories";
import { getThemeDefinition } from "@/lib/theme-registry";
import {
  getStoryTextureClass,
  getStoryVisualStyle,
} from "@/lib/story-profile";
import {
  hasCustomStoryLayout,
} from "@/lib/story-layout";
import {
  buildCustomStoryLayoutDocument,
} from "@/lib/story-layout-document";
import { StoryThemeScope } from "@/components/layout/ThemeRuntime";
import { CustomStoryLayoutFrame } from "@/components/story/CustomStoryLayoutFrame";
import { StoryPresentation } from "@/components/story/presentations/StoryPresentation";

export const dynamic = "force-dynamic";

type StoryPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

function getStoryDescription(
  title: string,
  description: string,
  subtitle: string,
) {
  return (
    description.trim() ||
    subtitle.trim() ||
    `${title} en The Drakeneess Codex.`
  );
}

export async function generateMetadata({
  params,
}: StoryPageProps): Promise<Metadata> {
  const { slug } = await params;
  const story = await getStoryBySlug(slug);

  if (!story) {
    return {
      title: "Historia no encontrada | The Drakeneess Codex",
      robots: {
        index: false,
        follow: false,
      },
    };
  }

  const description = getStoryDescription(
    story.title,
    story.description,
    story.profile.subtitle,
  );
  const socialImage =
    story.assets.heroImageUrl ??
    story.assets.coverImageUrl;
  const keywords = Array.from(
    new Set([
      ...story.profile.genres,
      ...story.profile.tags,
    ]),
  );
  const canonical = `/stories/${story.slug}`;

  return {
    title: `${story.title} | The Drakeneess Codex`,
    description,
    alternates: {
      canonical,
    },
    keywords: keywords.length > 0 ? keywords : undefined,
    authors: story.profile.authorName
      ? [
          {
            name: story.profile.authorName,
          },
        ]
      : undefined,
    openGraph: {
      type: "article",
      url: canonical,
      siteName: "The Drakeneess Codex",
      title: story.title,
      description,
      publishedTime: story.publishedAt,
      modifiedTime: story.updatedAt,
      authors: story.profile.authorName
        ? [story.profile.authorName]
        : undefined,
      tags: keywords.length > 0 ? keywords : undefined,
      images: socialImage
        ? [
            {
              url: socialImage,
              alt: `${story.title} — imagen editorial`,
            },
          ]
        : undefined,
    },
    twitter: {
      card: socialImage ? "summary_large_image" : "summary",
      title: story.title,
      description,
      images: socialImage ? [socialImage] : undefined,
    },
  };
}

export default async function StoryPage({ params }: StoryPageProps) {
  const { slug } = await params;
  const story = await getStoryBySlug(slug);

  if (!story) {
    notFound();
  }

  const theme = getThemeDefinition(story.theme.id);

  if (hasCustomStoryLayout(story.layout)) {
    const customDocument =
      buildCustomStoryLayoutDocument(story);

    return (
      <>
        <StoryThemeScope themeKey={story.theme.id} />

        <main className={`${theme.pageClass} story-page min-h-screen overflow-x-hidden`}>
          <CustomStoryLayoutFrame
            title={`${story.title} — presentación personalizada`}
            srcDoc={customDocument}
          />
        </main>
      </>
    );
  }

  const visualStyle = getStoryVisualStyle(story.theme.id, story.visuals);
  const textureClass = getStoryTextureClass(story.visuals.textureKey);

  return (
    <>
      <StoryThemeScope themeKey={story.theme.id} />

      <main
        className={`${theme.pageClass} story-page story-visual-scope ${textureClass} px-6 py-20`}
        style={visualStyle}
      >
        <section className="mx-auto max-w-5xl">
          <StoryPresentation story={story} />

          <section className="mt-12">
            <h2 className="story-display-font text-2xl font-semibold text-[var(--story-text)]">
              Capítulos
            </h2>

            {story.chapters.length === 0 ? (
              <p className="story-body-font story-muted mt-4">
                Aún no hay capítulos publicados en esta sección. El archivo está
                respirando, que es una forma elegante de decir “todavía no”.
              </p>
            ) : (
              <div className="mt-5 grid gap-4">
                {story.chapters.map((chapter) => (
                  <Link
                    key={chapter.slug}
                    href={`/stories/${story.slug}/chapters/${chapter.slug}`}
                    className="block rounded-2xl border border-white/10 bg-white/[0.035] p-5 transition hover:border-[var(--story-accent)] hover:bg-white/[0.06]"
                  >
                    <p className="story-accent text-sm">
                      Capítulo {chapter.number}
                    </p>

                    <h3 className="story-display-font mt-1 text-xl font-semibold text-[var(--story-text)]">
                      {chapter.title}
                    </h3>
                  </Link>
                ))}
              </div>
            )}
          </section>
        </section>
      </main>
    </>
  );
}
