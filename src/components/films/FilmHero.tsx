import { PlayCircle } from "lucide-react";
import type { Film } from "@/types/film";
import { Badge } from "@/components/ui/Badge";

export function FilmHero({ film }: { film: Film }) {
  return (
    <div className="grid items-center gap-12 lg:grid-cols-2">
      <div>
        <Badge>
          {film.status.replaceAll("-", " ")} · {film.year}
        </Badge>
        <h1 className="mt-6 text-5xl font-black tracking-[-.05em] sm:text-7xl">
          {film.title}
        </h1>
        <p className="text-ru-muted mt-6 text-lg leading-8">
          {film.longDescription}
        </p>
      </div>
      <div className="from-ru-primary/40 via-ru-soft to-ru-yellow/35 grid min-h-96 place-items-center rounded-[3rem] bg-gradient-to-br shadow-2xl">
        <div className="rounded-3xl bg-white/90 px-7 py-6 text-center shadow-xl">
          <PlayCircle className="text-ru-primary-dark mx-auto" size={48} />
          <p className="mt-3 text-sm font-extrabold">
            {film.trailerUrl
              ? "Voir la bande-annonce"
              : "Bande-annonce prochainement"}
          </p>
        </div>
      </div>
    </div>
  );
}
