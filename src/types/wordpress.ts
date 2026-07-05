export type WordPressRendered = {
  rendered: string;
  protected?: boolean;
};

export type WordPressPage = {
  id: number;
  slug: string;
  title: WordPressRendered;
  content: WordPressRendered;
};

export type WordPressFilmAcf = {
  synopsis_court?: string;
  synopsis_long?: string;
  annee?: number | string;
  statut?: string;
  affiche?: number | string | WordPressMedia | null;
  bande_annonce_url?: string;
  galerie?: string | Array<number | string | WordPressMedia>;
  objectif_dons?: number | string;
  montant_collecte?: number | string;
  mis_en_avant?: boolean | number | string;
  priorite_affichage?: number | string;
  visible_public?: boolean | number | string;
  visible_accueil?: boolean | number | string;
  pack_woocommerce_lie?:
    number | string | { id?: number; slug?: string } | null;
  seo_title_custom?: string;
  seo_description_custom?: string;
};

export type WordPressFilm = WordPressFilmAcf & {
  id: number;
  slug: string;
  title: WordPressRendered;
  content: WordPressRendered;
  excerpt: WordPressRendered;
  featured_media?: number;
  modified_gmt?: string;
  acf?: WordPressFilmAcf;
};

export type WordPressMedia = {
  id: number;
  source_url: string;
  alt_text?: string;
};

export type WordPressSeo = {
  title?: string;
  description?: string;
  canonical?: string;
  ogImage?: string;
};
