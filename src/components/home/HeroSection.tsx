import { ArrowRight, Heart, Play } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";

export function HeroSection() {
  return (
    <section className="bg-ru-soft relative overflow-hidden py-16 sm:py-24">
      <div className="bg-ru-primary/15 absolute top-10 -left-20 size-80 rounded-full blur-3xl" />
      <div className="bg-ru-yellow/20 absolute top-0 -right-20 size-72 rounded-full blur-3xl" />
      <Container className="relative grid items-center gap-14 lg:grid-cols-[1.05fr_.95fr]">
        <div>
          <Badge>Des histoires qui rapprochent</Badge>
          <h1 className="mt-7 max-w-3xl text-5xl leading-[.96] font-black tracking-[-0.055em] sm:text-7xl">
            Créer des films.
            <br />
            <span className="text-ru-primary-dark">Réveiller les liens.</span>
          </h1>
          <p className="text-ru-muted mt-7 max-w-xl text-lg leading-8">
            RU Union fait du cinéma un espace de rencontre, de solidarité et
            d’action. Chaque projet réunit des artistes, des citoyens et des
            partenaires autour d’une même envie : prendre soin du lien humain.
          </p>
          <div className="mt-9 flex flex-wrap gap-4">
            <Button href="/films">
              Découvrir les films <ArrowRight className="ml-2" size={18} />
            </Button>
            <Button href="/association" variant="secondary">
              Notre mission
            </Button>
          </div>
        </div>
        <div className="border-ru-border relative min-h-[470px] overflow-hidden rounded-[3rem] border bg-white p-7 shadow-[0_30px_90px_rgba(14,154,139,.14)]">
          <div className="from-ru-primary/30 via-ru-soft to-ru-yellow/30 absolute inset-8 rounded-[2.5rem] bg-gradient-to-br" />
          <div className="text-ru-primary-dark absolute top-1/2 left-1/2 grid size-32 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-[2.5rem] bg-white shadow-2xl">
            <Heart fill="currentColor" size={54} />
          </div>
          <div className="absolute top-14 left-10 rounded-2xl bg-white px-5 py-4 shadow-xl">
            <strong className="text-ru-primary-dark block">Récits</strong>
            <span className="text-ru-muted text-xs">Donner une voix</span>
          </div>
          <div className="absolute bottom-14 left-12 rounded-2xl bg-white px-5 py-4 shadow-xl">
            <strong className="text-ru-primary-dark block">Solidarité</strong>
            <span className="text-ru-muted text-xs">Agir ensemble</span>
          </div>
          <div className="bg-ru-ink absolute right-8 bottom-20 rounded-2xl px-5 py-4 text-white shadow-xl">
            <span className="flex items-center gap-2 text-sm font-bold">
              <Play size={16} fill="currentColor" /> Voir notre vision
            </span>
          </div>
        </div>
      </Container>
    </section>
  );
}
