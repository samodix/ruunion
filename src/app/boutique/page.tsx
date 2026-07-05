import type { Metadata } from "next";
import { Container } from "@/components/layout/Container";
import { SupportPackCard } from "@/components/shop/SupportPackCard";
import { DataSourceNotice } from "@/components/ui/DataSourceNotice";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { buildMetadataFromYoastOrFallback, createMetadata } from "@/lib/seo";
import { getWooSupportPacksWithSource } from "@/lib/woocommerce";

export const dynamic = "force-dynamic";

export async function generateMetadata(): Promise<Metadata> {
  const wordpressBaseUrl =
    process.env.WORDPRESS_BASE_URL?.trim() || "http://localhost/ruunion";
  return buildMetadataFromYoastOrFallback(
    `${wordpressBaseUrl}/boutique/`,
    createMetadata(
      "Boutique solidaire",
      "Les packs de soutien RU Union.",
      "/boutique",
    ),
  );
}

export default async function BoutiquePage() {
  const result = await getWooSupportPacksWithSource();
  const packs = result.packs.sort(
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
        <DataSourceNotice
          source={result.source}
          successLabel="Produits synchronisés depuis WooCommerce local."
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
