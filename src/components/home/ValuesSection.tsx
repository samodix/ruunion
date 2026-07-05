import { HandHeart, Heart, Radio, Sparkles } from "lucide-react";
import { Container } from "@/components/layout/Container";

const values = [
  {
    icon: Heart,
    title: "Humanité",
    text: "Accueillir chaque histoire avec dignité, écoute et délicatesse.",
  },
  {
    icon: HandHeart,
    title: "Solidarité",
    text: "Faire de chaque soutien une force partagée et concrète.",
  },
  {
    icon: Radio,
    title: "Transmission",
    text: "Faire circuler les récits pour ouvrir de nouveaux regards.",
  },
  {
    icon: Sparkles,
    title: "Engagement",
    text: "Relier l’intention artistique à une action réellement utile.",
  },
];

export function ValuesSection() {
  return (
    <section className="bg-ru-cream py-24 sm:py-32">
      <Container>
        <div className="max-w-3xl">
          <p className="text-ru-primary-dark text-sm font-black tracking-[.2em] uppercase">
            Notre boussole
          </p>
          <h2 className="mt-5 text-4xl font-black tracking-[-.045em] sm:text-6xl">
            Ce qui guide RU Union
          </h2>
        </div>
        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {values.map(({ icon: Icon, title, text }, index) => (
            <article
              key={title}
              className="border-ru-border group relative overflow-hidden rounded-[2rem] border bg-white p-7 transition duration-300 hover:-translate-y-1 hover:shadow-[0_22px_65px_rgba(14,154,139,.11)]"
            >
              <span className="text-ru-border absolute -top-4 right-3 text-7xl font-black">
                {index + 1}
              </span>
              <span className="bg-ru-yellow/18 text-ru-ink relative grid size-13 place-items-center rounded-2xl transition group-hover:scale-105 group-hover:rotate-3">
                <Icon size={24} />
              </span>
              <h3 className="relative mt-7 text-xl font-black">{title}</h3>
              <p className="text-ru-muted relative mt-3 text-sm leading-6">
                {text}
              </p>
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
}
