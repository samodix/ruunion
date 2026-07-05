import { FeaturedFilmsSection } from "@/components/home/FeaturedFilmsSection";
import { HeroSection } from "@/components/home/HeroSection";
import { MissionSection } from "@/components/home/MissionSection";
import { SupportSection } from "@/components/home/SupportSection";
import { ValuesSection } from "@/components/home/ValuesSection";
import { getWordPressFilms } from "@/lib/wordpress";

export const dynamic = "force-dynamic";

export default async function Home() {
  const films = (await getWordPressFilms())
    .filter(
      (film) =>
        film.publicVisibility && film.homepageVisibility && film.isFeatured,
    )
    .sort((a, b) => a.priorityOrder - b.priorityOrder)
    .slice(0, 3);
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
