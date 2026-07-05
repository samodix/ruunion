import type { Metadata } from "next";
import { Container } from "@/components/layout/Container";
import { createMetadata } from "@/lib/seo";

export const metadata: Metadata = createMetadata(
  "Mentions légales",
  "Mentions légales de RU Union.",
  "/mentions-legales",
);

export default function MentionsLegalesPage() {
  return (
    <section className="py-20">
      <Container className="max-w-3xl">
        <h1 className="text-4xl font-black">Mentions légales</h1>
        <div className="text-ru-muted mt-8 space-y-7 leading-8">
          <p>
            Cette page constitue un modèle à compléter avant la mise en
            production avec l’identité juridique, l’adresse du siège, le numéro
            RNA/SIREN et les coordonnées de l’hébergeur.
          </p>
          <section>
            <h2 className="text-ru-ink text-xl font-black">Éditeur</h2>
            <p>RU Union — Association à compléter.</p>
          </section>
          <section>
            <h2 className="text-ru-ink text-xl font-black">Responsabilité</h2>
            <p>
              Les contenus mock de cette version servent uniquement à valider
              l’architecture et le design.
            </p>
          </section>
        </div>
      </Container>
    </section>
  );
}
