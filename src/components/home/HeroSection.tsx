import { ArrowRight, Clapperboard, Heart, Play, Sparkles } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";

export function HeroSection() {
  return (
    <section className="bg-ru-ink relative isolate overflow-hidden py-20 text-white sm:py-28 lg:min-h-[760px] lg:py-32">
      <div className="bg-ru-primary/20 absolute top-[-12rem] left-[-10rem] -z-10 size-[34rem] rounded-full blur-[110px]" />
      <div className="bg-ru-yellow/15 absolute right-[-10rem] bottom-[-15rem] -z-10 size-[38rem] rounded-full blur-[120px]" />
      <div className="ru-cinematic-lines absolute inset-0 -z-10 opacity-30" />
      <Container className="grid items-center gap-16 lg:grid-cols-[1.05fr_.95fr]">
        <div>
          <Badge>Films solidaires · Histoires humaines</Badge>
          <h1 className="mt-8 max-w-4xl text-5xl leading-[.94] font-black tracking-[-0.06em] sm:text-7xl lg:text-[5.5rem]">
            Des films pour
            <span className="text-ru-primary block"> raconter, relier</span> et
            soutenir.
          </h1>
          <p className="mt-8 max-w-2xl text-lg leading-8 text-white/72 sm:text-xl">
            RU Union transforme chaque récit en passerelle entre une émotion,
            une rencontre et une action concrète. Le cinéma devient un élan
            collectif, au service de celles et ceux qui en ont besoin.
          </p>
          <div className="mt-10 flex flex-wrap gap-4">
            <Button href="/films">
              Découvrir les films <ArrowRight className="ml-2" size={18} />
            </Button>
            <Button href="/boutique" variant="dark">
              Soutenir le projet <Heart className="ml-2" size={18} />
            </Button>
          </div>
          <div className="mt-12 flex flex-wrap gap-x-10 gap-y-4 border-t border-white/10 pt-7 text-sm text-white/60">
            <span>Récits ancrés dans le réel</span>
            <span>Collectes transparentes</span>
            <span>Actions humaines</span>
          </div>
        </div>

        <div className="relative mx-auto w-full max-w-xl">
          <div className="border-ru-primary/25 relative min-h-[520px] overflow-hidden rounded-[3rem] border bg-gradient-to-br from-[#3f4448] via-[#25282b] to-[#151719] p-8 shadow-[0_40px_120px_rgba(0,0,0,.38)]">
            <div className="absolute inset-x-0 top-0 flex h-10 items-center gap-4 border-b border-white/10 px-6">
              {[1, 2, 3, 4, 5, 6].map((dot) => (
                <span key={dot} className="size-2 rounded-full bg-white/20" />
              ))}
            </div>
            <div className="from-ru-primary/35 to-ru-yellow/25 absolute inset-12 top-20 rounded-[2.5rem] bg-gradient-to-br" />
            <div className="absolute inset-0 grid place-items-center">
              <div className="relative grid size-64 place-items-center rounded-full border border-white/15 bg-black/15 shadow-inner">
                <div className="bg-ru-primary/25 absolute inset-7 rounded-full blur-xl" />
                <Play
                  className="relative ml-2 text-white"
                  fill="currentColor"
                  size={72}
                />
              </div>
            </div>
            <div className="absolute top-20 left-7 rounded-2xl border border-white/10 bg-white/10 px-5 py-4 backdrop-blur-md">
              <Clapperboard className="text-ru-yellow" size={25} />
              <strong className="mt-2 block">Créer</strong>
              <span className="text-xs text-white/60">Donner une voix</span>
            </div>
            <div className="absolute right-7 bottom-16 rounded-2xl border border-white/10 bg-white/10 px-5 py-4 backdrop-blur-md">
              <Sparkles className="text-ru-primary" size={25} />
              <strong className="mt-2 block">Relier</strong>
              <span className="text-xs text-white/60">Faire œuvre commune</span>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
