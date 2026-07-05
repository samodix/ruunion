import { Eye, HeartHandshake, Lightbulb } from "lucide-react";
import { Container } from "@/components/layout/Container";

const values = [
  {
    icon: HeartHandshake,
    title: "Humanité",
    text: "La dignité et l’écoute guident chaque décision.",
  },
  {
    icon: Eye,
    title: "Clarté",
    text: "Les objectifs, les moyens et l’impact sont partagés simplement.",
  },
  {
    icon: Lightbulb,
    title: "Créativité utile",
    text: "L’imaginaire devient un levier d’attention et d’action.",
  },
];

export function ValuesSection() {
  return (
    <section className="border-ru-border border-y bg-white py-14">
      <Container className="grid gap-8 md:grid-cols-3">
        {values.map(({ icon: Icon, title, text }) => (
          <div key={title} className="flex gap-4">
            <span className="bg-ru-yellow/20 text-ru-ink grid size-12 shrink-0 place-items-center rounded-2xl">
              <Icon size={23} />
            </span>
            <div>
              <h3 className="font-black">{title}</h3>
              <p className="text-ru-muted mt-1 text-sm leading-6">{text}</p>
            </div>
          </div>
        ))}
      </Container>
    </section>
  );
}
