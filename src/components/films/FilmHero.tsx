import {
  ArrowRight,
  CalendarDays,
  Clapperboard,
  PlayCircle,
} from "lucide-react";
import type { Film } from "@/types/film";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";

export function FilmHero({ film }: { film: Film }) {
  return (
    <div className="grid items-center gap-14 lg:grid-cols-[1.05fr_.95fr]">
      <div>
        <Badge>
          {film.status.replaceAll("-", " ")} · {film.year}
        </Badge>
        <p className="text-ru-primary mt-8 text-sm font-black tracking-[.2em] uppercase">
          Une production RU Union
        </p>
        <h1 className="mt-4 text-5xl leading-[.95] font-black tracking-[-.055em] text-white sm:text-7xl">
          {film.title}
        </h1>
        <p className="mt-7 max-w-2xl text-lg leading-8 text-white/72">
          {film.longDescription}
        </p>
        <div className="mt-8 flex flex-wrap gap-5 text-sm text-white/65">
          <span className="flex items-center gap-2">
            <CalendarDays className="text-ru-primary" size={18} /> {film.year}
          </span>
          <span className="flex items-center gap-2">
            <Clapperboard className="text-ru-yellow" size={18} /> Projet
            solidaire
          </span>
        </div>
        <Button className="mt-9" href="/boutique">
          Soutenir ce film <ArrowRight className="ml-2" size={18} />
        </Button>
      </div>
      <div className="from-ru-primary/50 to-ru-yellow/35 relative grid min-h-[470px] place-items-center overflow-hidden rounded-[3rem] bg-gradient-to-br via-[#273033] shadow-2xl">
        <div className="absolute inset-6 rounded-[2.4rem] border border-white/15" />
        <div className="absolute top-9 right-10 flex gap-3">
          {[1, 2, 3, 4].map((dot) => (
            <span key={dot} className="size-2 rounded-full bg-white/30" />
          ))}
        </div>
        <div className="relative rounded-[2rem] border border-white/20 bg-black/20 px-8 py-7 text-center text-white shadow-2xl backdrop-blur-sm">
          <PlayCircle className="text-ru-yellow mx-auto" size={58} />
          <p className="mt-4 text-sm font-extrabold">
            {film.trailerUrl
              ? "Voir la bande-annonce"
              : "Bande-annonce prochainement"}
          </p>
        </div>
      </div>
    </div>
  );
}
