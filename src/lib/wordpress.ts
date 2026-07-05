import "server-only";
import { stripHtml, toBoolean, toNumber } from "@/lib/content-utils";
import { fetchLocalJson } from "@/lib/local-api";
import { getMockFilms } from "@/lib/public-content";
import type { Film, FilmStatus } from "@/types/film";
import type {
  WordPressFilm,
  WordPressFilmAcf,
  WordPressMedia,
  WordPressPage,
} from "@/types/wordpress";

const wordpressApiUrl = process.env.WORDPRESS_API_URL?.trim().replace(
  /\/$/,
  "",
);
const validStatuses = new Set<FilmStatus>([
  "en-production",
  "termine",
  "en-diffusion",
  "archive",
]);

export type WordPressFilmsResult = {
  films: Film[];
  source: "wordpress" | "mock";
};

function filmFields(film: WordPressFilm): WordPressFilmAcf {
  return { ...film, ...film.acf };
}

function normalizeStatus(value: unknown): FilmStatus {
  return validStatuses.has(value as FilmStatus)
    ? (value as FilmStatus)
    : "en-production";
}

function normalizePackSlug(value: WordPressFilmAcf["pack_woocommerce_lie"]) {
  if (typeof value === "string") return value || undefined;
  if (typeof value === "number") return String(value);
  return value?.slug || (value?.id ? String(value.id) : undefined);
}

async function normalizeMediaValue(
  value: WordPressFilmAcf["affiche"] | undefined,
) {
  if (!value) return "";
  if (typeof value === "string") return /^https?:\/\//.test(value) ? value : "";
  if (typeof value === "number")
    return (await getWordPressMediaUrl(value)) ?? "";
  return value.source_url ?? "";
}

async function normalizeGallery(
  value: WordPressFilmAcf["galerie"],
): Promise<string[]> {
  const items = Array.isArray(value)
    ? value
    : typeof value === "string"
      ? value.split(/\r?\n/)
      : [];

  const urls = await Promise.all(
    items.map(async (item) => {
      if (typeof item === "number") return getWordPressMediaUrl(item);
      if (typeof item === "string") return item.trim() || null;
      return item.source_url || null;
    }),
  );
  return urls.filter((url): url is string => Boolean(url));
}

export async function normalizeWordPressFilm(
  wordpressFilm: WordPressFilm,
): Promise<Film> {
  const acf = filmFields(wordpressFilm);
  const fallbackPoster = wordpressFilm.featured_media
    ? await getWordPressMediaUrl(wordpressFilm.featured_media)
    : null;

  return {
    id: String(wordpressFilm.id),
    slug: wordpressFilm.slug,
    title: stripHtml(wordpressFilm.title.rendered),
    shortDescription: stripHtml(
      acf.synopsis_court || wordpressFilm.excerpt.rendered,
    ),
    longDescription: stripHtml(
      acf.synopsis_long || wordpressFilm.content.rendered,
    ),
    year: toNumber(acf.annee, new Date().getFullYear()),
    status: normalizeStatus(acf.statut),
    poster: (await normalizeMediaValue(acf.affiche)) || fallbackPoster || "",
    trailerUrl: acf.bande_annonce_url || undefined,
    gallery: await normalizeGallery(acf.galerie),
    donationGoal: toNumber(acf.objectif_dons),
    donationCollected: toNumber(acf.montant_collecte),
    isFeatured: toBoolean(acf.mis_en_avant),
    priorityOrder: toNumber(acf.priorite_affichage, 99),
    publicVisibility: toBoolean(acf.visible_public),
    homepageVisibility: toBoolean(acf.visible_accueil),
    donationPackSlug: normalizePackSlug(acf.pack_woocommerce_lie),
    seoTitle: acf.seo_title_custom || undefined,
    seoDescription: acf.seo_description_custom || undefined,
    updatedAt: wordpressFilm.modified_gmt,
  };
}

async function mockFilmsResult(): Promise<WordPressFilmsResult> {
  return { films: await getMockFilms(), source: "mock" };
}

export async function getWordPressFilmsWithSource(): Promise<WordPressFilmsResult> {
  if (!wordpressApiUrl) return mockFilmsResult();

  try {
    const films = await fetchLocalJson<WordPressFilm[]>(
      `${wordpressApiUrl}/wp/v2/films?per_page=100&orderby=id&order=asc`,
    );
    return {
      films: await Promise.all(films.map(normalizeWordPressFilm)),
      source: "wordpress",
    };
  } catch {
    return mockFilmsResult();
  }
}

export async function getWordPressFilms(): Promise<Film[]> {
  return (await getWordPressFilmsWithSource()).films;
}

export async function getFeaturedWordPressFilms(): Promise<Film[]> {
  return (await getWordPressFilms())
    .filter(
      (film) =>
        film.publicVisibility && film.homepageVisibility && film.isFeatured,
    )
    .sort((a, b) => a.priorityOrder - b.priorityOrder)
    .slice(0, 3);
}

export async function getWordPressFilmBySlug(
  slug: string,
): Promise<Film | null> {
  if (!wordpressApiUrl) {
    return (await getMockFilms()).find((film) => film.slug === slug) ?? null;
  }

  try {
    const films = await fetchLocalJson<WordPressFilm[]>(
      `${wordpressApiUrl}/wp/v2/films?slug=${encodeURIComponent(slug)}&per_page=1`,
    );
    return films[0] ? normalizeWordPressFilm(films[0]) : null;
  } catch {
    return (await getMockFilms()).find((film) => film.slug === slug) ?? null;
  }
}

export async function getWordPressMediaUrl(mediaId: number) {
  if (!wordpressApiUrl || !mediaId) return null;
  try {
    const media = await fetchLocalJson<WordPressMedia>(
      `${wordpressApiUrl}/wp/v2/media/${mediaId}`,
    );
    return media.source_url || null;
  } catch {
    return null;
  }
}

export async function getWordPressMedia(id: number) {
  if (!wordpressApiUrl) return null;
  try {
    return await fetchLocalJson<WordPressMedia>(
      `${wordpressApiUrl}/wp/v2/media/${id}`,
    );
  } catch {
    return null;
  }
}

export async function getWordPressPages(): Promise<WordPressPage[]> {
  if (!wordpressApiUrl) return [];
  try {
    return await fetchLocalJson<WordPressPage[]>(
      `${wordpressApiUrl}/wp/v2/pages?per_page=100`,
    );
  } catch {
    return [];
  }
}
