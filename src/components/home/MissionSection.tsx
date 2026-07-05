import { Clapperboard, HandHeart, Users } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { Card } from "@/components/ui/Card";
import { SectionTitle } from "@/components/ui/SectionTitle";

const missions = [
  {
    icon: Clapperboard,
    title: "Raconter avec justesse",
    text: "Porter à l’écran des histoires sensibles, ancrées dans le réel et racontées avec les personnes concernées.",
  },
  {
    icon: Users,
    title: "Relier les regards",
    text: "Faire dialoguer les publics, les aidants, les artistes et les partenaires autour d’une expérience commune.",
  },
  {
    icon: HandHeart,
    title: "Transformer l’émotion",
    text: "Prolonger chaque film par une collecte, une rencontre ou une action qui produit un effet concret.",
  },
];

export function MissionSection() {
  return (
    <section className="py-28">
      <Container>
        <SectionTitle
          as="h2"
          eyebrow="Notre mouvement"
          title="Le cinéma peut devenir une forme de présence"
          description="Nous croyons aux récits qui ne s’arrêtent pas au générique : ils circulent, rapprochent et donnent envie d’agir."
        />
        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {missions.map(({ icon: Icon, title, text }, index) => (
            <Card
              key={title}
              className="group relative overflow-hidden p-8 transition duration-300 hover:-translate-y-1 hover:shadow-[0_24px_70px_rgba(14,154,139,.12)]"
            >
              <span className="text-ru-border absolute top-4 right-6 text-6xl font-black">
                0{index + 1}
              </span>
              <span className="bg-ru-primary/15 text-ru-primary-dark relative grid size-14 place-items-center rounded-2xl">
                <Icon size={27} />
              </span>
              <h3 className="relative mt-7 text-2xl font-black">{title}</h3>
              <p className="text-ru-muted relative mt-4 leading-7">{text}</p>
            </Card>
          ))}
        </div>
      </Container>
    </section>
  );
}
