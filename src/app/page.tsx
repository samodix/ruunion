import { FeaturedFilmsSection } from "@/components/home/FeaturedFilmsSection";
import { HeroSection } from "@/components/home/HeroSection";
import { MissionSection } from "@/components/home/MissionSection";
import { SupportSection } from "@/components/home/SupportSection";
import { ValuesSection } from "@/components/home/ValuesSection";

export default function Home() {
  return (
    <>
      <HeroSection />
      <MissionSection />
      <FeaturedFilmsSection />
      <ValuesSection />
      <SupportSection />
    </>
  );
}
