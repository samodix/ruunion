import {
  ArrowRight,
  CalendarDays,
  Clapperboard,
  PlayCircle,
} from "lucide-react";
import type { Film } from "@/types/film";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";

const statusLabels = {
  "en-production": "En production",
  termine: "Terminé",
  "en-diffusion": "En diffusion",
  archive: "Archive",
} as const;

export function FilmHero({ film }: { film: Film }) {
  return (
    <div className="grid items-center gap-14 lg:grid-cols-[1fr_1fr] lg:gap-20">
      <div>
        <Badge>
          {statusLabels[film.status]} · {film.year}
        </Badge>
        <p className="text-ru-primary mt-8 text-sm font-black tracking-[.2em] uppercase">
          Une production RU Union
        </p>
        <h1 className="mt-4 text-5xl leading-[.93] font-black tracking-[-.06em] text-white sm:text-7xl lg:text-[5.3rem]">
          {film.title}
        </h1>
        <p className="mt-7 max-w-2xl text-lg leading-8 text-white/70">
          {film.longDescription}
        </p>
        <div className="mt-8 flex flex-wrap gap-5 text-sm text-white/60">
          <span className="flex items-center gap-2">
            <CalendarDays className="text-ru-primary" size={18} /> {film.year}
          </span>
          <span className="flex items-center gap-2">
            <Clapperboard className="text-ru-yellow" size={18} /> Projet
            cinématographique solidaire
          </span>
        </div>
        <Button className="mt-9" href="/boutique">
          Soutenir ce film <ArrowRight className="ml-2" size={18} />
        </Button>
      </div>
      <div
        className="from-ru-primary/65 to-ru-yellow/40 relative min-h-[31rem] overflow-hidden rounded-[2.75rem] bg-gradient-to-br via-[#273033] bg-cover bg-center shadow-[0_40px_100px_rgba(0,0,0,.28)] sm:min-h-[39rem]"
        style={
          film.poster ? { backgroundImage: `url(${film.poster})` } : undefined
        }
      >
        <div className="from-ru-ink via-ru-ink/10 absolute inset-0 bg-gradient-to-t to-transparent" />
        <div className="absolute inset-6 rounded-[2.2rem] border border-white/15" />
        {!film.poster && (
          <div className="absolute inset-0 grid place-items-center">
            <div className="grid size-52 place-items-center rounded-full border border-white/15 bg-black/15">
              <Clapperboard
                className="text-white/75"
                size={70}
                strokeWidth={1.3}
              />
            </div>
          </div>
        )}
        <div className="absolute inset-x-9 bottom-9 flex items-end justify-between gap-6 text-white">
          <div>
            <p className="text-ru-primary text-xs font-black tracking-[.18em] uppercase">
              Dans l’objectif
            </p>
            <p className="mt-2 text-xl font-black">
              Une histoire à faire vivre
            </p>
          </div>
          <div className="grid size-14 shrink-0 place-items-center rounded-full border border-white/20 bg-white/10 backdrop-blur">
            <PlayCircle className="text-ru-yellow" size={29} />
          </div>
        </div>
      </div>
    </div>
  );
}
