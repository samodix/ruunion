import type { Metadata } from "next";
import { siteConfig } from "./config";

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
