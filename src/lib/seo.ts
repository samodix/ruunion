import "server-only";
import type { Metadata } from "next";
import { siteConfig } from "./config";
import { fetchLocalJson } from "./local-api";

const yoastApiUrl = process.env.YOAST_API_URL?.trim().replace(/\/$/, "");

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
    alternates: json.canonical ? { canonical: json.canonical } : undefined,
    robots: json.robots
      ? {
          index: json.robots.index !== "noindex",
          follow: json.robots.follow !== "nofollow",
        }
      : undefined,
    openGraph: {
      title: json.og_title || json.title,
      description: json.og_description || json.description,
      url: json.og_url || json.canonical,
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

export async function buildMetadataFromYoastOrFallback(
  url: string,
  fallback: Metadata,
): Promise<Metadata> {
  const data = await getYoastMetadataByUrl(url);
  if (!data?.json) return fallback;
  const yoast = normalizeYoastMetadata(data);

  return {
    ...fallback,
    ...yoast,
    alternates: { ...fallback.alternates, ...yoast.alternates },
    openGraph: { ...fallback.openGraph, ...yoast.openGraph },
    twitter: { ...fallback.twitter, ...yoast.twitter },
  };
}
