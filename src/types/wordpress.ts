export type WordPressPage = {
  id: number;
  slug: string;
  title: { rendered: string };
  content: { rendered: string };
};
