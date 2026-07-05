import type { Metadata } from "next";
import { Container } from "@/components/layout/Container";
import { SupportPackCard } from "@/components/shop/SupportPackCard";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { getSupportPacks } from "@/lib/admin-storage";
import { createMetadata } from "@/lib/seo";

export const metadata: Metadata = createMetadata(
  "Boutique solidaire",
  "Les packs de soutien RU Union.",
  "/boutique",
);
export const dynamic = "force-dynamic";

export default async function BoutiquePage() {
  const packs = (await getSupportPacks()).sort(
    (a, b) =>
      Number(b.isHighlighted) - Number(a.isHighlighted) || a.price - b.price,
  );
  return (
    <section className="py-20">
      <Container>
        <SectionTitle
          eyebrow="Boutique solidaire"
          title="Choisir sa manière de soutenir"
          description="Les packs sont présentés à titre de démonstration. Aucun paiement réel n’est actif dans cette version."
        />
        <div className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {packs.map((pack) => (
            <SupportPackCard key={pack.id} pack={pack} />
          ))}
        </div>
      </Container>
    </section>
  );
}
