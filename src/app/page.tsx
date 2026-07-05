import type { Metadata } from "next";
import { FeaturedFilmsSection } from "@/components/home/FeaturedFilmsSection";
import { FinalCtaSection } from "@/components/home/FinalCtaSection";
import { HeroSection } from "@/components/home/HeroSection";
import { MissionSection } from "@/components/home/MissionSection";
import { SupportSection } from "@/components/home/SupportSection";
import { ValuesSection } from "@/components/home/ValuesSection";
import { buildMetadataFromWordPressPage, createMetadata } from "@/lib/seo";
import { getFeaturedWordPressFilms } from "@/lib/wordpress";
import { getWooSupportPacks } from "@/lib/woocommerce";

export const dynamic = "force-dynamic";

export async function generateMetadata(): Promise<Metadata> {
  return buildMetadataFromWordPressPage(
    "/",
    createMetadata(
      "RU Union — L’union des plus humains",
      "Des récits, des rencontres et des actions concrètes pour faire grandir la solidarité.",
      "/",
    ),
  );
}

export default async function Home() {
  const [films, packs] = await Promise.all([
    getFeaturedWordPressFilms(),
    getWooSupportPacks(),
  ]);
  const sortedPacks = [...packs].sort(
    (a, b) =>
      Number(b.isHighlighted) - Number(a.isHighlighted) || a.price - b.price,
  );

  return (
    <>
      <HeroSection films={films} packCount={packs.length} />
      <MissionSection />
      <FeaturedFilmsSection films={films} />
      <SupportSection packs={sortedPacks.slice(0, 3)} />
      <ValuesSection />
      <FinalCtaSection />
    </>
  );
}
