import type { Metadata } from "next";
import { HeartHandshake } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { SupportPackCard } from "@/components/shop/SupportPackCard";
import { DataSourceNotice } from "@/components/ui/DataSourceNotice";
import { buildMetadataFromWordPressPage, createMetadata } from "@/lib/seo";
import { getWooSupportPacksWithSource } from "@/lib/woocommerce";

export const dynamic = "force-dynamic";

export async function generateMetadata(): Promise<Metadata> {
  return buildMetadataFromWordPressPage(
    "/boutique",
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
    <>
      <section className="from-ru-soft via-ru-cream to-ru-yellow/10 bg-gradient-to-br py-24">
        <Container className="grid items-center gap-10 lg:grid-cols-[1fr_auto]">
          <div>
            <p className="text-ru-primary-dark text-sm font-black tracking-[.2em] uppercase">
              Boutique solidaire
            </p>
            <h1 className="mt-5 max-w-4xl text-5xl leading-[.96] font-black tracking-[-.055em] sm:text-7xl">
              Soutenir RU Union,
              <span className="text-ru-primary-dark block">
                à votre manière.
              </span>
            </h1>
            <p className="text-ru-muted mt-7 max-w-2xl text-lg leading-8">
              Chaque pack aide à faire avancer une histoire, une production et
              un engagement humain. Aucun paiement réel n’est actif pour le
              moment.
            </p>
          </div>
          <div className="bg-ru-primary-dark grid size-40 place-items-center rounded-[2.5rem] text-white shadow-[0_24px_70px_rgba(14,154,139,.24)]">
            <HeartHandshake size={66} />
          </div>
        </Container>
      </section>
      <section className="py-24">
        <Container>
          <DataSourceNotice
            source={result.source}
            successLabel="Produits synchronisés depuis WooCommerce local."
          />
          <div className="mt-10 grid gap-7 md:grid-cols-2 xl:grid-cols-3">
            {packs.map((pack) => (
              <SupportPackCard key={pack.id} pack={pack} />
            ))}
          </div>
        </Container>
      </section>
    </>
  );
}
