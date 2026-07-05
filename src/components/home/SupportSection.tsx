import { ArrowRight, Sparkles } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { Button } from "@/components/ui/Button";

export function SupportSection() {
  return (
    <section className="py-24">
      <Container>
        <div className="bg-ru-primary-dark relative overflow-hidden rounded-[2.5rem] px-7 py-14 text-white sm:px-14">
          <div className="bg-ru-yellow/25 absolute -top-20 -right-12 size-72 rounded-full" />
          <Sparkles className="text-ru-yellow relative" size={34} />
          <h2 className="relative mt-5 max-w-2xl text-4xl font-black tracking-tight sm:text-5xl">
            Un geste peut faire naître un film.
          </h2>
          <p className="relative mt-5 max-w-2xl text-lg leading-8 text-white/80">
            Choisissez un pack de soutien et rejoignez celles et ceux qui
            rendent ces histoires possibles. Les paiements seront activés lors
            d’un prochain lot.
          </p>
          <Button className="relative mt-8" href="/boutique" variant="dark">
            Voir les packs <ArrowRight className="ml-2" size={18} />
          </Button>
        </div>
      </Container>
    </section>
  );
}
