import { ArrowRight, Sparkles } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { Button } from "@/components/ui/Button";

export function SupportSection() {
  return (
    <section className="py-28">
      <Container>
        <div className="bg-ru-primary-dark relative isolate overflow-hidden rounded-[3rem] px-8 py-16 text-white shadow-[0_30px_100px_rgba(14,154,139,.18)] sm:px-16 sm:py-20">
          <div className="bg-ru-yellow/25 absolute -top-24 -right-16 -z-10 size-80 rounded-full blur-2xl" />
          <div className="bg-ru-primary absolute -bottom-28 -left-16 -z-10 size-72 rounded-full opacity-25 blur-3xl" />
          <Sparkles className="text-ru-yellow" size={36} />
          <h2 className="mt-6 max-w-3xl text-4xl font-black tracking-[-.04em] sm:text-6xl">
            Une contribution peut ouvrir la prochaine scène.
          </h2>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-white/78">
            Choisissez un pack de soutien et participez au développement des
            films comme aux actions de RU Union. Chaque geste rapproche une
            histoire de son public.
          </p>
          <Button className="mt-9" href="/boutique" variant="dark">
            Découvrir les packs <ArrowRight className="ml-2" size={18} />
          </Button>
        </div>
      </Container>
    </section>
  );
}
