import type { Metadata } from "next";
import { Container } from "@/components/layout/Container";
import { buildMetadataFromWordPressPage, createMetadata } from "@/lib/seo";

export async function generateMetadata(): Promise<Metadata> {
  return buildMetadataFromWordPressPage(
    "/mentions-legales",
    createMetadata(
      "Mentions légales",
      "Mentions légales de RU Union.",
      "/mentions-legales",
    ),
  );
}

export default function MentionsLegalesPage() {
  return (
    <section className="py-24">
      <Container className="max-w-3xl">
        <h1 className="text-4xl font-black">Mentions légales</h1>
        <div className="text-ru-muted mt-8 space-y-7 leading-8">
          <p>
            Cette page sera complétée avant la mise en production avec
            l’identité juridique, l’adresse du siège et les coordonnées de
            l’hébergeur.
          </p>
          <section>
            <h2 className="text-ru-ink text-xl font-black">Éditeur</h2>
            <p>RU Union — contact@ruunion.com</p>
          </section>
          <section>
            <h2 className="text-ru-ink text-xl font-black">Contenus</h2>
            <p>
              Les contenus de démonstration servent à valider l’architecture,
              l’expérience et la future stratégie de publication.
            </p>
          </section>
        </div>
      </Container>
    </section>
  );
}
