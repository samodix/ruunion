import { Clapperboard, HandHeart, Link2, Quote } from "lucide-react";
import { Container } from "@/components/layout/Container";

const missions = [
  {
    icon: Clapperboard,
    title: "Raconter",
    text: "Donner une voix aux parcours humains.",
  },
  {
    icon: Link2,
    title: "Relier",
    text: "Créer un lien entre les spectateurs, les familles, les aidants et les partenaires.",
  },
  {
    icon: HandHeart,
    title: "Soutenir",
    text: "Transformer chaque contribution en action utile.",
  },
];

export function MissionSection() {
  return (
    <section className="bg-ru-cream relative overflow-hidden py-24 sm:py-32">
      <Container>
        <div className="grid gap-12 lg:grid-cols-[.8fr_1.2fr] lg:gap-20">
          <div>
            <p className="text-ru-primary-dark text-sm font-black tracking-[.2em] uppercase">
              Notre mouvement
            </p>
            <h2 className="mt-5 text-4xl leading-[1.02] font-black tracking-[-.045em] sm:text-6xl">
              Une histoire peut devenir un élan
            </h2>
          </div>
          <div className="border-ru-border relative border-l pl-8 sm:pl-12">
            <Quote
              className="text-ru-yellow bg-ru-cream absolute -top-2 -left-5 p-2"
              size={42}
              aria-hidden="true"
            />
            <p className="text-ru-muted text-xl leading-9 sm:text-2xl sm:leading-10">
              Derrière chaque projet RU Union, il y a une rencontre, une
              fragilité, une force et une envie de transmettre. Le cinéma permet
              de rendre visibles ces histoires et de transformer l’émotion en
              soutien concret.
            </p>
          </div>
        </div>

        <div className="relative mt-16 grid gap-5 md:grid-cols-3">
          <div className="from-ru-primary to-ru-yellow absolute top-12 right-[16%] left-[16%] hidden h-px bg-gradient-to-r md:block" />
          {missions.map(({ icon: Icon, title, text }, index) => (
            <article
              key={title}
              className="border-ru-border group relative rounded-[2rem] border bg-white p-7 shadow-[0_16px_50px_rgba(51,54,58,.05)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_24px_70px_rgba(14,154,139,.1)] sm:p-8"
            >
              <div className="relative flex items-center justify-between">
                <span className="bg-ru-primary-dark text-ru-cream shadow-ru-primary/15 grid size-14 place-items-center rounded-2xl shadow-lg">
                  <Icon size={25} />
                </span>
                <span className="text-ru-border text-5xl font-black">
                  0{index + 1}
                </span>
              </div>
              <h3 className="mt-7 text-2xl font-black">{title}</h3>
              <p className="text-ru-muted mt-3 leading-7">{text}</p>
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
}
