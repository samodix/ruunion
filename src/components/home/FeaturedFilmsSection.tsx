import type { Film } from "@/types/film";
import { Container } from "@/components/layout/Container";
import { Button } from "@/components/ui/Button";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { FilmGrid } from "@/components/films/FilmGrid";

export function FeaturedFilmsSection({ films }: { films: Film[] }) {
  return (
    <section className="bg-ru-soft py-24">
      <Container>
        <div className="flex flex-col justify-between gap-7 md:flex-row md:items-end">
          <SectionTitle
            as="h2"
            eyebrow="À l’affiche"
            title="Les projets à soutenir"
            description="Découvrez les films que nous développons et suivez leur progression."
          />
          <Button href="/films" variant="secondary">
            Tous les films
          </Button>
        </div>
        <FilmGrid className="mt-12" films={films} />
      </Container>
    </section>
  );
}
