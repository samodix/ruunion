import {
  ArrowRight,
  Clapperboard,
  Heart,
  Play,
  Sparkles,
  Users,
} from "lucide-react";
import type { Film } from "@/types/film";
import { Container } from "@/components/layout/Container";
import { Button } from "@/components/ui/Button";
import { formatCurrency } from "@/lib/utils";

export function HeroSection({
  films,
  packCount,
}: {
  films: Film[];
  packCount: number;
}) {
  const priorityFilm = films[0];
  const goal = priorityFilm?.donationGoal ?? 0;
  const collected = priorityFilm?.donationCollected ?? 0;
  const progress =
    goal > 0 ? Math.min(100, Math.round((collected / goal) * 100)) : 0;
  const stats = [
    { value: String(films.length).padStart(2, "0"), label: "Films solidaires" },
    { value: String(packCount).padStart(2, "0"), label: "Packs de soutien" },
    {
      value: goal ? formatCurrency(goal) : "80 k€",
      label: "Objectif de collecte",
    },
    { value: "01", label: "Communauté engagée" },
  ];

  return (
    <section className="from-ru-cream via-ru-soft to-ru-yellow/10 relative isolate flex min-h-[calc(90svh-5rem)] items-center overflow-hidden bg-gradient-to-br py-16 sm:py-20 lg:py-24">
      <div className="bg-ru-primary/20 absolute -top-40 -left-32 -z-10 size-[34rem] rounded-full blur-[100px]" />
      <div className="bg-ru-yellow/25 absolute right-[-12rem] bottom-[-16rem] -z-10 size-[40rem] rounded-full blur-[120px]" />
      <div className="ru-grid-pattern absolute inset-0 -z-10 [mask-image:linear-gradient(to_bottom,black,transparent_85%)] opacity-45" />

      <Container className="grid items-center gap-14 lg:grid-cols-[1.05fr_.95fr] xl:gap-20">
        <div className="text-center lg:text-left">
          <div className="border-ru-border text-ru-primary-dark inline-flex items-center gap-2 rounded-full border bg-white/80 px-4 py-2 text-xs font-black tracking-[.14em] uppercase shadow-sm backdrop-blur">
            <Sparkles size={15} aria-hidden="true" />
            Films solidaires · Projets humains
          </div>
          <h1 className="mt-7 text-5xl leading-[.96] font-black tracking-[-.06em] sm:text-7xl lg:text-[5.45rem]">
            Des films pour raconter,{" "}
            <span className="text-ru-primary-dark block">
              relier et soutenir
            </span>
          </h1>
          <p className="text-ru-muted mx-auto mt-7 max-w-2xl text-lg leading-8 sm:text-xl lg:mx-0">
            RU Union transforme les histoires humaines en projets
            cinématographiques porteurs de sens. Chaque film devient une
            passerelle entre émotion, solidarité et action concrète.
          </p>
          <div className="mt-9 flex flex-col justify-center gap-4 sm:flex-row lg:justify-start">
            <Button href="/films">
              Découvrir les films <ArrowRight className="ml-2" size={18} />
            </Button>
            <Button href="/boutique" variant="secondary">
              Soutenir RU Union <Heart className="ml-2" size={18} />
            </Button>
          </div>
          <div className="border-ru-border mt-12 grid grid-cols-2 gap-px overflow-hidden rounded-3xl border bg-white/75 shadow-[0_18px_60px_rgba(51,54,58,.07)] backdrop-blur sm:grid-cols-4">
            {stats.map((stat) => (
              <div
                key={stat.label}
                className="border-ru-border/70 p-4 sm:border-r sm:p-5 last:sm:border-r-0"
              >
                <strong className="block text-xl tracking-[-.04em] sm:text-2xl">
                  {stat.value}
                </strong>
                <span className="text-ru-muted mt-1 block text-[11px] leading-4 font-bold uppercase">
                  {stat.label}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="relative mx-auto w-full max-w-[35rem] pb-12 sm:px-8 lg:px-0">
          <div
            className="bg-ru-ink relative min-h-[31rem] overflow-hidden rounded-[2.75rem] bg-cover bg-center shadow-[0_45px_110px_rgba(51,54,58,.25)] sm:min-h-[38rem]"
            style={
              priorityFilm?.poster
                ? { backgroundImage: `url(${priorityFilm.poster})` }
                : undefined
            }
          >
            <div className="from-ru-primary/70 via-ru-ink/35 to-ru-ink absolute inset-0 bg-gradient-to-br" />
            <div className="absolute inset-5 rounded-[2.2rem] border border-white/15" />
            <div className="absolute inset-x-8 top-8 flex items-center justify-between">
              <span className="bg-ru-yellow text-ru-ink rounded-full px-4 py-2 text-xs font-black uppercase shadow-lg">
                En production
              </span>
              <span className="grid size-12 place-items-center rounded-full border border-white/20 bg-white/10 text-white backdrop-blur">
                <Play className="ml-0.5" size={20} fill="currentColor" />
              </span>
            </div>
            {!priorityFilm?.poster && (
              <div className="absolute inset-0 grid place-items-center">
                <div className="relative grid size-56 place-items-center rounded-full border border-white/15 bg-white/5 sm:size-64">
                  <div className="bg-ru-yellow/25 absolute inset-8 rounded-full blur-2xl" />
                  <Clapperboard
                    className="relative text-white/90"
                    size={76}
                    strokeWidth={1.3}
                  />
                </div>
              </div>
            )}
            <div className="absolute inset-x-8 bottom-9 text-white">
              <p className="text-ru-primary text-xs font-black tracking-[.2em] uppercase">
                Film en lumière
              </p>
              <h2 className="mt-3 text-3xl font-black tracking-[-.04em] sm:text-4xl">
                {priorityFilm?.title ?? "Parce que c’est toi"}
              </h2>
              <p className="mt-3 max-w-sm text-sm leading-6 text-white/70">
                {priorityFilm?.shortDescription ??
                  "Un récit intime sur les liens qui nous relèvent."}
              </p>
            </div>
          </div>

          <div className="border-ru-border absolute right-0 bottom-0 left-4 rounded-3xl border bg-white p-5 shadow-[0_24px_70px_rgba(51,54,58,.17)] sm:right-2 sm:left-auto sm:w-[21rem]">
            <div className="flex items-center justify-between gap-4">
              <span className="flex items-center gap-2 text-sm font-black">
                <Users className="text-ru-primary-dark" size={19} /> Collecte
                active
              </span>
              <strong className="text-ru-primary-dark">{progress} %</strong>
            </div>
            <div className="bg-ru-border mt-4 h-2.5 overflow-hidden rounded-full">
              <div
                className="from-ru-primary-dark to-ru-yellow h-full rounded-full bg-gradient-to-r"
                style={{ width: `${progress}%` }}
              />
            </div>
            <div className="text-ru-muted mt-3 flex justify-between text-xs">
              <span>{formatCurrency(collected)} réunis</span>
              <span>{formatCurrency(goal)} visés</span>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
