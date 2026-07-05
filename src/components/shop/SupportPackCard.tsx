import { Check } from "lucide-react";
import type { SupportPack } from "@/types/support-pack";
import { formatCurrency } from "@/lib/utils";
import { Card } from "@/components/ui/Card";

export function SupportPackCard({ pack }: { pack: SupportPack }) {
  return (
    <Card
      className={
        pack.featured ? "border-ru-primary-dark ring-ru-primary/25 ring-2" : ""
      }
    >
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-ru-primary-dark text-sm font-black">
            {pack.title}
          </p>
          <p className="mt-2 text-4xl font-black">
            {formatCurrency(pack.price)}
          </p>
        </div>
        {pack.featured && (
          <span className="bg-ru-yellow rounded-full px-3 py-1 text-xs font-black">
            Populaire
          </span>
        )}
      </div>
      <p className="text-ru-muted mt-5 leading-7">{pack.description}</p>
      <ul className="mt-6 space-y-3">
        {pack.benefits.map((benefit) => (
          <li key={benefit} className="flex gap-3 text-sm">
            <Check className="text-ru-primary-dark shrink-0" size={19} />
            {benefit}
          </li>
        ))}
      </ul>
      <button
        disabled
        className="bg-ru-border text-ru-muted mt-7 w-full cursor-not-allowed rounded-full px-5 py-3 text-sm font-extrabold"
      >
        Paiement bientôt disponible.
      </button>
    </Card>
  );
}
