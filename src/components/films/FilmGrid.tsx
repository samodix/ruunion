import type { Film } from "@/types/film";
import { cn } from "@/lib/utils";
import { FilmCard } from "./FilmCard";

export function FilmGrid({
  films,
  className,
}: {
  films: Film[];
  className?: string;
}) {
  return (
    <div className={cn("grid gap-7 md:grid-cols-2 xl:grid-cols-3", className)}>
      {films.map((film) => (
        <FilmCard key={film.slug} film={film} />
      ))}
    </div>
  );
}
