export type WordPressPage = {
  id: number;
  slug: string;
  title: { rendered: string };
  content: { rendered: string };
};

export type WordPressMedia = {
  id: number;
  source_url: string;
  alt_text: string;
};

export type WordPressSeo = {
  title?: string;
  description?: string;
  canonical?: string;
  ogImage?: string;
};
