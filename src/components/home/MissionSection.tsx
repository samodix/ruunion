import { Clapperboard, HandHeart, Users } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { Card } from "@/components/ui/Card";
import { SectionTitle } from "@/components/ui/SectionTitle";

const missions = [
  {
    icon: Clapperboard,
    title: "Raconter",
    text: "Porter à l’écran des histoires sensibles, ancrées dans le réel et ouvertes à tous.",
  },
  {
    icon: Users,
    title: "Rassembler",
    text: "Faire dialoguer les générations, les territoires et les expériences autour d’un projet commun.",
  },
  {
    icon: HandHeart,
    title: "Agir",
    text: "Transformer chaque film en point de départ pour des rencontres et des actions concrètes.",
  },
];

export function MissionSection() {
  return (
    <section className="py-24">
      <Container>
        <SectionTitle
          as="h2"
          eyebrow="Notre mission"
          title="Le cinéma comme force de relation"
          description="Nous produisons des œuvres accessibles et exigeantes, pensées pour circuler et faire bouger les lignes."
        />
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {missions.map(({ icon: Icon, title, text }) => (
            <Card key={title}>
              <span className="bg-ru-primary/15 text-ru-primary-dark grid size-14 place-items-center rounded-2xl">
                <Icon size={27} />
              </span>
              <h3 className="mt-6 text-xl font-black">{title}</h3>
              <p className="text-ru-muted mt-3 leading-7">{text}</p>
            </Card>
          ))}
        </div>
      </Container>
    </section>
  );
}
