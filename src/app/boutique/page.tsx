import type { Metadata } from "next";
import { Container } from "@/components/layout/Container";
import { SupportPackCard } from "@/components/shop/SupportPackCard";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { supportPacks } from "@/data/support-packs";
import { createMetadata } from "@/lib/seo";

export const metadata: Metadata = createMetadata(
  "Boutique solidaire",
  "Les packs de soutien RU Union.",
  "/boutique",
);

export default function BoutiquePage() {
  return (
    <section className="py-20">
      <Container>
        <SectionTitle
          eyebrow="Boutique solidaire"
          title="Choisir sa manière de soutenir"
          description="Les packs sont présentés à titre de démonstration. Aucun paiement réel n’est actif dans cette version."
        />
        <div className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {supportPacks.map((pack) => (
            <SupportPackCard key={pack.id} pack={pack} />
          ))}
        </div>
      </Container>
    </section>
  );
}
