"use client";

import { useState } from "react";
import type { SupportPack, SupportPackType } from "@/types/support-pack";
import { SupportPackCard } from "./SupportPackCard";

const filters: Array<{ label: string; value: "all" | SupportPackType }> = [
  { label: "Tous", value: "all" },
  { label: "Soutien", value: "donation" },
  { label: "Film", value: "product" },
  { label: "Mécénat", value: "sponsor" },
  { label: "Billetterie", value: "ticket" },
];

export function SupportPackGrid({ packs }: { packs: SupportPack[] }) {
  const [activeFilter, setActiveFilter] = useState<"all" | SupportPackType>(
    "all",
  );
  const visiblePacks =
    activeFilter === "all"
      ? packs
      : packs.filter((pack) => pack.type === activeFilter);

  return (
    <>
      <div className="flex flex-wrap gap-2" aria-label="Filtrer les packs">
        {filters.map((filter) => (
          <button
            key={filter.value}
            type="button"
            onClick={() => setActiveFilter(filter.value)}
            aria-pressed={activeFilter === filter.value}
            className={`rounded-full px-5 py-2.5 text-sm font-black transition ${activeFilter === filter.value ? "bg-ru-ink text-white shadow-lg" : "border-ru-border text-ru-muted hover:border-ru-primary border bg-white"}`}
          >
            {filter.label}
          </button>
        ))}
      </div>
      <div className="mt-12 grid items-stretch gap-7 md:grid-cols-2 xl:grid-cols-3 xl:pt-3">
        {visiblePacks.map((pack) => (
          <SupportPackCard key={pack.id} pack={pack} />
        ))}
      </div>
      {visiblePacks.length === 0 && (
        <p className="border-ru-border text-ru-muted mt-10 rounded-3xl border bg-white p-8 text-center">
          Aucun pack dans cette catégorie pour le moment.
        </p>
      )}
    </>
  );
}
