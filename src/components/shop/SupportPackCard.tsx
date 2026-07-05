import { ArrowUpRight, Check, HeartHandshake, Sparkles } from "lucide-react";
import type { SupportPack, SupportPackType } from "@/types/support-pack";
import { formatCurrency } from "@/lib/utils";
import { Card } from "@/components/ui/Card";

const typeLabels: Record<SupportPackType, string> = {
  donation: "Soutien",
  product: "Film",
  ticket: "Billetterie",
  sponsor: "Mécénat",
};

export function SupportPackCard({ pack }: { pack: SupportPack }) {
  return (
    <Card
      className={`group relative flex min-h-full flex-col overflow-hidden rounded-[2.25rem] p-7 transition duration-300 hover:-translate-y-1.5 hover:shadow-[0_28px_80px_rgba(14,154,139,.14)] sm:p-8 ${
        pack.isHighlighted
          ? "border-ru-primary-dark bg-ru-ink ring-ru-primary/15 text-white ring-4 lg:-translate-y-3 lg:hover:-translate-y-5"
          : "bg-white"
      }`}
    >
      <div
        className={`absolute inset-x-0 top-0 h-1.5 ${pack.isHighlighted ? "bg-ru-yellow" : "from-ru-primary to-ru-yellow bg-gradient-to-r opacity-0 transition group-hover:opacity-100"}`}
      />
      <div className="flex items-start justify-between gap-4">
        <span
          className={`grid size-12 place-items-center rounded-2xl ${pack.isHighlighted ? "text-ru-yellow bg-white/10" : "bg-ru-primary/12 text-ru-primary-dark"}`}
        >
          <HeartHandshake size={24} aria-hidden="true" />
        </span>
        {pack.isHighlighted ? (
          <span className="bg-ru-yellow text-ru-ink inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-black">
            <Sparkles size={13} /> Recommandé
          </span>
        ) : (
          <span className="bg-ru-soft text-ru-muted rounded-full px-3 py-1.5 text-xs font-black uppercase">
            {typeLabels[pack.type]}
          </span>
        )}
      </div>
      <p
        className={`mt-7 text-xs font-black tracking-[.18em] uppercase ${pack.isHighlighted ? "text-ru-primary" : "text-ru-primary-dark"}`}
      >
        Pack {typeLabels[pack.type]}
      </p>
      <h3 className="mt-2 text-2xl font-black tracking-[-.03em]">
        {pack.title}
      </h3>
      <p className="mt-4 flex items-end gap-2">
        <strong className="text-5xl leading-none font-black tracking-[-.06em]">
          {formatCurrency(pack.price)}
        </strong>
        <span
          className={`pb-1 text-xs ${pack.isHighlighted ? "text-white/55" : "text-ru-muted"}`}
        >
          contribution unique
        </span>
      </p>
      <p
        className={`mt-6 leading-7 ${pack.isHighlighted ? "text-white/68" : "text-ru-muted"}`}
      >
        {pack.description}
      </p>
      <ul className="mt-7 flex-1 space-y-3.5">
        {(pack.features.length
          ? pack.features
          : ["Actualités du projet", "Soutien à une action concrète"]
        )
          .slice(0, 4)
          .map((feature) => (
            <li key={feature} className="flex gap-3 text-sm leading-6">
              <span
                className={`mt-0.5 grid size-5 shrink-0 place-items-center rounded-full ${pack.isHighlighted ? "bg-ru-primary text-ru-ink" : "bg-ru-primary/15 text-ru-primary-dark"}`}
              >
                <Check size={13} strokeWidth={3} />
              </span>
              {feature}
            </li>
          ))}
      </ul>
      <button
        disabled
        aria-disabled="true"
        className={`mt-9 inline-flex w-full cursor-not-allowed items-center justify-center rounded-full px-5 py-4 text-sm font-black ${pack.isHighlighted ? "bg-ru-primary text-ru-ink" : "bg-ru-soft text-ru-muted border-ru-border border"}`}
      >
        Soutenir bientôt <ArrowUpRight className="ml-2" size={17} />
      </button>
      <p
        className={`mt-3 text-center text-[11px] ${pack.isHighlighted ? "text-white/45" : "text-ru-muted"}`}
      >
        Paiement bientôt disponible
      </p>
    </Card>
  );
}
