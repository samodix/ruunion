import type { Film } from "@/types/film";
import { Container } from "@/components/layout/Container";
import { Button } from "@/components/ui/Button";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { FilmGrid } from "@/components/films/FilmGrid";

export function FeaturedFilmsSection({ films }: { films: Film[] }) {
  return (
    <section className="bg-ru-ink relative overflow-hidden py-24 text-white sm:py-32">
      <div className="bg-ru-primary/20 absolute -top-40 right-0 size-[30rem] rounded-full blur-3xl" />
      <div className="ru-cinematic-lines absolute inset-0 opacity-35" />
      <Container className="relative">
        <div className="flex flex-col justify-between gap-8 md:flex-row md:items-end">
          <SectionTitle
            as="h2"
            eyebrow="À l’affiche"
            title="Films en lumière"
            description="Découvrez les films portés par RU Union et les projets humains qu’ils accompagnent."
            theme="dark"
          />
          <Button
            href="/films"
            variant="dark"
            className="border border-white/20"
          >
            Explorer tous les films
          </Button>
        </div>
        <FilmGrid className="mt-14" films={films} />
      </Container>
    </section>
  );
}
