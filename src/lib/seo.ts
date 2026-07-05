import "server-only";
import type { Metadata } from "next";
import { stripHtml } from "./content-utils";
import { siteConfig } from "./config";
import { fetchLocalJson } from "./local-api";
import type { WordPressFilm, WordPressPage } from "@/types/wordpress";

const yoastApiUrl = process.env.YOAST_API_URL?.trim().replace(/\/$/, "");
const wordpressApiUrl = process.env.WORDPRESS_API_URL?.trim().replace(
  /\/$/,
  "",
);

export const seoRouteMap = {
  "/": "accueil",
  "/association": "association",
  "/equipe": "equipe",
  "/films": "films",
  "/boutique": "boutique",
  "/contact": "contact",
  "/mentions-legales": "mentions-legales",
  "/politique-confidentialite": "politique-confidentialite",
} as const;

type YoastImage = { url?: string };
type YoastJson = {
  title?: string;
  description?: string;
  canonical?: string;
  robots?: { index?: string; follow?: string };
  og_title?: string;
  og_description?: string;
  og_url?: string;
  og_site_name?: string;
  og_locale?: string;
  og_type?: string;
  og_image?: YoastImage[];
  twitter_title?: string;
  twitter_description?: string;
  twitter_card?: "summary" | "summary_large_image";
  twitter_image?: string;
  schema?: unknown;
};

export type YoastResponse = {
  status?: number;
  html?: string;
  json?: YoastJson;
};

export function createMetadata(
  title: string,
  description: string,
  path = "/",
): Metadata {
  return {
    title,
    description,
    alternates: { canonical: new URL(path, siteConfig.url).toString() },
    openGraph: {
      title,
      description,
      type: "website",
      locale: "fr_FR",
      siteName: siteConfig.name,
      url: new URL(path, siteConfig.url).toString(),
    },
  };
}

export async function getWordPressPageBySlug(slug: string) {
  if (!wordpressApiUrl) return null;
  try {
    const pages = await fetchLocalJson<WordPressPage[]>(
      `${wordpressApiUrl}/wp/v2/pages?slug=${encodeURIComponent(slug)}&per_page=1`,
    );
    return pages[0] ?? null;
  } catch {
    return null;
  }
}

export function extractYoastFromWpPage(page: WordPressPage) {
  return page.yoast_head_json
    ? ({
        status: 200,
        json: page.yoast_head_json as YoastJson,
      } satisfies YoastResponse)
    : null;
}

export async function getYoastMetadataForRoute(route: string) {
  const slug = seoRouteMap[route as keyof typeof seoRouteMap];
  if (!slug) return null;
  const page = await getWordPressPageBySlug(slug);
  return page ? extractYoastFromWpPage(page) : null;
}

export async function getYoastMetadataByUrl(url: string) {
  if (!yoastApiUrl) return null;
  try {
    const data = await fetchLocalJson<YoastResponse>(
      `${yoastApiUrl}/get_head?url=${encodeURIComponent(url)}`,
    );
    return data.status && data.status >= 400 ? null : data;
  } catch {
    return null;
  }
}

export function normalizeYoastMetadata(data: YoastResponse): Metadata {
  const json = data.json;
  if (!json) return {};
  const images = (json.og_image ?? [])
    .map((image) => image.url)
    .filter((url): url is string => Boolean(url));

  return {
    title: json.title,
    description: json.description,
    robots: json.robots
      ? {
          index: json.robots.index !== "noindex",
          follow: json.robots.follow !== "nofollow",
        }
      : undefined,
    openGraph: {
      title: json.og_title || json.title,
      description: json.og_description || json.description,
      siteName: json.og_site_name || siteConfig.name,
      locale: json.og_locale || "fr_FR",
      type: json.og_type === "article" ? "article" : "website",
      images: images.length ? images : undefined,
    },
    twitter: {
      card: json.twitter_card || "summary_large_image",
      title: json.twitter_title || json.og_title || json.title,
      description:
        json.twitter_description || json.og_description || json.description,
      images: json.twitter_image ? [json.twitter_image] : images,
    },
  };
}

function mergeHeadlessMetadata(
  fallback: Metadata,
  yoast: Metadata,
  publicPath: string,
): Metadata {
  const publicUrl = new URL(publicPath, siteConfig.url).toString();
  const yoastOpenGraph = yoast.openGraph || {};
  const yoastTwitter = yoast.twitter || {};

  return {
    ...fallback,
    ...yoast,
    title: yoast.title || fallback.title,
    description: yoast.description || fallback.description,
    alternates: { canonical: publicUrl },
    openGraph: {
      ...fallback.openGraph,
      ...yoastOpenGraph,
      title: yoastOpenGraph.title || fallback.openGraph?.title,
      description:
        yoastOpenGraph.description || fallback.openGraph?.description,
      url: publicUrl,
    },
    twitter: {
      ...fallback.twitter,
      ...yoastTwitter,
      title: yoastTwitter.title || fallback.twitter?.title,
      description: yoastTwitter.description || fallback.twitter?.description,
    },
  };
}

export async function buildMetadataFromWordPressPage(
  route: keyof typeof seoRouteMap,
  fallback: Metadata,
): Promise<Metadata> {
  const page = await getWordPressPageBySlug(seoRouteMap[route]);
  if (!page) return fallback;
  const yoastData = extractYoastFromWpPage(page);
  if (yoastData?.json) {
    return mergeHeadlessMetadata(
      fallback,
      normalizeYoastMetadata(yoastData),
      route,
    );
  }

  return {
    ...fallback,
    title: stripHtml(page.title.rendered) || fallback.title,
    description:
      stripHtml(page.excerpt?.rendered || "") || fallback.description,
  };
}

async function getWordPressFilmSeoEntity(slug: string) {
  if (!wordpressApiUrl) return null;
  try {
    const films = await fetchLocalJson<WordPressFilm[]>(
      `${wordpressApiUrl}/wp/v2/films?slug=${encodeURIComponent(slug)}&per_page=1`,
    );
    return films[0] ?? null;
  } catch {
    return null;
  }
}

export async function buildMetadataFromWordPressFilm(
  slug: string,
  fallback: Metadata,
): Promise<Metadata> {
  const film = await getWordPressFilmSeoEntity(slug);
  const yoastData = film?.yoast_head_json
    ? ({
        status: 200,
        json: film.yoast_head_json as YoastJson,
      } satisfies YoastResponse)
    : null;
  return yoastData?.json
    ? mergeHeadlessMetadata(
        fallback,
        normalizeYoastMetadata(yoastData),
        `/films/${slug}`,
      )
    : fallback;
}

export async function buildMetadataFromYoastOrFallback(
  url: string,
  fallback: Metadata,
): Promise<Metadata> {
  const data = await getYoastMetadataByUrl(url);
  return data?.json
    ? mergeHeadlessMetadata(fallback, normalizeYoastMetadata(data), "/")
    : fallback;
}
