import type { Film } from "@/types/film";
import { Button } from "@/components/ui/Button";
import { formatCurrency } from "@/lib/utils";

export function FilmDonationBox({ film }: { film: Film }) {
  const progress = Math.min(
    100,
    Math.round((film.donationRaised / film.donationGoal) * 100),
  );
  return (
    <aside className="bg-ru-ink rounded-[2rem] p-7 text-white">
      <p className="text-ru-primary text-sm font-bold">
        Objectif de production
      </p>
      <p className="mt-2 text-4xl font-black">
        {formatCurrency(film.donationGoal)}
      </p>
      <div className="mt-6 h-3 overflow-hidden rounded-full bg-white/15">
        <div
          className="bg-ru-yellow h-full rounded-full"
          style={{ width: `${progress}%` }}
        />
      </div>
      <p className="mt-3 text-sm text-white/70">
        {formatCurrency(film.donationRaised)} collectés · {progress}%
      </p>
      <Button className="mt-7 w-full" href="/boutique">
        Soutenir ce film
      </Button>
    </aside>
  );
}
