export interface PublicStorySummary {
  slug: string;
  title: string;
  description: string;
  themeKey: string;
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
