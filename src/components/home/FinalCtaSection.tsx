import { ArrowRight, Film } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { Button } from "@/components/ui/Button";

export function FinalCtaSection() {
  return (
    <section className="bg-ru-soft px-4 py-20 sm:px-6 sm:py-28">
      <Container className="bg-ru-ink relative isolate overflow-hidden rounded-[2.5rem] px-6 py-16 text-center text-white shadow-[0_35px_100px_rgba(51,54,58,.18)] sm:px-12 sm:py-24">
        <div className="bg-ru-primary/25 absolute -top-32 -left-20 -z-10 size-80 rounded-full blur-3xl" />
        <div className="bg-ru-yellow/20 absolute -right-20 -bottom-36 -z-10 size-96 rounded-full blur-3xl" />
        <Film className="text-ru-yellow mx-auto" size={36} aria-hidden="true" />
        <h2 className="mx-auto mt-6 max-w-4xl text-4xl leading-[1.02] font-black tracking-[-.045em] sm:text-6xl">
          Une histoire peut commencer par un geste
        </h2>
        <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-white/70">
          Soutenir RU Union, c’est participer à des récits qui rassemblent,
          éclairent et donnent de la force.
        </p>
        <div className="mt-10 flex flex-col justify-center gap-4 sm:flex-row">
          <Button href="/films">
            Voir les films <ArrowRight className="ml-2" size={18} />
          </Button>
          <Button
            href="/boutique"
            variant="dark"
            className="border border-white/20"
          >
            Découvrir les packs
          </Button>
        </div>
      </Container>
    </section>
  );
}
