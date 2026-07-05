import type { Film } from "@/types/film";
import { Button } from "@/components/ui/Button";
import { formatCurrency } from "@/lib/utils";

export function FilmDonationBox({ film }: { film: Film }) {
  const goal = film.donationGoal ?? 0;
  const collected = film.donationCollected ?? 0;
  const progress =
    goal > 0 ? Math.min(100, Math.round((collected / goal) * 100)) : 0;

  return (
    <aside className="bg-ru-ink relative sticky top-28 overflow-hidden rounded-[2.25rem] p-8 text-white shadow-[0_28px_80px_rgba(51,54,58,.22)]">
      <div className="bg-ru-primary/20 absolute -top-20 -right-16 size-48 rounded-full blur-2xl" />
      <p className="text-ru-primary text-sm font-bold tracking-wide uppercase">
        La collecte du film
      </p>
      <p className="relative mt-3 text-4xl font-black">
        {formatCurrency(collected)}
      </p>
      <p className="mt-1 text-sm text-white/55">
        réunis sur un objectif de {formatCurrency(goal)}
      </p>
      <div className="relative mt-7 h-3.5 overflow-hidden rounded-full bg-white/12">
        <div
          className="from-ru-primary to-ru-yellow h-full rounded-full bg-gradient-to-r"
          style={{ width: `${progress}%` }}
        />
      </div>
      <div className="mt-4 flex justify-between text-sm">
        <span className="text-white/65">Progression</span>
        <strong className="text-ru-yellow">{progress} %</strong>
      </div>
      <p className="mt-7 text-sm leading-6 text-white/65">
        Chaque soutien rapproche le film de son tournage, de sa diffusion et de
        ses futures rencontres avec le public.
      </p>
      <Button className="mt-7 w-full" href="/boutique">
        Choisir un pack de soutien
      </Button>
    </aside>
  );
}
