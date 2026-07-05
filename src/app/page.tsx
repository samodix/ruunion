import type { Metadata } from "next";
import { FeaturedFilmsSection } from "@/components/home/FeaturedFilmsSection";
import { HeroSection } from "@/components/home/HeroSection";
import { MissionSection } from "@/components/home/MissionSection";
import { SupportSection } from "@/components/home/SupportSection";
import { ValuesSection } from "@/components/home/ValuesSection";
import { buildMetadataFromYoastOrFallback, createMetadata } from "@/lib/seo";
import { getFeaturedWordPressFilms } from "@/lib/wordpress";

export const dynamic = "force-dynamic";

export async function generateMetadata(): Promise<Metadata> {
  const wordpressBaseUrl =
    process.env.WORDPRESS_BASE_URL?.trim() || "http://localhost/ruunion";
  return buildMetadataFromYoastOrFallback(
    `${wordpressBaseUrl}/`,
    createMetadata(
      "RU Union — L’union des plus humains",
      "Des récits, des rencontres et des actions concrètes pour faire grandir la solidarité.",
      "/",
    ),
  );
}

export default async function Home() {
  const films = await getFeaturedWordPressFilms();
  return (
    <>
      <HeroSection />
      <MissionSection />
      <FeaturedFilmsSection films={films} />
      <ValuesSection />
      <SupportSection />
    </>
  );
}
