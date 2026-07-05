import type { Metadata } from "next";
import { Container } from "@/components/layout/Container";
import { createMetadata } from "@/lib/seo";

export const metadata: Metadata = createMetadata(
  "Politique de confidentialité",
  "Politique de confidentialité de RU Union.",
  "/politique-confidentialite",
);

export default function ConfidentialitePage() {
  return (
    <section className="py-20">
      <Container className="max-w-3xl">
        <h1 className="text-4xl font-black">Politique de confidentialité</h1>
        <div className="text-ru-muted mt-8 space-y-7 leading-8">
          <p>
            Le socle actuel n’envoie aucune donnée à WordPress, WooCommerce,
            Stripe ou PayPal. Les formulaires restent des démonstrations
            locales.
          </p>
          <section>
            <h2 className="text-ru-ink text-xl font-black">
              Données collectées
            </h2>
            <p>
              Aucune donnée n’est enregistrée par cette version. La politique
              définitive sera précisée lors du lot Formulaires & emails.
            </p>
          </section>
          <section>
            <h2 className="text-ru-ink text-xl font-black">Vos droits</h2>
            <p>
              Les modalités d’exercice des droits RGPD seront ajoutées avant la
              mise en ligne finale.
            </p>
          </section>
        </div>
      </Container>
    </section>
  );
}
