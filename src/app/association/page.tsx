import type { Metadata } from "next";
import { HandHeart, Megaphone, Sparkles, Users } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { Card } from "@/components/ui/Card";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { createMetadata } from "@/lib/seo";

export const metadata: Metadata = createMetadata(
  "L’association",
  "Découvrez la mission et la méthode de RU Union.",
  "/association",
);

const actions = [
  {
    icon: Sparkles,
    title: "Créer",
    text: "Produire des récits qui donnent envie de regarder l’autre autrement.",
  },
  {
    icon: Users,
    title: "Relier",
    text: "Organiser des projections, ateliers et rencontres sur les territoires.",
  },
  {
    icon: Megaphone,
    title: "Amplifier",
    text: "Faire circuler les initiatives solidaires et les voix rarement entendues.",
  },
  {
    icon: HandHeart,
    title: "Accompagner",
    text: "Construire avec les personnes concernées, dans la durée et la confiance.",
  },
];

export default function AssociationPage() {
  return (
    <>
      <section className="bg-ru-soft py-20">
        <Container>
          <SectionTitle
            eyebrow="L’association"
            title="Faire œuvre commune"
            description="RU Union est une association culturelle qui utilise l’image, la création et la rencontre pour renforcer les liens humains."
          />
        </Container>
      </section>
      <section className="py-20">
        <Container className="grid gap-7 sm:grid-cols-2">
          {actions.map(({ icon: Icon, title, text }) => (
            <Card key={title}>
              <Icon className="text-ru-primary-dark" size={32} />
              <h2 className="mt-5 text-2xl font-black">{title}</h2>
              <p className="text-ru-muted mt-3 leading-7">{text}</p>
            </Card>
          ))}
        </Container>
      </section>
      <section className="bg-ru-primary-dark py-20 text-white">
        <Container className="grid gap-10 md:grid-cols-2">
          <h2 className="text-4xl font-black">
            Une méthode fondée sur l’écoute.
          </h2>
          <p className="text-lg leading-8 text-white/80">
            Chaque projet commence par un temps de terrain. Nous identifions les
            besoins, réunissons les partenaires et imaginons un format
            artistique qui respecte les récits comme les personnes.
          </p>
        </Container>
      </section>
    </>
  );
}
