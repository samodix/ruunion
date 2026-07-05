import { Check, HeartHandshake } from "lucide-react";
import type { SupportPack } from "@/types/support-pack";
import { formatCurrency } from "@/lib/utils";
import { Card } from "@/components/ui/Card";

export function SupportPackCard({ pack }: { pack: SupportPack }) {
  return (
    <Card
      className={`relative flex min-h-full flex-col overflow-hidden p-8 transition duration-300 hover:-translate-y-1 hover:shadow-[0_24px_75px_rgba(14,154,139,.13)] ${
        pack.isHighlighted
          ? "border-ru-primary-dark ring-ru-primary/20 ring-4"
          : ""
      }`}
    >
      {pack.isHighlighted && (
        <div className="bg-ru-yellow absolute inset-x-0 top-0 h-1.5" />
      )}
      <div className="flex items-start justify-between gap-4">
        <div>
          <HeartHandshake className="text-ru-primary-dark" size={28} />
          <p className="text-ru-primary-dark mt-5 text-sm font-black tracking-wide uppercase">
            {pack.title}
          </p>
          <p className="mt-2 text-4xl font-black tracking-[-.04em]">
            {formatCurrency(pack.price)}
          </p>
        </div>
        {pack.isHighlighted && (
          <span className="bg-ru-yellow rounded-full px-3 py-1 text-xs font-black">
            Le plus choisi
          </span>
        )}
      </div>
      <p className="text-ru-muted mt-6 leading-7">{pack.description}</p>
      <ul className="mt-7 flex-1 space-y-3">
        {pack.features.map((feature) => (
          <li key={feature} className="flex gap-3 text-sm">
            <Check className="text-ru-primary-dark shrink-0" size={19} />
            {feature}
          </li>
        ))}
      </ul>
      <button
        disabled
        className="bg-ru-border text-ru-muted mt-8 w-full cursor-not-allowed rounded-full px-5 py-3.5 text-sm font-extrabold"
      >
        Paiement bientôt disponible
      </button>
    </Card>
  );
}
