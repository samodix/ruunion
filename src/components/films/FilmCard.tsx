import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { Film } from "@/types/film";
import { formatCurrency } from "@/lib/utils";

export function FilmCard({ film }: { film: Film }) {
  const progress = Math.min(
    100,
    Math.round((film.donationRaised / film.donationGoal) * 100),
  );
  return (
    <article className="group border-ru-border overflow-hidden rounded-[2rem] border bg-white shadow-[0_18px_60px_rgba(51,54,58,.07)]">
      <div className={`relative h-56 bg-gradient-to-br ${film.accent} p-6`}>
        <span className="text-ru-ink rounded-full bg-white/90 px-3 py-2 text-xs font-extrabold">
          {film.status}
        </span>
        <div className="text-ru-primary-dark absolute right-5 bottom-5 grid size-12 place-items-center rounded-full bg-white transition group-hover:rotate-12">
          <ArrowUpRight />
        </div>
      </div>
      <div className="p-6">
        <p className="text-ru-primary-dark text-xs font-bold tracking-[.16em] uppercase">
          {film.genre} · {film.year}
        </p>
        <h3 className="mt-3 text-2xl font-black">{film.title}</h3>
        <p className="text-ru-muted mt-3 leading-7">{film.shortDescription}</p>
        <div className="mt-6">
          <div className="flex justify-between text-xs font-bold">
            <span>{formatCurrency(film.donationRaised)} collectés</span>
            <span>{progress}%</span>
          </div>
          <div className="bg-ru-border mt-2 h-2 overflow-hidden rounded-full">
            <div
              className="bg-ru-primary-dark h-full rounded-full"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
        <Link
          href={`/films/${film.slug}`}
          className="text-ru-primary-dark mt-6 inline-flex font-extrabold"
        >
          Découvrir et soutenir
        </Link>
      </div>
    </article>
  );
}
