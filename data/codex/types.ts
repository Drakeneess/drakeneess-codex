export interface PublicStoryProfile {
  subtitle: string;
  authorName: string;
  status: "ongoing" | "completed" | "hiatus";
  language: string;
  genres: string[];
  tags: string[];
  contentRating: string | null;
}

export interface PublicStoryAssets {
  coverImageUrl: string | null;
  heroImageUrl: string | null;
  logoImageUrl: string | null;
}

export interface PublicStoryVisuals {
  accent: string | null;
  accentSoft: string | null;
  background: string | null;
  panel: string | null;
  displayFontKey: string | null;
  bodyFontKey: string | null;
  ornamentKey: string | null;
  textureKey: string | null;
  readerWidth: "narrow" | "standard" | "wide";
}

export interface PublicStorySummary {
  slug: string;
  title: string;
  description: string;
  themeKey: string;
  profile?: PublicStoryProfile;
  assets?: PublicStoryAssets;
  visuals?: PublicStoryVisuals;
  chapterCount?: number;
  publishedAt: string;
  updatedAt: string;
}

export interface PublicChapterSummary {
  slug: string;
  title: string;
  order: number;
  publishedAt: string;
  updatedAt: string;
}

export interface PublicStory
  extends PublicStorySummary {
  chapters: PublicChapterSummary[];
}

export interface PublicChapter
  extends PublicChapterSummary {
  content: string;
}

export interface PublicChapterResult {
  story: PublicStorySummary;
  chapter: PublicChapter;
}
