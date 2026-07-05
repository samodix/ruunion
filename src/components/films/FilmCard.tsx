import Link from "next/link";
import { ArrowUpRight, Clapperboard } from "lucide-react";
import type { Film, FilmStatus } from "@/types/film";
import { formatCurrency } from "@/lib/utils";

const statusLabels: Record<FilmStatus, string> = {
  "en-production": "En production",
  termine: "Terminé",
  "en-diffusion": "En diffusion",
  archive: "Archive",
};

const accents = [
  "from-[#0E9A8B] via-[#48C1B3] to-[#A6E3DB]",
  "from-[#D98D10] via-[#F6B62E] to-[#FFE1A0]",
  "from-[#222629] via-[#33363A] to-[#71797E]",
];

export function FilmCard({ film }: { film: Film }) {
  const goal = film.donationGoal ?? 0;
  const collected = film.donationCollected ?? 0;
  const progress =
    goal > 0 ? Math.min(100, Math.round((collected / goal) * 100)) : 0;
  const accent = accents[Math.abs(film.priorityOrder) % accents.length];

  return (
    <article className="group border-ru-border overflow-hidden rounded-[2.25rem] border bg-white shadow-[0_18px_60px_rgba(51,54,58,.08)] transition duration-300 hover:-translate-y-1.5 hover:shadow-[0_28px_90px_rgba(14,154,139,.16)]">
      <div
        className={`relative h-64 overflow-hidden bg-gradient-to-br ${accent} p-6`}
      >
        <div className="absolute inset-0 bg-[linear-gradient(120deg,transparent_35%,rgba(255,255,255,.22)_50%,transparent_65%)] opacity-0 transition duration-700 group-hover:translate-x-24 group-hover:opacity-100" />
        <span className="text-ru-ink relative rounded-full bg-white/92 px-3 py-2 text-xs font-extrabold shadow-sm">
          {statusLabels[film.status]}
        </span>
        <Clapperboard
          className="absolute bottom-7 left-7 text-white/65"
          size={42}
        />
        <div className="text-ru-primary-dark absolute right-6 bottom-6 grid size-13 place-items-center rounded-full bg-white shadow-xl transition group-hover:scale-105 group-hover:rotate-12">
          <ArrowUpRight />
        </div>
      </div>
      <div className="p-7">
        <p className="text-ru-primary-dark text-xs font-bold tracking-[.17em] uppercase">
          Film solidaire · {film.year}
        </p>
        <h3 className="mt-3 text-2xl font-black tracking-[-.025em]">
          {film.title}
        </h3>
        <p className="text-ru-muted mt-3 min-h-14 leading-7">
          {film.shortDescription}
        </p>
        {goal > 0 && (
          <div className="bg-ru-soft mt-6 rounded-2xl p-4">
            <div className="flex justify-between gap-4 text-xs font-bold">
              <span>{formatCurrency(collected)} collectés</span>
              <span className="text-ru-primary-dark">{progress} %</span>
            </div>
            <div className="bg-ru-border mt-3 h-2.5 overflow-hidden rounded-full">
              <div
                className="from-ru-primary-dark to-ru-yellow h-full rounded-full bg-gradient-to-r"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        )}
        <Link
          href={`/films/${film.slug}`}
          className="text-ru-primary-dark mt-7 inline-flex font-extrabold"
        >
          Entrer dans l’histoire
        </Link>
      </div>
    </article>
  );
}
