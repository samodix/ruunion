import { ArrowRight } from "lucide-react";
import type { SupportPack } from "@/types/support-pack";
import { Container } from "@/components/layout/Container";
import { SupportPackCard } from "@/components/shop/SupportPackCard";
import { Button } from "@/components/ui/Button";
import { SectionTitle } from "@/components/ui/SectionTitle";

export function SupportSection({ packs }: { packs: SupportPack[] }) {
  return (
    <section className="from-ru-soft via-ru-cream to-ru-primary/8 relative overflow-hidden bg-gradient-to-br py-24 sm:py-32">
      <div className="bg-ru-yellow/18 absolute -top-36 -right-28 size-[30rem] rounded-full blur-3xl" />
      <div className="ru-grid-pattern absolute inset-0 [mask-image:linear-gradient(to_bottom,transparent,black_20%,black_75%,transparent)] opacity-40" />
      <Container className="relative">
        <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
          <SectionTitle
            as="h2"
            eyebrow="Packs de soutien"
            title="Choisir un pack, soutenir une histoire"
            description="Chaque pack participe au développement des films et des actions RU Union. Un geste simple peut aider une histoire à voir le jour."
          />
          <Button href="/boutique" variant="secondary">
            Voir tous les packs <ArrowRight className="ml-2" size={18} />
          </Button>
        </div>
        <div className="mt-16 grid items-stretch gap-7 md:grid-cols-2 lg:grid-cols-3 lg:pt-3">
          {packs.map((pack) => (
            <SupportPackCard key={pack.id} pack={pack} />
          ))}
        </div>
      </Container>
    </section>
  );
}
