import type { Metadata } from "next";
import { Container } from "@/components/layout/Container";
import { buildMetadataFromWordPressPage, createMetadata } from "@/lib/seo";

export async function generateMetadata(): Promise<Metadata> {
  return buildMetadataFromWordPressPage(
    "/politique-confidentialite",
    createMetadata(
      "Politique de confidentialité",
      "Politique de confidentialité de RU Union.",
      "/politique-confidentialite",
    ),
  );
}

export default function ConfidentialitePage() {
  return (
    <section className="py-24">
      <Container className="max-w-3xl">
        <h1 className="text-4xl font-black">Politique de confidentialité</h1>
        <div className="text-ru-muted mt-8 space-y-7 leading-8">
          <p>
            RU Union limite la collecte aux informations nécessaires pour
            répondre aux messages et accompagner les soutiens. Aucun paiement
            réel n’est actif dans cette version locale.
          </p>
          <section>
            <h2 className="text-ru-ink text-xl font-black">
              Données collectées
            </h2>
            <p>
              Le formulaire est une démonstration et n’enregistre actuellement
              aucune donnée. La politique définitive sera précisée avant la mise
              en production.
            </p>
          </section>
          <section>
            <h2 className="text-ru-ink text-xl font-black">Vos droits</h2>
            <p>
              Pour toute question relative à vos données, écrivez à
              contact@ruunion.com.
            </p>
          </section>
        </div>
      </Container>
    </section>
  );
}
