import "server-only";
import { getMockFilms } from "@/lib/public-content";
import type { Film } from "@/types/film";
import type {
  WordPressMedia,
  WordPressPage,
  WordPressSeo,
} from "@/types/wordpress";

const wordpressApiUrl = process.env.WORDPRESS_API_URL?.trim();

/**
 * Adaptateur WordPress en attente du CMS local XAMPP.
 * TODO : remplacer les retours mock par des appels REST serveur avec validation
 * et revalidation Next.js lorsque le schéma du CPT Films sera stabilisé.
 */
export async function getWordPressPages(): Promise<WordPressPage[]> {
  if (!wordpressApiUrl) return [];
  return [];
}

export async function getWordPressFilms(): Promise<Film[]> {
  if (!wordpressApiUrl) return getMockFilms();
  return getMockFilms();
}

export async function getWordPressFilmBySlug(
  slug: string,
): Promise<Film | null> {
  const films = await getWordPressFilms();
  return films.find((film) => film.slug === slug) ?? null;
}

export async function getWordPressMedia(
  id: number,
): Promise<WordPressMedia | null> {
  void id;
  // TODO : GET /wp/v2/media/:id lorsque WordPress local sera prêt.
  return null;
}

export async function getWordPressSeo(
  url: string,
): Promise<WordPressSeo | null> {
  void url;
  // TODO : adapter la réponse Yoast ou Rank Math exposée par la REST API.
  return null;
}
